import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, UntypedFormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { User } from 'src/app/pages/interfaces/user.interface';
import { UserService } from 'src/app/pages/services/user-service/user.service';
import { SignUp } from 'src/app/pages/interfaces/auth.interfaces';
import { ModalService } from 'src/app/pages/modal-popups/services/modal.service';
import { AuthService } from 'src/app/pages/services/auth-service/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-settings-form',
  templateUrl: './settings-form.component.html',
  styleUrls: ['./settings-form.component.scss']
})
export class SettingsFormComponent implements OnInit, OnDestroy{
  @ViewChild('successModalTemplate') successModalTemplate!: TemplateRef<any>;
  @ViewChild('deleteModalTemplate') deleteModalTemplate!: TemplateRef<any>;
  
  userForm!: UntypedFormGroup;
  updateUserData: SignUp = {name: '', login: '', password: ''};
  currentUser!: User;

  getUserSub$!: Subscription;
  updateUserSub$!: Subscription;
  deleteUserSub$!: Subscription;
  modalSub$!: Subscription;

  constructor(private formBuilder: FormBuilder, 
    private userService: UserService, 
    private modalService: ModalService, 
    private authService: AuthService,
    private router: Router) {
    this.buildUserForm();
    
  }

  ngOnInit(): void {
    this.getUserSub$ = this.userService.getCurrentUser().subscribe(response => {
      this.currentUser = response;
      this.userForm.get('userName')?.setValue(this.currentUser.name);
    })
  }
  
  private buildUserForm() {
    this.userForm = this.formBuilder.group({
      userName: ['', [Validators.required, Validators.maxLength(24)]],
      login: ['', [Validators.required, Validators.maxLength(24)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(24)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(24)]],
    }, 
    { validator: this.passwordMatchValidator() })
  }

  updateUser() {
    if (this.userForm.valid) {
      const formData = new FormData();
      formData.append('name', this.userForm.get('userName')?.value);
      formData.append('login', this.userForm.get('login')?.value) ;
      formData.append('password', this.userForm.get('confirmPassword')?.value) ;

      this.updateUserSub$ = this.userService.updateCurrentUser(formData, this.currentUser.id).subscribe(
        response => {
          this.userService.getCurrentUserName().subscribe();
          this.openModal(this.successModalTemplate);
          console.log('User updated successfully:', response);
        },
        error => {
          console.error('Error updating user:', error);
        }
      );
    }
  }

  deleteUser(id: string){
    if(this.currentUser){
      this.deleteUserSub$ = this.userService.deleteCurrentUser(id).subscribe((respoonse) => {
        if(respoonse){
          this.authService.SignOut();
          this.router.navigate(['/main']);
        }
      })
    }

  }

  openModal(modalTemplate: TemplateRef<any>) {
    this.modalSub$ = this.modalService
      .open(modalTemplate, { size: 'lg', title: 'Сообщение:' })
      .subscribe((action) => {
        console.log('modalAction', action);
      });
  }

  passwordMatchValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.get('password');
      const confirmPassword = control.get('confirmPassword');
  
      if (password?.value === confirmPassword?.value) {
        return null; 
      } else {
        return { passwordMatch: true }; 
      }
    };
  }

  ngOnDestroy(): void {
    this.getUserSub$?.unsubscribe();
    this.updateUserSub$?.unsubscribe();
    this.deleteUserSub$?.unsubscribe();
    this.modalSub$?.unsubscribe();
  }

}
