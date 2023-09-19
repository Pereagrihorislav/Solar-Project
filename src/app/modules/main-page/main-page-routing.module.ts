import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list-main/product-list.component';
import { ProductComponent } from './components/product/product.component';
import { ProductListSearchComponent } from './components/product-list-search/product-list-search.component';
import { ProductListUsersComponent } from './components/product-list-users/product-list-users.component';
import { SidebarMenuComponent } from './components/sidebar-menu/sidebar-menu.component';

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
    path: 'userproducts',
    component: ProductListUsersComponent,
  },
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainPageRoutingModule { }
