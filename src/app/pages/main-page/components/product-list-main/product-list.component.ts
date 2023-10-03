import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/product.service';
import { Product } from '../product/product.interface';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  products: Array<Product> | undefined;


  constructor(private _productService: ProductsService) {}

  ngOnInit() {
    this._productService.getAllProducts().subscribe(resp => {
      this.products = resp
    })
  }

}
