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
  
  constructor(private httpClient: HttpClient) {}

  changeSearchInput(input: CategoryShort) {
  localStorage.setItem('last-search-input', JSON.stringify(input));
  this.searchInputSource$.next(input);
  }

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
  
}
