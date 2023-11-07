import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, switchMap } from 'rxjs';
import { User } from '../../auth-page/interfaces/user.interface';
import { SignUp } from '../../auth-page/interfaces/auth.interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  private currUsernameSource = new BehaviorSubject<string>('');
  currUsername = this.currUsernameSource.asObservable();
  

  getCurrentUserName(): Observable<User>{
    return this.httpClient.get<User>('http://194.87.237.48:5000/Users/current').pipe(
      switchMap((user) => {
      const name = user.name || '';
      localStorage.setItem('user-name', JSON.stringify(name));
      this.currUsernameSource.next(name);
      return of(user);
    }));
  }

  updateCurrentUser(formData: FormData, id: string) {
    return this.httpClient.put(`http://194.87.237.48:5000/Users/${id}`, formData);
  }

  getCurrentUser(): Observable<User> {
    return this.httpClient.get<User>('http://194.87.237.48:5000/Users/current');
  }

  deleteCurrentUser(id: string): Observable<any> {
    return this.httpClient.delete(`http://194.87.237.48:5000/Users/${id}`);
  }
}
