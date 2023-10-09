import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './components/layout/layout.component';
import { HeaderComponent } from './components/layout/components/header/header.component';
import { MainComponent } from './components/layout/components/main/main.component';
import { FooterComponent } from './components/layout/components/footer/footer.component';
import { HeaderLogoComponent } from './components/layout/components/header/components/header-logo/header-logo.component';
import { HeaderMenuComponent } from './components/layout/components/header/components/header-menu/header-menu.component';
import { CategoriesComponent } from './components/layout/components/header/components/header-menu/components/categories/categories.component';
import { SearchFormComponent } from './components/layout/components/header/components/header-menu/components/search-form/search-form.component';
import { AddProductComponent } from './components/layout/components/header/components/header-menu/components/add-product/add-product.component';
import { SignInComponent } from './components/layout/components/header/components/header-menu/components/sign-in/sign-in.component';
import { FormsModule } from '@angular/forms';
import { LayoutRoutingModule } from './layout-routing.module';




@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    MainComponent,
    FooterComponent,
    HeaderLogoComponent,
    HeaderMenuComponent,
    CategoriesComponent,
    SearchFormComponent,
    AddProductComponent,
    SignInComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    LayoutRoutingModule
  ],
  exports: [
    LayoutComponent,
    HeaderComponent,
    MainComponent,
    FooterComponent
  ]
})
export class LayoutModule { }
