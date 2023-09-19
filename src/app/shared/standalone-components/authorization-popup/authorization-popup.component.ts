import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-authorization-popup',
  templateUrl: './authorization-popup.component.html',
  styleUrls: ['./authorization-popup.component.scss'],
  imports: [RouterOutlet, RouterLink],
  standalone: true,
})
export class AuthorizationPopupComponent {

}
