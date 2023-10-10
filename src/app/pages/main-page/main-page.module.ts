import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './components/product/product.component';
import { ProductListComponent } from './components/product-list-main/product-list.component';
import { SidebarMenuComponent } from './components/product-list-search/components/sidebar-menu/sidebar-menu.component';
import { MainPageRoutingModule } from './main-page-routing.module';
import { ProductListSearchComponent } from './components/product-list-search/product-list-search.component';
import { ProductListUsersComponent } from './components/product-list-users/product-list-users.component';



@NgModule({
  declarations: [
    ProductComponent,
    ProductListComponent,
    ProductListSearchComponent,
    ProductListUsersComponent,
    SidebarMenuComponent,
  ],
  imports: [
    CommonModule,
    MainPageRoutingModule
  ]
})
export class MainPageModule { }
