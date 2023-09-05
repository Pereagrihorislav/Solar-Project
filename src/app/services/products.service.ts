import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Root } from '../components/product/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private _http: HttpClient) { }

  getProducts():Observable<Root> {
    return this._http.get<Root>('https://fakerapi.it/api/v1/products?_quantity=10&_taxes=12&_categories_type=uuid')
  }

}
