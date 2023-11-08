import { NgModule, inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterModule, RouterStateSnapshot, Routes } from '@angular/router';
import { AuthService } from '../services/auth-service/auth.service';
import { SettingsFormComponent } from './components/settings-form/settings-form.component';

const routes: Routes = [
  {
    path: 'user-settings',
    canActivate: [(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
      inject(AuthService).isAuthenticated() ? false : inject(Router).navigate(['/auth/sign-in']);  
    }],
    component: SettingsFormComponent, 
  },
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsPageRoutingModule { }