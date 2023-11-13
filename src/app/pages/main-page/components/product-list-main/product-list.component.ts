import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../../../interfaces/product.interface';
import { SearchService } from 'src/app/layout-module/services/search-service/search.service';
import { Subscription } from 'rxjs';
import { format, parseISO } from 'date-fns';
import { CategoryShort } from 'src/app/layout-module/interfaces/categories.interface';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss', './product-list.component-adaptive.scss']
})

export class ProductListComponent implements OnInit, OnDestroy{

  products: Array<Product> | undefined;
  searchSub$!: Subscription;
  searchObj: CategoryShort = {id: '', name: ''}
  
  constructor(private searchService: SearchService) {}

  ngOnInit(): void {
    this.searchSub$ = this.searchService.search(this.searchObj).subscribe(response => {
      this.products = response;
      this.products = this.products.sort(this.compareDates);
    })
  }

  compareDates(a: Product, b: Product): number {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return dateB.getTime() - dateA.getTime();
  }

  ngOnDestroy(): void {
    this.searchSub$?.unsubscribe();
  }

}
