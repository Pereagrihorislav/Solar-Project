import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './components/product/product.component';
import { ProductListComponent } from './components/product-list-main/product-list.component';
import { SidebarMenuComponent } from './components/sidebar-menu/sidebar-menu.component';



@NgModule({
  declarations: [
    ProductComponent,
    ProductListComponent,
    SidebarMenuComponent,
  ],
  imports: [
    CommonModule
  ]
})
export class MainPageModule { }
