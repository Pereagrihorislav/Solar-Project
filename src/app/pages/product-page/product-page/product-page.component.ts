import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../main-page/services/product.service';
import { ProductExt } from '../../main-page/components/product/product.interface';
import { ActivatedRoute } from '@angular/router';
import { format, parseISO } from 'date-fns';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {
  product!: ProductExt;
  productSubscription!: Subscription;

  constructor (private productService: ProductService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const productId = params.get('id'); 
      if (productId) {
        this.productSubscription = this.productService.getProductById(productId).subscribe((response) => {
          this.productService.currentLoadedProduct = response;
          this.product =  Object.assign({}, this.productService.currentLoadedProduct);
        })
      }
    });
  }

  formatDateTime(dateTimeString: string): string {
    const parsedDate = parseISO(dateTimeString); 
    return format(parsedDate, 'dd.MM.yyyy HH:mm'); 
  }

  

  ngOnDestroy(): void {
    if (this.productSubscription) {
      this.productSubscription.unsubscribe();
    }
  }

}
