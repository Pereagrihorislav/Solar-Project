import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AuthorizationPopupComponent } from './shared/standalone-components/authorization-popup/authorization-popup.component';
import { RegistrationPopupComponent } from './shared/standalone-components/registration-popup/registration-popup.component';
import { ContactsPopupComponent } from './shared/standalone-components/contacts-popup/contacts-popup.component';



@NgModule({
  declarations: [
    AppComponent,
    AuthorizationPopupComponent,
    RegistrationPopupComponent,
    ContactsPopupComponent,
   
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
