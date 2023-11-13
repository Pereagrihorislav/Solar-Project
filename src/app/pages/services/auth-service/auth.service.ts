import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { SignIn } from '../../interfaces/auth.interfaces';
import { SignUp } from '../../interfaces/auth.interfaces';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token!: string;

  private authStatusSource$ = new BehaviorSubject<boolean>(false);
  authStatus$ = this.authStatusSource$.asObservable();

  constructor(private httpClient: HttpClient) {}

  postToSignIn(signIn: SignIn): Observable<any> {
    return this.httpClient
      .post<any>(`${environment.$_API_URL}/Auth/Login`, signIn)
      .pipe(
        tap((token) => {
        localStorage.setItem('auth-token', `Bearer ${token}`)
        this.setToken(`Bearer ${token}`)})
       );
  }

  postToSignUp(signUp: SignUp): Observable<any> {
    return this.httpClient
      .post(`${environment.$_API_URL}/Auth/Register`, signUp);
  }

  setToken(token: string): void {
    this.token = token;
    this.authStatusSource$.next(!!token);
  }

  getToken(): string {
    return this.token;
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  isAuthenticatedStatus(): Observable<boolean> {
    return of (!!this.token);
  }

  SignOut(): void {
    this.setToken('');
    localStorage.removeItem('auth-token');
    localStorage.removeItem('user-name');
    //localStorage.clear();
  }
}
