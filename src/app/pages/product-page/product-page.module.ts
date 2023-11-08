import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductPageComponent } from './product-page/product-page.component';
import { ProductPageRoutingModule } from './product-page-routing.module';
import { GallerySliderComponent } from './product-page/components/gallery-slider/gallery-slider.component';

@NgModule({
  declarations: [
    ProductPageComponent,
    GallerySliderComponent,
  ],
  imports: [
    CommonModule,
    ProductPageRoutingModule,
  ]
})
export class ProductPageModule { }
