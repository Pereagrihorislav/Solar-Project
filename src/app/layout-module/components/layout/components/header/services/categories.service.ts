
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AsyncSubject, Observable } from 'rxjs';
import { Category, ExtCategory } from '../components/header-menu/components/categories/categories.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private defaultCategoryId: string = '00000000-0000-0000-0000-000000000000';

  getDefaultcategoryId(): string {
    return this.defaultCategoryId
  }

  constructor(private _http: HttpClient) { }

  
  getAllCategories(): Observable <Array<Category>> {
    return this._http.get<Array<Category>>('http://194.87.237.48:5000/Categories')
  }

  getCategoryById(id: string): Observable <ExtCategory> {
    return this._http.get<ExtCategory>(`http://194.87.237.48:5000/Categories/${id}`)
  }


}
