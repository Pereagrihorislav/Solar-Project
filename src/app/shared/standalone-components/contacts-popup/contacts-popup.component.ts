import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-contacts-popup',
  templateUrl: './contacts-popup.component.html',
  styleUrls: ['./contacts-popup.component.scss'],
  imports: [RouterOutlet, RouterLink],
  standalone: true,
})
export class ContactsPopupComponent {

}
