import { Component, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth-service/auth.service';
import { OnInit } from '@angular/core';
import { ModalService } from 'src/app/pages/modal-popups/services/modal.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['../sign-form-style.scss']
})

export class SignUpComponent implements OnInit, OnDestroy {
  @ViewChild('successModalTemplate') successModalTemplate!: TemplateRef<any>;
  signUpForm!: UntypedFormGroup;
  signUpSub$!: Subscription;
  openModalSub$!: Subscription;
 
  constructor(private authService: AuthService, private modalService: ModalService, private router: Router){
    this.buildForm();
  }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) this.router.navigate(['/main']);
  }

  private buildForm(): void {
    this.signUpForm = new UntypedFormGroup ({
      name: new FormControl ('', [Validators.required, Validators.maxLength(24)]),
      login: new FormControl ('', [Validators.required, Validators.maxLength(24)]),
      password: new FormControl ('', [Validators.required, Validators.minLength(8), Validators.maxLength(24)]),
    });
  }

  signUp(): void {
    if(this.signUpForm.valid){
      this.signUpSub$ = this.authService.postToSignUp(this.signUpForm.value).subscribe(response => {
        if (response) {
          this.openModal(this.successModalTemplate);
          this.router.navigate(['/sign-in']);
        }
      });
    }
  }

  openModal(modalTemplate: TemplateRef<any>): void {
    this.openModalSub$ = this.modalService
      .open(modalTemplate, { size: 'lg', title: 'Сообщение:' })
      .subscribe();
  }

  ngOnDestroy(): void {
    this.signUpSub$?.unsubscribe();
    this.openModalSub$?.unsubscribe();
  }
}
