import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Product } from 'src/app/pages/interfaces/product.interface';
import { CategoryShort } from '../../interfaces/categories.interface';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  
  
  private searchInputSource$ = new BehaviorSubject<CategoryShort>({id: '', name: ''});
  searchInput$ = this.searchInputSource$.asObservable();
  static searchInput$: any;
  
  /*private searchCategorySource$ = new BehaviorSubject<CategoryShort>({id: '', name: ''});
  searchCategory$ = this.searchCategorySource$.asObservable();
  static searchCategory$: any;*/
  
  constructor(private httpClient: HttpClient) {}


  changeSearchInput(input: CategoryShort) {
  localStorage.setItem('last-search-input', JSON.stringify(input));
  this.searchInputSource$.next(input);
  }

  
  /*changeSearchCategory(input: CategoryShort) {
    localStorage.setItem('last-category-input', JSON.stringify(input))
    this.searchCategorySource$.next(input);
  }*/

  /*searchByCategory(value: string): Observable<Array<Product>> {
    localStorage.setItem('last-category-input', value)
    return this.httpClient
    .post<Array<Product>>(`${environment.$_API_URL}/Advert/search`, {
      category: value
    })
  }*/

  search(input: CategoryShort): Observable<Array<Product>> {
    if (!input.id) {
      localStorage.setItem('last-search-input', JSON.stringify(input));
      return this.httpClient
      .post<Array<Product>>(`${environment.$_API_URL}/Advert/search`, {
        search: input.name
      });  
    } else {
      localStorage.setItem('last-search-input', JSON.stringify(input))
      return this.httpClient
      .post<Array<Product>>(`${environment.$_API_URL}/Advert/search`, {
        category: input.id
      });
    }
  }
  

  /*
  search(value: string): Observable<Array<Product>> {
    localStorage.setItem('last-search-input', value);
    return this.httpClient
    .post<Array<Product>>(`${environment.$_API_URL}/Advert/search`, {
      search: value
    })
  }*/
}
