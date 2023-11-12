import { Component, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import {
  FormBuilder, 
  UntypedFormGroup, 
  Validators, 
  ValidationErrors,
  AbstractControl,
  ValidatorFn } from '@angular/forms';
import { CategoriesService } from 'src/app/layout-module/services/categories-service/categories.service';
import { OnInit } from '@angular/core';
import { Category } from 'src/app/layout-module/interfaces/categories.interface';
import { ProductService } from 'src/app/pages/services/product-service/product.service';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { ProductExt } from 'src/app/pages/interfaces/product.interface';
import { Image } from 'src/app/pages/interfaces/image.interface';
import { ImagesService } from 'src/app/pages/services/images-service/images.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.scss']
})

export class EditFormComponent  implements OnInit, OnDestroy {
 
  editForm!: UntypedFormGroup;
  categoriesList!: Array<Category>;
  firstLevelCategories!: Array<Category>;
  secondLevelCategories!:  Array<Category> ;
  thirdLevelCategories!: Array<Category>;
  images: Array<Image> = [];
  imagesFromServer: Array<Image> = [];
  isEditing: boolean = false;
  editableProduct!: ProductExt;

  getCategoriesSub$!: Subscription;
  sendProductSub$!: Subscription;
  getImgSub$: Subscription | undefined;
  deleteImgSub$: Subscription | undefined;
  deleteProductSub$!: Subscription;
  editStatusSub$!: Subscription;

  unsubscribe$ = new Subject<void>;
  

  pageTitle: string = 'Новое объявление';
  submitBtnTitle: string = 'Разместить объявление';
  
  constructor(private categoriesService: CategoriesService, 
    private imagesService: ImagesService, 
    private formBuilder: FormBuilder, 
    private productService: ProductService, 
    private router: Router){
    this.buildForm();
  }

  ngOnInit(): void {
    this.getCategoriesSub$ = this.categoriesService.getAllCategories().subscribe((response) => {
      this.categoriesList = response;
      this.firstLevelCategories = this.categoriesList.filter(category => category.parentId === this.categoriesService.getDefaultcategoryId()
      && category.name !== 'Anything' && category.name !== 'Default');

      this.editStatusSub$ = this.productService.editStatus$.subscribe(response => {
        this.isEditing = response;
        if(this.isEditing){
          this.editableProduct = Object.assign({}, this.productService.currentLoadedProduct);
          this.editProduct(this.editableProduct);
          console.log(this.editableProduct)
          this.pageTitle = 'Редактировать объявление';
          this.submitBtnTitle = 'Изменить объявление';
        }
      });
    });  
  }

  private buildForm(): void {
    this.editForm = this.formBuilder.group({
      firstLevelCategory: ['', Validators.required],
      secondLevelCategory:  ['', Validators.required],
      thirdLevelCategory:  '',
      productName:  ['', [Validators.required, Validators.maxLength(50)]],
      productDescription:  ['', [Validators.required, Validators.maxLength(4096)]],
      address: ['', Validators.required],
      photo: this.images,
      contactPhone: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(12), this.phoneNumberValidator()]],
      productPrice: ['', [Validators.required, Validators.maxLength(12), this.onlyNumValidator()]],
    })
  }
  
  onFirstLevelCategoryChange(): void {
    const selectedCategoryId = this.editForm.get('firstLevelCategory')?.value;
    this.secondLevelCategories = this.categoriesList.filter(category => category.parentId === selectedCategoryId);
    this.editForm.get('secondLevelCategory')?.setValue(null);
    this.editForm.get('thirdLevelCategory')?.setValue(null);
  }
  
  onSecondLevelCategoryChange(): void {
    const selectedCategoryId = this.editForm.get('secondLevelCategory')?.value;
    this.thirdLevelCategories = this.categoriesList.filter(category => category.parentId === selectedCategoryId);
    this.editForm.get('thirdLevelCategory')?.setValue(null);
  }

  findGrandParent(categoryLevel3: Category): Array<Category> | null {
    const categoryLevel2 = this.categoriesList.find(item => item.id === categoryLevel3.parentId);
    if (categoryLevel2 && categoryLevel2.id === categoryLevel3.parentId) {
      const categoryLevel1 = this.categoriesList.find(item => item.id === categoryLevel2.parentId 
        && item.parentId === '00000000-0000-0000-0000-000000000000');
      if (categoryLevel1) { 
        return [categoryLevel1, categoryLevel2, categoryLevel3];
      } else {
        return [categoryLevel2, categoryLevel3]
      }
    } 
    return null;
  }


  onFileChange(event: any): void {
    if (event.target.files && event.target.files[0]) {
      for (const file of event.target.files) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          if(this.images.length < 10) {
            this.images.push({ url: e.target.result, file });
          } else {
            console.log('more then 10 imgs prohibited')
          }
        };
        reader.readAsDataURL(file);
      }
    }
  }


  removeFile(index: number): void {
    this.images.splice(index, 1);
  }

  onDelete() {
    if(this.imagesFromServer.length > 0) {
      this.deleteImgSub$ = this.imagesService.deleteImagesFromProduct(this.imagesFromServer)?.subscribe();
    }
    console.log(this.editableProduct.id)
    this.deleteProductSub$ = this.productService.deleteProductbyId(this.editableProduct.id)
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(() => {
      this.router.navigate(['main/user-products']);
      this.unsubscribe$.next();
      this.unsubscribe$.complete();
    });
    
  }

  onReset(): void {
    this.images = [];
    this.imagesFromServer = [];
    this.editForm.reset();
    this.editProduct(this.editableProduct);
  }

  onSubmit(): void {
    if (this.editForm.valid) {
      const formData = new FormData();
      formData.append('name', this.editForm.get('productName')!.value);
      formData.append('description', this.editForm.get('productDescription')!.value);
      formData.append('location', this.editForm.get('address')!.value);
      formData.append('cost', this.editForm.get('productPrice')!.value);
      formData.append('phone', this.editForm.get('contactPhone')!.value);

      //Not all categories have a 3-level hierarchy. In cases where there are 2 levels, we pass the value from 2nd control
      if(this.editForm.get('thirdLevelCategory')!.value) {
        formData.append('categoryId', this.editForm.get('thirdLevelCategory')!.value);
      } else {
        formData.append('categoryId', this.editForm.get('secondLevelCategory')!.value);
      }
      
      if(this.images.length > 0) {
        for(let i = 0; i < this.images.length; i++) {
          formData.append('Images', this.images[i].file);
        } 
      } 

      formData.forEach((value, key) => {
        console.log(key, value);
      });
      
      if (this.isEditing) { 
        //Update advert logic
        if(this.imagesFromServer.length > 0) { 

          //Before sending, you need to clear existing photos from server to avoid duplication
          //Moreover, updating the ad should begin only after deleting the photo
          this.deleteImgSub$ = this.imagesService.deleteImagesFromProduct(this.imagesFromServer)?.subscribe(() => {
            this.sendProductSub$ = this.productService.updateProductById(formData, this.editableProduct.id)
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(() => {
              this.router.navigate(['main/user-products']);
              this.unsubscribe$.next();
              this.unsubscribe$.complete();
            });
          });
          
        } else {
          this.sendProductSub$ = this.productService.updateProductById(formData, this.editableProduct.id)
          .pipe(takeUntil(this.unsubscribe$))
          .subscribe(() => {
            this.router.navigate(['main/user-products']);
            this.unsubscribe$.next();
            this.unsubscribe$.complete();
          });
        }
         
      } else { 
        //Create advert logic
       this.sendProductSub$ = this.productService.createNewProduct(formData)
       .pipe(takeUntil(this.unsubscribe$))
       .subscribe(() => {
        this.router.navigate(['main/user-products']);
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
       });
      }
    }
  }

  
  editProduct (editableProduct: ProductExt): void {
    const categoriesByLvl = this.findGrandParent(this.editableProduct.category);

    //Must be initialized to avoid accidentally passing null
    let categoryLvl_1: Category = {id: '', name: '', parentId: ''};
    let categoryLvl_2: Category = {id: '', name: '', parentId: ''};
    let categoryLvl_3: Category = {id: '', name: '', parentId: ''};
    
    //Not all categories have a 3-level hierarchy. In cases where there are 2 levels, we pass the value from 2nd control
    if (categoriesByLvl?.[0].id === '00000000-0000-0000-0000-000000000000'){
      categoryLvl_1 = categoriesByLvl[1];
      categoryLvl_2 = categoriesByLvl[2];
    } else if (categoriesByLvl) {
      categoryLvl_1 = categoriesByLvl[0];
      categoryLvl_2 = categoriesByLvl[1];
      categoryLvl_3 = categoriesByLvl[2];
    }

    this.getImgSub$ = this.imagesService.getImagesFromProduct(this.editableProduct.imagesIds)?.subscribe(response => {
      this.imagesFromServer = response;
      this.images = this.imagesFromServer.slice();
      console.log(this.images);
      console.log(this.imagesFromServer);
    });
    
    this.editForm.patchValue({
      firstLevelCategory: categoryLvl_1.id,
      productName: this.editableProduct.name,
      productDescription: this.editableProduct.description,
      address: this.editableProduct.location,
      photo: this.imagesFromServer,
      contactPhone: this.editableProduct.phone,
      productPrice: this.editableProduct.cost,
    })

    /*the decision below is caused by the fact that to add a value to a subsequent select, 
    a function call is required that collects the list of available options*/

    this.onFirstLevelCategoryChange();
    this.editForm.patchValue({
      secondLevelCategory: categoryLvl_2.id,
    })
    this.onSecondLevelCategoryChange();
    this.editForm.patchValue({
      thirdLevelCategory: categoryLvl_3.id,
    })
  }

  onlyNumValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return !Number(control.value) ? {onlyNum: {value: 'Недопустимое значение'}} : null;
    };
  }

  phoneNumberValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const phoneNumberPattern = /^[0-9\+\(\)\-]+$/;
      if (!phoneNumberPattern.test(control.value)) {
        return {phoneNumber: {value: 'Недопустимое значение'}};
      }
      return null;
    };
  }


  ngOnDestroy(): void {
    if(this.isEditing){
      this.productService.changeEditStatus(false);
    }
    this.getCategoriesSub$.unsubscribe();
    this.editStatusSub$.unsubscribe();
    //this.sendProductSub$?.unsubscribe();
    this.getImgSub$?.unsubscribe();
    this.deleteImgSub$?.unsubscribe();
    this.deleteProductSub$?.unsubscribe();
  }
}

 




