import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './components/layout/layout.component';
import { HeaderComponent } from './components/layout/components/header/header.component';
import { MainComponent } from './components/layout/components/main/main.component';
import { FooterComponent } from './components/layout/components/footer/footer.component';




@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    MainComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LayoutComponent,
    HeaderComponent,
    MainComponent,
    FooterComponent
  ]
})
export class LayoutModule { }
