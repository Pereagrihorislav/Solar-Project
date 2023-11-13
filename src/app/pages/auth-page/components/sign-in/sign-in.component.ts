import { Component, OnDestroy } from '@angular/core';
import { FormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth-service/auth.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/pages/services/user-service/user.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['../sign-form-style.scss']
})

export class SignInComponent implements OnInit, OnDestroy {
  signInForm!: UntypedFormGroup;
  badGatewayStatus: boolean = false;
  signInSubs$!: Subscription;
  getUserSub$!: Subscription;

  constructor(private authService: AuthService, private userService: UserService, private router: Router) {
    this.buildForm();
  }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) this.router.navigate(['/main']);
  }

  private buildForm(): void {
    this.signInForm = new UntypedFormGroup ({
      login: new FormControl ('', [Validators.required, Validators.maxLength(24)]),
      password: new FormControl ('', [Validators.required, Validators.minLength(8), Validators.maxLength(24)]),
    });
  }

  signIn(): void {
    if(this.signInForm.valid){
      this.signInSubs$ = this.authService.postToSignIn(this.signInForm.value).subscribe(() => {
        this.userService.getCurrentUserName().subscribe();
        this.userService.getCurrentUserId().subscribe();
        this.router.navigate(['/main']);
        },
        (error) => {
          this.badGatewayStatus = true;
        }
      );
    }
  }

  ngOnDestroy(): void {
    this.signInSubs$?.unsubscribe();
  }
}
