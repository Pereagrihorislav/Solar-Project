import { Component, Input, OnDestroy } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormControl, FormGroup, UntypedFormGroup, Validators } from '@angular/forms';
import { OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from 'src/app/pages/main-page/services/user.service';



@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['../sign-form-style.scss']
})
export class SignInComponent implements OnInit {
  httpClient : HttpClient;
  signInForm!: UntypedFormGroup;
  badGatewayStatus: boolean = false;

  constructor(_http: HttpClient, private authService: AuthService, private userService: UserService, private router: Router){
    this.httpClient = _http;
  }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) this.router.navigate(['/main']);

    this.signInForm = new UntypedFormGroup ({
      login: new FormControl ('', [Validators.required, Validators.maxLength(24)]),
      password: new FormControl ('', [Validators.required, Validators.minLength(8), Validators.maxLength(24)]),
    });

  }

  signIn() {
    if(this.signInForm.valid){
      this.authService.postToSignIn(this.signInForm.value).subscribe(
        () => {
        this.userService.getCurrentUserName().subscribe();
        this.router.navigate(['/main']);
        },
        (error) => {
          this.badGatewayStatus = true;
        }
      );
      
    }
  }
    
  
}
