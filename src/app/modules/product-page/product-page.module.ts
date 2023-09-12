import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryComponent } from './components/gallery/gallery.component';
import { DescriptionComponent } from './components/description/description.component';



@NgModule({
  declarations: [
    GalleryComponent,
    DescriptionComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ProductPageModule { }
