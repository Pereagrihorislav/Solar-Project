import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SearchService {
  constructor(private httpClient: HttpClient) { }
  search(value: string): Observable<any[]> {
    return this.httpClient
        .post<any[]>('http://194.87.237.48:5000/Advert/search', {
          search: value,
        })
  }
}
