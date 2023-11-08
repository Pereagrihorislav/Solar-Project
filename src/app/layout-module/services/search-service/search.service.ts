import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Product } from 'src/app/pages/interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private searchInputSource$ = new BehaviorSubject<string>('');
  searchInput$ = this.searchInputSource$.asObservable();
  static searchInput$: any;

  private searchCategorySource$ = new BehaviorSubject<{id: string, name: string}>({id: '', name: ''});
  searchCategory$ = this.searchCategorySource$.asObservable();
  static searchCategory$: any;

  constructor(private httpClient: HttpClient) {}

  changeSearchInput(input: string) {
    this.searchInputSource$.next(input);
  }

  changeSearchCategory(inputId: string, inputName: string) {
    this.searchCategorySource$.next({id: inputId, name: inputName});
  }

  searchByCategory(value: string): Observable<Array<Product>> {
    return this.httpClient
    .post<Array<Product>>(`${environment.$_API_URL}/Advert/search`, {
      category: value
    })
  }

  search(value: string): Observable<Array<Product>> {
    return this.httpClient
    .post<Array<Product>>(`${environment.$_API_URL}/Advert/search`, {
      search: value
    })
  }
}
