import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Search } from '../interfaces/search-interface';


@Injectable({
  providedIn: 'root'
})
export class SearchService {


  private searchInputSource = new BehaviorSubject<string>('');
  searchInput = this.searchInputSource.asObservable();
  static searchInput: any;

  private searchCategorySource = new BehaviorSubject<{id: string, name: string}>({id: '', name: ''});
  searchCategory = this.searchCategorySource.asObservable();
  static searchCategory: any;

  constructor(private httpClient: HttpClient) { }

  changeSearchInput(input: string) {
    this.searchInputSource.next(input);
  }

  changeSearchCategory(inputId: string, inputName: string) {
    this.searchCategorySource.next({id: inputId, name: inputName});
  }

  searchByCategory(value: string): Observable<any[]> {
    return this.httpClient
    .post<any[]>('http://194.87.237.48:5000/Advert/search', {
      category: value
    })
  }

  search(value: string): Observable<any[]> {
    return this.httpClient
    .post<any[]>('http://194.87.237.48:5000/Advert/search', {
      search: value
    })
  }
}
