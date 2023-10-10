import { Component, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormControl, FormGroup, UntypedFormGroup, Validators } from '@angular/forms';
import { OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';



@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['../sign-form-style.scss']
})
export class SignInComponent implements OnInit {
  httpClient : HttpClient;
  signInForm!: UntypedFormGroup;
  badGatewayStatus: boolean = false;

  constructor(_http: HttpClient, private authServise: AuthService, private router: Router){
    this.httpClient = _http;
  }

  ngOnInit(): void {
    if (this.authServise.isAuthenticated()) this.router.navigate(['/main']);

    this.signInForm = new UntypedFormGroup ({
      login: new FormControl ('', [Validators.required, Validators.maxLength(24)]),
      password: new FormControl ('', [Validators.required, Validators.minLength(8), Validators.maxLength(24)]),
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
      this.authServise.postToSignIn(this.signInForm.value).subscribe(
        (response) => {
        this.router.navigate(['/main'])
        },
        (error) => {
          this.badGatewayStatus = true;
        }
      );
      
    }
  }

  
    
  
}
