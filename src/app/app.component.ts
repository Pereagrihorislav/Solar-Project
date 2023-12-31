import { Component, OnInit } from '@angular/core';
import { AuthService } from './pages/services/auth-service/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title: any;

  constructor (private auth: AuthService) {}

  ngOnInit(): void {
    const potentialToken = localStorage.getItem('auth-token')
    if (potentialToken) {
      this.auth.setToken(potentialToken)
    }
  }
}
