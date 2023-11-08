import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category, ExtCategory } from '../../interfaces/categories.interface';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private defaultCategoryId: string = '00000000-0000-0000-0000-000000000000';

  constructor(private httpClient: HttpClient) {}

  getDefaultcategoryId(): string {
    return this.defaultCategoryId;
  }

  getAllCategories(): Observable <Array<Category>> {
    return this.httpClient.get<Array<Category>>(`${environment.$_API_URL}/Categories`);
  }

  getCategoryById(id: string): Observable <ExtCategory> {
    return this.httpClient.get<ExtCategory>(`${environment.$_API_URL}/Categories/${id}`);
  }
}
