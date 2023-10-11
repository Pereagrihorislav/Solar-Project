import { Component } from '@angular/core';

@Component({
  selector: 'app-header-logo',
  template: `<div class="header__logo">
                <a routerLink="/main">{{storeTitle}}</a>
              </div>`,
  styleUrls: ['./header-logo.component.scss', '../../header.component-adaptive.scss']
})
export class HeaderLogoComponent {
  storeTitle: string = "FLEV MVRKET";
}
