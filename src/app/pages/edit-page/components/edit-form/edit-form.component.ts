import { Component, Input } from '@angular/core';
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
import { HttpClient } from '@angular/common/http';
import { EditService } from '../../services/edit.service';


import { OnInit } from '@angular/core';
import { Category } from '../../edit.interface';
import { CategoriesComponent } from 'src/app/layout-module/components/layout/components/header/components/header-menu/components/categories/categories.component';


@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.scss']
})
export class EditFormComponent  implements OnInit{


  editForm!: UntypedFormGroup;
  categories!: Array<Category>;
  
  constructor(private _editService : EditService ){
    
  }

  ngOnInit(): void {
    this.editForm = new UntypedFormGroup ({
      category: new FormControl ('', Validators.required),
      subCategory: new FormControl ('', Validators.required),
      underSubCategory: new FormControl ('', Validators.required),
      productName: new FormControl ('', [Validators.required, Validators.maxLength(50)]),
      productDescription: new FormControl ('', [Validators.required, Validators.maxLength(4096)]),
      address: new FormControl ('', Validators.required),
      photo: new FormControl (''),
      productPrice: new FormControl ('', [Validators.required, Validators.maxLength(12), this.onlyNumValidator()]),
    });

   /**Functional demo from last solar lecture. don't forget to delete***/ 
    this.editForm.valueChanges.subscribe((value) => {
      console.log('editForm.valueChanges: ', value);
    });
    this.editForm.statusChanges.subscribe((value) => {
      console.log('editForm.statusChanges: ', value);
    });


    const s = this._editService.getAllCategories().subscribe(resp => {
      this.categories = resp
    })
    s.unsubscribe;

  }
/**------------------------------------------------------------------------------------------------------------ */

  /**there is a crutch here, we need to think more */

  getCategory() : Array<Category> {
     return this.categories.filter((obj) => obj.parentId == '00000000-0000-0000-0000-000000000000');
     
  }

  /**??? */
  getSubCategory(value: string) : Array<Category> {
    return this.categories = this.categories.filter((obj) => obj.parentId == value);
 }

 /*------------------------------------------------------------------------------------------------------------*/
    
  onlyNumValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return !Number(control.value) ? {onlyNum: {value: 'Недопустимое значение'}} : null;
    };
  }

}
function Import(target: EditFormComponent, propertyKey: 'Category'): void {
  throw new Error('Function not implemented.');
}

