import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../edit.interface';

@Injectable({
  providedIn: 'root'
})
export class EditService {

  constructor(private _http: HttpClient) { }

  
  getAllCategories():Observable <Array<Category>> {
    return this._http.get<Array<Category>>('http://194.87.237.48:5000/Categories')
  }



}
