import { Component, OnInit } from '@angular/core';
import { Product } from '../product/product.interface';
import { SearchService } from 'src/app/layout-module/components/layout/components/header/services/search.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  products: Array<Product> | undefined;


  constructor(private searchService: SearchService) {}

  ngOnInit() {
    this.searchService.search('').subscribe((response) => {
      this.products = response
    })
  }

}
