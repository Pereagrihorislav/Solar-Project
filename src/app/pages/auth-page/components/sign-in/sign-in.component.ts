import { Component, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormControl, FormGroup, UntypedFormGroup } from '@angular/forms';
import { OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['../sign-form-style.scss']
})
export class SignInComponent implements OnInit {
  httpClient : HttpClient;
  signInForm!: UntypedFormGroup;

  constructor(_http: HttpClient, private authServise: AuthService){
    this.httpClient = _http;
  }

  ngOnInit(): void {
    this.signInForm = new UntypedFormGroup ({
      login: new FormControl (''),
      password: new FormControl (''),
    });

   /**Functional demo from last solar lecture. don't forget to delete***/ 
    this.signInForm.valueChanges.subscribe((value) => {
      console.log('signInForm.valueChanges: ', value);
    });
    this.signInForm.statusChanges.subscribe((value) => {
      console.log('signInForm.statusChanges: ', value);
    });
  }

  signIn() {
    if(this.signInForm.valid){
      this.authServise.postToSignIn(this.signInForm.value).subscribe((response) => {
        console.log(response);
      });
    }
  }
  
}
