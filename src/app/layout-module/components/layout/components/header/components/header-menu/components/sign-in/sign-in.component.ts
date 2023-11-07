import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/pages/auth-page/services/auth.service';
import { UserService } from 'src/app/pages/main-page/services/user.service';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss', '../../../../header.component-adaptive.scss']
})
export class SignInComponent implements OnInit {
  authStatus: boolean = false;
  currentUser!: string | null;

  constructor(private authService: AuthService, private userService: UserService, private router: Router){}

  ngOnInit(): void {
    this.authService.authStatus.subscribe(response => this.authStatus = response);
    this.userService.currUsername.subscribe(response => {
      if(response) {
        this.currentUser = response;
      } else {
        const storedUsername = localStorage.getItem('user-name');
        this.currentUser = storedUsername ? storedUsername.replace(/"/g, '') : '';
      }
    });
  }

  exit(): void {
    this.authService.SignOut()
    this.router.navigate(['/main'])
  }
}
