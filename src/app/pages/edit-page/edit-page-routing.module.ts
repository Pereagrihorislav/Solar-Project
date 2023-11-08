import { NgModule, inject } from '@angular/core';
import { Router, RouterModule, Routes, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { EditFormComponent } from './components/edit-form/edit-form.component';
import { AuthService } from '../services/auth-service/auth.service';

const routes: Routes = [
  {
    path: 'product',
    canActivate: [(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
      inject(AuthService).isAuthenticated() ? false : inject(Router).navigate(['/auth/sign-in']);  
    }],
    component: EditFormComponent, 
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditPageRoutingModule { }