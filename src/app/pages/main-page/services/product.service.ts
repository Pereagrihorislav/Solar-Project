import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductExt } from '../components/product/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  currentLoadedProduct!: ProductExt;
  

  constructor(private httpClient: HttpClient) { }

  createNewProduct(formData: FormData): Observable<any> {
    return this.httpClient.post('http://194.87.237.48:5000/Advert', formData);
  }


  
  getProductById (id: string): Observable<ProductExt> {
     return this.httpClient.get<ProductExt>(`http://194.87.237.48:5000/Advert/${id}`);
  }
}
