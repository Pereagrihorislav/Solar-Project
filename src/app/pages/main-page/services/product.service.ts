import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../components/product/product.interface';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private _http: HttpClient) { }

  getAllProducts():Observable<Array<Product>> {
    return this._http.get<Array<Product>>('https:/fakestoreapi.com/products')
  }

}
