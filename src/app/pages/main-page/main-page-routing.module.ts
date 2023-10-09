import { NgModule, inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterModule, RouterStateSnapshot, Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list-main/product-list.component';
import { ProductComponent } from './components/product/product.component';
import { ProductListSearchComponent } from './components/product-list-search/product-list-search.component';
import { ProductListUsersComponent } from './components/product-list-users/product-list-users.component';
import { SidebarMenuComponent } from './components/product-list-search/components/sidebar-menu/sidebar-menu.component';
import { AuthService } from '../auth-page/services/auth.service';

const routes: Routes = [
  {
    path: '',
    component: ProductListComponent,
  },
  {
    path: 'search',
    component: ProductListSearchComponent,
  },
  {
    path: 'user-products',
    canActivate: [(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
      inject(AuthService).isAuthenticated() ? false : inject(Router).navigate(['/auth/sign-in']);  
    }],
    component: ProductListUsersComponent,
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainPageRoutingModule { }
