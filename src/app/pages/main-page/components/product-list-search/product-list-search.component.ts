import { Component, OnDestroy, OnInit } from '@angular/core';
import { EMPTY, Subscription, switchMap, tap } from 'rxjs';
import { SearchService } from 'src/app/layout-module/services/search-service/search.service';
import { Product } from '../../../interfaces/product.interface';

@Component({
  selector: 'app-product-list-search',
  templateUrl: './product-list-search.component.html',
  styleUrls: ['./product-list-search.component.scss']
})

export class ProductListSearchComponent implements OnInit, OnDestroy {
  currentSearchInput: string = '';
  products: Array<Product> | undefined;
  refreshBySearchSub$!: Subscription;
  searchHotReloadSub$!: Subscription;
  searchSub$!: Subscription;

 constructor(private searchService: SearchService){}

  displaySearchResults(): void {
    this.searchHotReloadSub$ = this.searchService.searchInput$.subscribe((searchFormInput) => {
      this.currentSearchInput = searchFormInput;
    });

    this.searchSub$ = this.searchService.search(this.currentSearchInput).subscribe((response) => {
      this.products = response;
    });
  }

  ngOnInit(): void {
   this.refreshBySearchSub$ = this.searchService.searchInput$
   .pipe(
    switchMap(() => {
      this.displaySearchResults();
      return EMPTY;
    })
   ).subscribe();
  }

  ngOnDestroy(): void {
    this.searchSub$?.unsubscribe();
    this.refreshBySearchSub$?.unsubscribe();
    this.searchHotReloadSub$?.unsubscribe();
  }
}
