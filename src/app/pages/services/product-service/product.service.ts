import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, take } from 'rxjs';
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

  getProductById (id: string): Observable<ProductExt> {
    return this.httpClient.get<ProductExt>(`${environment.$_API_URL}/Advert/${id}`);
 }

  createNewProduct(formData: FormData): Observable<any> {
    return this.httpClient.post(`${environment.$_API_URL}/Advert`, formData);
  }

  updateProductById(formData: FormData, id: string): Observable<any> {
    return this.httpClient.put(`${environment.$_API_URL}/Advert/${id}`, formData);
  }

  deleteProductbyId (id: string): Observable<any> {
    return this.httpClient.delete(`${environment.$_API_URL}/Advert/${id}`);
  }

  /*I'm not entirely sure about this approach below, 
  the point is to close the component and unsubscribe before the response arrives. 
  Like in "background mode", so names will contain 'InBcgMode'.
  Otherwise, you have to wait, despite the fact that posting the ad takes quite a long time*/

  createInBcgMode(formData: FormData){
    this.createNewProduct(formData)
    .pipe(take(1))
    .subscribe();
  }

  updateInBcgMode(formData: FormData, id: string){
    this.updateProductById(formData, id)
    .pipe(take(1))
    .subscribe();
  }

  deleteInBcgMode(id: string){
    this.deleteProductbyId(id)
    .pipe(take(1))
    .subscribe();
  }

  changeEditStatus(status: boolean){
    this.editStatusSource$.next(status);
  }
  
}
