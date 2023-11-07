import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormControl, FormGroup, UntypedFormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { OnInit } from '@angular/core';
import { ModalService } from 'src/app/pages/modal-popups/services/modal.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['../sign-form-style.scss']
})
export class SignUpComponent implements OnInit {
  @ViewChild('successModalTemplate') successModalTemplate!: TemplateRef<any>;
  httpClient : HttpClient;
  signUpForm!: UntypedFormGroup;
 

  constructor(_http: HttpClient, private authServise: AuthService, private modalService: ModalService){
    this.httpClient = _http;
  }

  ngOnInit(): void {
    this.signUpForm = new UntypedFormGroup ({
      name: new FormControl ('', [Validators.required, Validators.maxLength(24)]),
      login: new FormControl ('', [Validators.required, Validators.maxLength(24)]),
      password: new FormControl ('', [Validators.required, Validators.minLength(8), Validators.maxLength(24)]),
    });
  }

  signUp() {
    if(this.signUpForm.valid){
      this.authServise.postToSignUp(this.signUpForm.value).subscribe((response) => {
        this.openModal(this.successModalTemplate)
        console.log(response);
      });
    }
  }

  openModal(modalTemplate: TemplateRef<any>) {
    this.modalService
      .open(modalTemplate, { size: 'lg', title: 'Сообщение:' })
      .subscribe((action) => {
        console.log('modalAction', action);
      });
  }

}
