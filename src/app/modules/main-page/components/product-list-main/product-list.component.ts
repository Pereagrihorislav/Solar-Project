import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../product/services/product.service';
import { Daum } from '../product/product.interface';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  products: Daum[] = []

  constructor(private _productService: ProductsService) {}

  ngOnInit() {
    this._productService.getProducts().subscribe(resp => {
      this.products = resp.data
    })
  }

}
