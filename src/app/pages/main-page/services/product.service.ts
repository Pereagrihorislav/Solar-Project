import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) { }

  createNewProduct(formData: FormData): Observable<any> {
    return this.httpClient.post('http://194.87.237.48:5000/Advert', formData);
  }
}
