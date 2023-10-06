import { Component, OnInit } from '@angular/core';
import { AuthService } from './pages/auth-page/services/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor (private auth: AuthService) {}

  ngOnInit(): void {
    const potentialToken = localStorage.getItem('auth-token')
    if (potentialToken) {
      this.auth.setToken(potentialToken)
    }
  }
}
