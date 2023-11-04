import { Component} from '@angular/core';
import { FormsModule, 
  ReactiveFormsModule, 
  FormBuilder, 
  FormControl, 
  FormGroup, 
  UntypedFormGroup, 
  Validators, 
  ValidationErrors,
  AbstractControl,
  ValidatorFn } from '@angular/forms';
import { CategoriesService } from 'src/app/layout-module/components/layout/components/header/services/categories.service';
import { OnInit } from '@angular/core';
import { Category } from '../../edit.interface';
import { ProductService } from 'src/app/pages/main-page/services/product.service';



@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.scss']
})
export class EditFormComponent  implements OnInit{
  editForm!: UntypedFormGroup;
  categoriesList!: Array<Category>;
  firstLevelCategories!: Array<Category>;
  secondLevelCategories!:  Array<Category> ;
  thirdLevelCategories!: Array<Category>;
  imagesArray: { url: string, file: File }[] = [];
  
  
  constructor(private categoriesService : CategoriesService, 
    private formBuilder : FormBuilder, private productService: ProductService ){
    this.buildForm()
  }

  ngOnInit(): void {
    this.categoriesService.getAllCategories().subscribe((response) => {
      this.categoriesList = response;
      this.firstLevelCategories = this.categoriesList.filter(category => category.parentId === this.categoriesService.getDefaultcategoryId()
       && category.name !== 'Anything' && category.name !== 'Default');
    })
  }

  private buildForm() {
    this.editForm = this.formBuilder.group({
      firstLevelCategory: ['', Validators.required],
      secondLevelCategory:  ['', Validators.required],
      thirdLevelCategory:  '',
      productName:  ['', [Validators.required, Validators.maxLength(50)]],
      productDescription:  ['', [Validators.required, Validators.maxLength(4096)]],
      address: ['', Validators.required],
      photo: this.imagesArray,
      contactPhone: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(12), this.phoneNumberValidator()]],
      productPrice: ['', [Validators.required, Validators.maxLength(12), this.onlyNumValidator()]],
    })
  }
  
  onFirstLevelCategoryChange() {
    const selectedCategoryId = this.editForm.get('firstLevelCategory')?.value;
    this.secondLevelCategories = this.categoriesList.filter(category => category.parentId === selectedCategoryId);
    this.editForm.get('secondLevelCategory')?.setValue(null);
    this.editForm.get('thirdLevelCategory')?.setValue(null);
  }
  
  onSecondLevelCategoryChange() {
    const selectedCategoryId = this.editForm.get('secondLevelCategory')?.value;
    this.thirdLevelCategories = this.categoriesList.filter(category => category.parentId === selectedCategoryId);
    this.editForm.get('thirdLevelCategory')?.setValue(null);
  }

  onFileChange(event: any) {
    if (event.target.files && event.target.files[0]) {
      for (const file of event.target.files) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          if(this.imagesArray.length < 10) {
            this.imagesArray.push({ url: e.target.result, file });
          } else {
            console.log('more then 10 imgs prohibited')
          }
        };
        reader.readAsDataURL(file);
      }
    }
  }

  removeImage(index: number) {
    this.imagesArray.splice(index, 1);
  }

  onSubmit() {
    if (this.editForm.valid) {
      let files = (<HTMLInputElement>document.getElementById('Photo')).files;
      const formData = new FormData();
      formData.append('name', this.editForm.get('productName')!.value);
      formData.append('description', this.editForm.get('productDescription')!.value);
      formData.append('location', this.editForm.get('address')!.value);
      formData.append('cost', this.editForm.get('productPrice')!.value);
      formData.append('phone', this.editForm.get('contactPhone')!.value);
      
      if(this.editForm.get('thirdLevelCategory')!.value) {
        formData.append('categoryId', this.editForm.get('thirdLevelCategory')!.value);
      } else {
        formData.append('categoryId', this.editForm.get('secondLevelCategory')!.value)
      }

      if(files) {
        for(let i = 0; i < this.editForm.get('photo')!.value.length!; i++) {
          formData.append('Images', files[i]!)
        }
      }
      
      formData.forEach((value, key) => {
        console.log(key, value);
      });

     this.productService.createNewProduct(formData).subscribe();
    }
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
}

 




