import { Component, ElementRef, Input, OnDestroy, Renderer2 } from '@angular/core';
import { Product } from '../../../interfaces/product.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription, map } from 'rxjs';
import { format, parseISO } from 'date-fns';
import { ProductService } from '../../../services/product-service/product.service';
import { ImagesService } from 'src/app/pages/services/images-service/images.service';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})

export class ProductComponent implements OnDestroy {
  id: Observable<string> = this.activatedRoute.params.pipe(map((r: any) => r.id));
  routeParamsSub$!: Subscription;
  routeQueryParamsSub$!: Subscription;
  image = document.getElementById('ProdImg')
  card = document.getElementById('ImgCard')

  @Input() product!: Product;

  constructor(
    private activatedRoute: ActivatedRoute,
    private renderer: Renderer2, 
    private el: ElementRef,
    private productService: ProductService, 
    private imagesService: ImagesService, 
    private router: Router) {

    this.routeParamsSub$ = this.activatedRoute.params.subscribe();
    this.routeQueryParamsSub$ = this.activatedRoute.queryParams.subscribe();

    this.image?.addEventListener('load', () =>{
      setTimeout(()=> {
        this.card?.classList.remove('loading')
      }, 1000);
    });
  }
  
  formatDateTime(dateTimeString: string): string {
    const parsedDate = parseISO(dateTimeString); 
    return format(parsedDate, 'dd.MM.yyyy HH:mm'); 
  }

  openProductPage(id: string): void {
      this.router.navigate([`product/${id}`]);
  }

  imageSrc(id: string): string {
    return this.imagesService.getImageSrc(id);
  }



  onImageLoad() {
    const imageElement = this.el.nativeElement.querySelector('#imageElement');
    this.renderer.removeClass(imageElement, 'loading-image');
  }

  ngOnDestroy(): void {
    this.routeParamsSub$?.unsubscribe();
    this.routeQueryParamsSub$?.unsubscribe();
  }

}
