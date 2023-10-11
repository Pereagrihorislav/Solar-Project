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

  private currentSearchInput: string = ''
  private refreshSubscription!: Subscription;
  products: Array<Product> | undefined;

 constructor(private router: Router, _http: HttpClient, private searchService: SearchService){
  }

  displaySearchResults(): void {
    this.searchService.searchInput.subscribe(input => this.currentSearchInput = input);
    this.searchService.search(this.currentSearchInput).subscribe((response) => {
      console.log(response);
      this.products = response;
    });
    
  }

  ngOnInit(): void {
   this.refreshSubscription = this.searchService.searchInput.pipe(
    switchMap(() => {
      this.displaySearchResults();
      return EMPTY;
    })
   )
   .subscribe(input => console.log(input))
  }

  ngOnDestroy(): void {
    this.refreshSubscription.unsubscribe;
  }
}
