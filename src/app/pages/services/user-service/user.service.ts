import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, switchMap } from 'rxjs';
import { User } from '../../interfaces/user.interface';
import { SignUp } from '../../interfaces/auth.interfaces';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currUsernameSource$ = new BehaviorSubject<string>('');
  currUsername$ = this.currUsernameSource$.asObservable();

  private currUserIdSource$ = new BehaviorSubject<string>('');
  currUserId$ = this.currUserIdSource$.asObservable();
  
  constructor(private httpClient: HttpClient) {}

  getCurrentUserName(): Observable<User> {
    return this.httpClient.get<User>(`${environment.$_API_URL}/Users/current`).pipe(
      switchMap((user) => {
      const name = user.name || '';
      localStorage.setItem('user-name', JSON.stringify(name));
      this.currUsernameSource$.next(name);
      return of(user);
    }));
  }

  getCurrentUserId(): Observable<User> {
    return this.httpClient.get<User>(`${environment.$_API_URL}/Users/current`).pipe(
      switchMap((user) => {
      const id = user.id || '';
      localStorage.setItem('user-id', JSON.stringify(id));
      this.currUserIdSource$.next(id);
      return of(user);
    }));
  }

  updateCurrentUser(formData: FormData, id: string): Observable<any> {
    return this.httpClient.put<any>(`${environment.$_API_URL}/Users/${id}`, formData);
  }

  getCurrentUser(): Observable<User> {
    return this.httpClient.get<User>(`${environment.$_API_URL}/Users/current`);
  }

  deleteCurrentUser(id: string): Observable<any> {
    return this.httpClient.delete(`${environment.$_API_URL}/Users/${id}`);
  }
}
