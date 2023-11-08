import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductExt } from '../../interfaces/product.interface';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  currentLoadedProduct!: ProductExt;
  
  constructor(private httpClient: HttpClient) {}

  createNewProduct(formData: FormData): Observable<any> {
    return this.httpClient.post(`${environment.$_API_URL}/Advert`, formData);
  }

  getProductById (id: string): Observable<ProductExt> {
     return this.httpClient.get<ProductExt>(`${environment.$_API_URL}/Advert/${id}`);
  }

  getImageSrc(id:string): string {
    if (!id) return '../../../../assets/img/pictures/noIMGS.png';
    let src = `${environment.$_API_URL}/Images/${id}`;
    return src;
  }
}
