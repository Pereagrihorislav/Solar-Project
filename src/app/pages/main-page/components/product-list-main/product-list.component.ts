import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../../../interfaces/product.interface';
import { SearchService } from 'src/app/layout-module/services/search-service/search.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss', './product-list.component-adaptive.scss']
})

export class ProductListComponent implements OnInit, OnDestroy{
  products: Array<Product> | undefined;
  searchSub$!: Subscription;

  constructor(private searchService: SearchService) {}

  ngOnInit(): void {
    this.searchSub$ = this.searchService.search('').subscribe(response => {
      this.products = response;
    })
  }

  ngOnDestroy(): void {
    this.searchSub$?.unsubscribe();
  }

}
