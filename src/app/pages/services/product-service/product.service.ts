import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { ProductExt } from '../../interfaces/product.interface';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  currentLoadedProduct!: ProductExt;
  productIsEditing: boolean = false;
  
  private editStatusSource$ = new BehaviorSubject<boolean>(false);
  editStatus$ = this.editStatusSource$.asObservable();
  
  constructor(private httpClient: HttpClient) {}

  createNewProduct(formData: FormData): Observable<any> {
    return this.httpClient.post(`${environment.$_API_URL}/Advert`, formData);
  }

  updateProductById(formData: FormData, id: string): Observable<any> {
    return this.httpClient.put(`${environment.$_API_URL}/Advert/${id}`, formData);
  }

  getProductById (id: string): Observable<ProductExt> {
     return this.httpClient.get<ProductExt>(`${environment.$_API_URL}/Advert/${id}`);
  }

  deleteProductbyId (id: string): Observable<any> {
    return this.httpClient.delete(`${environment.$_API_URL}/Advert/${id}`);
  }

  changeEditStatus(status: boolean){
    this.editStatusSource$.next(status);
  }
  
}
