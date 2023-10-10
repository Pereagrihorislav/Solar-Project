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

  constructor(private httpClient: HttpClient) { }

  changeSearchInput(input: string) {
    this.searchInputSource.next(input);
  }


  search(value: string): Observable<any[]> {
    return this.httpClient
        .post<any[]>('http://194.87.237.48:5000/Advert/search', {
          search: value
        })
  }
}
