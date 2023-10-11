import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EMPTY, Subscription, switchMap, tap } from 'rxjs';
import { SearchService } from 'src/app/layout-module/components/layout/components/header/services/search.service';
import { Product } from '../product/product.interface';

@Component({
  selector: 'app-product-list-search',
  templateUrl: './product-list-search.component.html',
  styleUrls: ['./product-list-search.component.scss']
})
export class ProductListSearchComponent implements OnInit, OnDestroy {

  currentSearchInput: string = ''
  private refreshBySearch!: Subscription;
  products: Array<Product> | undefined;

 constructor(private router: Router, _http: HttpClient, private searchService: SearchService){
  }

  displaySearchResults(): void {
    this.searchService.searchInput.subscribe((searchFormInput) => {
      this.currentSearchInput = searchFormInput;
    });

    this.searchService.search(this.currentSearchInput).subscribe((response) => {
      console.log(response);
      this.products = response;
    });

  }

  ngOnInit(): void {
   this.refreshBySearch = this.searchService.searchInput
   .pipe(
    switchMap(() => {
      this.displaySearchResults();
      return EMPTY;
    })
   ).subscribe()

  }

  ngOnDestroy(): void {
    this.refreshBySearch.unsubscribe;
  }
}
