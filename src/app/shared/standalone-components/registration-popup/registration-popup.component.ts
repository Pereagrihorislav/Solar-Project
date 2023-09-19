import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-registration-popup',
  templateUrl: './registration-popup.component.html',
  styleUrls: ['./registration-popup.component.scss'],
  imports: [RouterOutlet, RouterLink],
  standalone: true,
})
export class RegistrationPopupComponent {

}
