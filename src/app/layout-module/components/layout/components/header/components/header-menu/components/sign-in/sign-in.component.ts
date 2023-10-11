import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/pages/auth-page/services/auth.service';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss', '../../../../header.component-adaptive.scss']
})
export class SignInComponent implements OnInit {
  authStatus: boolean = false;
  currentUser!: string | null;

  constructor(private auth: AuthService, private router: Router){}

  ngOnInit(): void {
    this.auth.authStatus.subscribe(response => this.authStatus = response);
    this.auth.currUsername.subscribe(response => {
      if(response) {
        this.currentUser = response;
      } else {
        this.currentUser = localStorage.getItem('user-name')!.replace(/"/g, '');
      }
    });
  }

  exit(): void {
    this.auth.SignOut()
    this.router.navigate(['/main'])
  }
}
