import { Component, OnDestroy, OnInit } from '@angular/core';
import { EMPTY, Subscription, switchMap, tap } from 'rxjs';
import { SearchService } from 'src/app/layout-module/services/search-service/search.service';
import { Product } from '../../../interfaces/product.interface';
import { Router } from '@angular/router';
import { Category, CategoryShort } from 'src/app/layout-module/interfaces/categories.interface';

@Component({
  selector: 'app-product-list-search',
  templateUrl: './product-list-search.component.html',
  styleUrls: ['./product-list-search.component.scss']
})

export class ProductListSearchComponent implements OnInit, OnDestroy {
  currentSearchInput!: CategoryShort;
  //currentCategoryInput: Category = {id: '', name: ''};
  products: Array<Product> | undefined;
  refreshBySearchSub$!: Subscription;
  searchHotReloadSub$!: Subscription;
  categorySearchHotReloadSub$!: Subscription;
  searchByInputSub$!: Subscription;
  searchByCategorySub$!: Subscription;
  

 constructor(private searchService: SearchService, private router: Router){}

  displaySearchResults(): void {

    this.searchByInputSub$ = this.searchService.search(this.currentSearchInput).subscribe((response) => {
      this.products = response;
      console.log(response + ' RESPONSE')
      console.log(this.products)
    });
    
    /*if(this.currentSearchInput && !this.currentCategoryInput.id ) {
      this.searchByInputSub$ = this.searchService.search(this.currentSearchInput).subscribe((response) => {
        this.products = response;
        console.log(this.products)
      });
    } else if (this.currentCategoryInput.id && !this.currentSearchInput) {
      this.searchByCategorySub$ = this.searchService.searchByCategory(this.currentCategoryInput).subscribe((response) => {
        this.products = response;
        //this.searchService.changeSearchCategory('','');
        this.currentCategoryInput.id = '';
      });
    } else if (this.currentSearchInput && this.currentCategoryInput) {
        this.searchByCategorySub$ = this.searchService.searchByCategory(this.currentCategoryInput).subscribe((response) => {
          this.products = response;
          if(response.length === 0) {
            this.searchByInputSub$ = this.searchService.search(this.currentSearchInput).subscribe((response) => {
              this.products = response;
            });
          }
        //this.searchService.changeSearchInput('');
        this.currentCategoryInput = '';
      });
    }*/
  }

  ngOnInit(): void {
    this.searchHotReloadSub$ = this.searchService.searchInput$.subscribe((searchFormInput) => {
      this.currentSearchInput = searchFormInput;
      const storedCategory = localStorage.getItem('last-search-input');
      this.currentSearchInput = storedCategory ? JSON.parse(storedCategory) : '';
      console.log(this.currentSearchInput)


    });

    /*this.categorySearchHotReloadSub$ = this.searchService.searchCategory$.subscribe((searchCategory) => {
      this.currentCategoryInput = searchCategory;
      if (!searchCategory.id) {
        const storedCategory = localStorage.getItem('last-category-input');
        this.currentCategoryInput = storedCategory ? storedCategory.replace(/"/g, '') : '';
      }
    });*/
    

   this.refreshBySearchSub$ = this.searchService.searchInput$
   .pipe(
    switchMap(() => {
      this.displaySearchResults();
      return EMPTY;
    })
   ).subscribe();

   /*this.searchService.searchCategory$
   .pipe(
    switchMap(() => {
      this.displaySearchResults();
      return EMPTY;
    })
   ).subscribe();*/
  }

  ngOnDestroy(): void {
  this.refreshBySearchSub$?.unsubscribe();
  this.searchHotReloadSub$?.unsubscribe();
  this.categorySearchHotReloadSub$?.unsubscribe();
  this.searchByInputSub$?.unsubscribe();
  this.searchByCategorySub$?.unsubscribe();
  }
}
