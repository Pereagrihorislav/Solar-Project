import { Component, OnDestroy, OnInit } from '@angular/core';
import { EMPTY, Subscription, switchMap, tap } from 'rxjs';
import { SearchService } from 'src/app/layout-module/services/search-service/search.service';
import { Product } from '../../../interfaces/product.interface';
import { CategoryShort } from 'src/app/layout-module/interfaces/categories.interface';

@Component({
  selector: 'app-product-list-search',
  templateUrl: './product-list-search.component.html',
  styleUrls: ['./product-list-search.component.scss']
})

export class ProductListSearchComponent implements OnInit, OnDestroy {
  currentSearchInput!: CategoryShort;
 
  products: Array<Product> | undefined;
  refreshBySearchSub$!: Subscription;
  searchHotReloadSub$!: Subscription;
  searchByInputSub$!: Subscription;
  
 constructor(private searchService: SearchService){}

  displaySearchResults(): void {
    this.searchByInputSub$ = this.searchService.search(this.currentSearchInput).subscribe((response) => {
      this.products = response;
      this.products = this.products.sort(this.compareDates);
    });
  }

  ngOnInit(): void {
    this.searchHotReloadSub$ = this.searchService.searchInput$.subscribe((searchFormInput) => {
      this.currentSearchInput = searchFormInput;
      const storedCategory = localStorage.getItem('last-search-input');
      this.currentSearchInput = storedCategory ? JSON.parse(storedCategory) : '';
    });

   this.refreshBySearchSub$ = this.searchService.searchInput$
   .pipe(
    switchMap(() => {
      this.displaySearchResults();
      return EMPTY;
    })
   ).subscribe();
  }

  compareDates(a: Product, b: Product): number {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return dateB.getTime() - dateA.getTime();
  }

  ngOnDestroy(): void {
  this.refreshBySearchSub$?.unsubscribe();
  this.searchHotReloadSub$?.unsubscribe();
  this.searchByInputSub$?.unsubscribe();
  }
}
