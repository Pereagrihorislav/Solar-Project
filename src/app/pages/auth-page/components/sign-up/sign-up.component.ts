import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormControl, FormGroup, UntypedFormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['../sign-form-style.scss']
})
export class SignUpComponent {
  httpClient : HttpClient;
  signUpForm!: UntypedFormGroup;

  constructor(_http: HttpClient, private authServise: AuthService){
    this.httpClient = _http;
  }

  ngOnInit(): void {
    this.signUpForm = new UntypedFormGroup ({
      name: new FormControl (''),
      login: new FormControl (''),
      password: new FormControl (''),
    });

   /**Functional demo from last solar lecture. don't forget to delete***/ 
    this.signUpForm.valueChanges.subscribe((value) => {
      console.log('signInForm.valueChanges: ', value);
    });
    this.signUpForm.statusChanges.subscribe((value) => {
      console.log('signInForm.statusChanges: ', value);
    });
  }

  signUp() {
    if(this.signUpForm.valid){
      this.authServise.postToSignUp(this.signUpForm.value).subscribe((response) => {
        console.log(response);
      });
    }
  }

}
