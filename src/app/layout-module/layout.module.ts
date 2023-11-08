import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { MainComponent } from './components/main/main.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderLogoComponent } from './components/header/components/header-logo/header-logo.component';
import { HeaderMenuComponent } from './components/header/components/header-menu/header-menu.component';
import { CategoriesComponent } from './components/header/components/header-menu/components/categories/categories.component';
import { SearchFormComponent } from './components/header/components/header-menu/components/search-form/search-form.component';
import { AddProductComponent } from './components/header/components/header-menu/components/add-product/add-product.component';
import { SignInBtnComponent } from './components/header/components/header-menu/components/sign-in-btn/sign-in-btn.component';
import { FormsModule } from '@angular/forms';
import { LayoutRoutingModule } from './layout-routing.module';

@NgModule({
  declarations: [
    HeaderComponent,
    MainComponent,
    FooterComponent,
    HeaderLogoComponent,
    HeaderMenuComponent,
    CategoriesComponent,
    SearchFormComponent,
    AddProductComponent,
    SignInBtnComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    LayoutRoutingModule,
  ],
  exports: [
    HeaderComponent,
    MainComponent,
    FooterComponent
  ]
})
export class LayoutModule { }
