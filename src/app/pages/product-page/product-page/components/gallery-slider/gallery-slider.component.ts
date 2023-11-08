import { Component, Input, TemplateRef } from '@angular/core';
import { ProductExt } from 'src/app/pages/main-page/components/product/product.interface';
import { ModalService } from 'src/app/pages/modal-popups/services/modal.service';



@Component({
  selector: 'app-gallery-slider',
  templateUrl: './gallery-slider.component.html',
  styleUrls: ['./gallery-slider.component.scss']
})
export class GallerySliderComponent {
  @Input() product!: ProductExt;
  currentIndex: number = 0;
  selectedSlide: number | null = 0;

  
  constructor (private modalService: ModalService) {}
  
  
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
    if (!id) return '../../../../assets/img/pictures/noIMGS.png';
    let src = `http://194.87.237.48:5000/Images/${id}`;
    return src
  }

}
