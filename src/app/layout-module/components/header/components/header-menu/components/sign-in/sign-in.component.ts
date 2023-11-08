import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/pages/services/auth-service/auth.service';
import { UserService } from 'src/app/pages/services/user-service/user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss', '../../../../header.component-adaptive.scss']
})

export class SignInComponent implements OnInit, OnDestroy {
  authStatus: boolean = false;
  currentUser!: string | null;
  authStatusSubs$!: Subscription;
  currUserNameSubs$!: Subscription;

  constructor(private authService: AuthService, private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.authStatusSubs$ = this.authService.authStatus$.subscribe(response => this.authStatus = response);
    this.currUserNameSubs$ = this.userService.currUsername$.subscribe(response => {
      if(response) {
        this.currentUser = response;
      } else {
        const storedUsername = localStorage.getItem('user-name');
        this.currentUser = storedUsername ? storedUsername.replace(/"/g, '') : '';
      }
    });
  }

  exit(): void {
    this.authService.SignOut();
    this.router.navigate(['/main']);
  }

  ngOnDestroy(): void {
    this.authStatusSubs$.unsubscribe();
    this.currUserNameSubs$.unsubscribe();
  }
}
