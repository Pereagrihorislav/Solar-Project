import { Component, OnInit, TemplateRef } from '@angular/core';
import { ProductService } from '../../main-page/services/product.service';
import { ProductExt } from '../../main-page/components/product/product.interface';
import { ActivatedRoute } from '@angular/router';
import { format, parseISO } from 'date-fns';
import { Subscription } from 'rxjs';
import { ModalService } from '../../modal-popups/services/modal.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {
  product!: ProductExt;
  productSubscription!: Subscription;

  constructor (private productService: ProductService, private modalService: ModalService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const productId = params.get('id'); 
      if (productId) {
        this.productSubscription = this.productService.getProductById(productId).subscribe((response) => {
          this.productService.currentLoadedProduct = response;
          this.product =  Object.assign({}, this.productService.currentLoadedProduct);
          console.log(this.product);
        })
      }
    });
  }

  openModal(modalTemplate: TemplateRef<any>) {
    this.modalService
      .open(modalTemplate, { size: 'lg', title: `${this.product.user.name}`, value: `${this.product.phone}` })
      .subscribe((action) => {
        console.log('modalAction', action);
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
