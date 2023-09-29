import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppModule } from './app/app.module';
import { AppComponent } from './app/app.component';
import { Routes, provideRouter } from '@angular/router';

const routes: Routes = [
  {
    path: 'authorization',
    loadComponent: () =>
      import('./app/shared/standalone-components/authorization-popup/authorization-popup.component').then(
        (c) => c.AuthorizationPopupComponent)
  },
  {
    path: 'contacts',
    loadComponent: () =>
      import('./app/shared/standalone-components/contacts-popup/contacts-popup.component').then(
        (c) => c.ContactsPopupComponent)
  },
  {
    path: 'registration',
    loadComponent: () =>
      import('./app/shared/standalone-components/registration-popup/registration-popup.component').then(
        (c) => c.RegistrationPopupComponent)
  },
]


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

 /* bootstrapApplication(AppComponent, {
    providers: [provideRouter(routes)],
  }).catch((err) => console.error(err))*/

