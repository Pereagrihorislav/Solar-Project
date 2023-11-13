import { Component, Input } from '@angular/core';
import { ProductExt } from 'src/app/pages/interfaces/product.interface';
import { ImagesService } from 'src/app/pages/services/images-service/images.service';


@Component({
  selector: 'app-gallery-slider',
  templateUrl: './gallery-slider.component.html',
  styleUrls: ['./gallery-slider.component.scss', '../../product-page.component-adaptive.scss']
})
export class GallerySliderComponent {
  @Input() product!: ProductExt;
  currentIndex: number = 0;
  selectedSlide: number | null = 0;

  constructor (private imagesService: ImagesService) {}
  
  goToPrevious(): void {
    const isFirstSlide = this.currentIndex === 0;
    const newIndex = isFirstSlide ? this.product.imagesIds.length - 1 : this.currentIndex - 1;
    this.currentIndex = newIndex;
  }

  goToNext(): void {
    const isLastSlide = this.currentIndex === this.product.imagesIds.length - 1;
    const newIndex = isLastSlide ? 0 : this.currentIndex + 1;
    this.currentIndex = newIndex;
  }

  goToSlide(slideIndex: number): void {
    this.currentIndex = slideIndex;
    if (this.selectedSlide === slideIndex) {
      this.selectedSlide = null; 
    } else {
      this.selectedSlide = slideIndex; 
    }
  }

  isHighlighted(image: number): boolean {
    return this.selectedSlide === image;
  }

  imageSrc(id:string) : string {
   return this.imagesService.getImageSrc(id);
  }
}
