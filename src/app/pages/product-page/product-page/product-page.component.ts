import { Component, OnInit, TemplateRef } from '@angular/core';
import { ProductService } from '../../services/product-service/product.service';
import { ProductExt } from '../../interfaces/product.interface';
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
  productSub$!: Subscription;
  productIdSub$!: Subscription;
  openModalSub$!: Subscription;

  constructor (private productService: ProductService, private modalService: ModalService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.productSub$ = this.route.paramMap.subscribe(params => {
      const productId = params.get('id'); 
      if (productId) {
        this.productIdSub$ = this.productService.getProductById(productId).subscribe((response) => {
          this.productService.currentLoadedProduct = response;
          this.product =  Object.assign({}, this.productService.currentLoadedProduct);
        })
      }
    });
  }

  openModal(modalTemplate: TemplateRef<any>): void {
    this.openModalSub$ = this.modalService
      .open(modalTemplate, { size: 'lg', title: `${this.product.user.name}`, value: `${this.product.phone}` })
      .subscribe();
  }

  formatDateTime(dateTimeString: string): string {
    const parsedDate = parseISO(dateTimeString); 
    return format(parsedDate, 'dd.MM.yyyy HH:mm'); 
  }

  ngOnDestroy(): void {
    if (this.productIdSub$) {
      this.productIdSub$?.unsubscribe();
    }
    this.productSub$?.unsubscribe();
    this.openModalSub$?.unsubscribe();
  }
}
