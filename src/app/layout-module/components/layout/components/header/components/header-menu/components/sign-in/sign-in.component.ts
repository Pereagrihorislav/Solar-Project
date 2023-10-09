import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { AuthService } from 'src/app/pages/auth-page/services/auth.service';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit, OnChanges {
  authStatus: boolean = false;

  constructor(private auth: AuthService, private router: Router){}

  ngOnInit(): void {
    this.auth.isAuthenticatedStatus().subscribe((response) => {
      this.authStatus = response
      
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes)
    this.auth.isAuthenticatedStatus().subscribe((response) => {this.authStatus = response})
  }

  exit(): void {
    this.auth.SignOut()
    this.router.navigate(['/main'])
  }
}
