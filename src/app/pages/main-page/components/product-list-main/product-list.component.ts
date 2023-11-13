import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../../../interfaces/product.interface';
import { SearchService } from 'src/app/layout-module/services/search-service/search.service';
import { Subscription } from 'rxjs';
import { CategoryShort } from 'src/app/layout-module/interfaces/categories.interface';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss', './product-list.component-adaptive.scss']
})

export class ProductListComponent implements OnInit, OnDestroy{
  products: Array<Product> | undefined;
  visibleProducts: Array<Product> | undefined;
  currentPage = 1; // текущая страница данных
  itemsPerPage = 50; // количество элементов на странице
  isLoading = false; // флаг, чтобы избежать многократных запросов
  searchSub$!: Subscription;
  searchObj: CategoryShort = {id: '', name: ''}


  constructor(private searchService: SearchService) {}

  ngOnInit(): void {
    this.searchSub$ = this.searchService.search(this.searchObj).subscribe(response => {
      this.products = response;
      if (response) {
        this.loadVisibleProducts();
      }
    })
  }

  loadVisibleProducts() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.visibleProducts = this.products?.slice(startIndex, endIndex);
  }

  onPageChange() {
    console.log('SCROLL')
    this.currentPage++;
    this.loadVisibleProducts();
  }

  ngOnDestroy(): void {
    this.searchSub$?.unsubscribe();
  }

}
