import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { SignIn } from '../auth.interfaces';
import { SignUp } from '../auth.interfaces';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token!: string;

  constructor(private httpClient: HttpClient) { }

  postToSignIn(signIn: SignIn): Observable<any> {
    return this.httpClient
      .post<any>('http://194.87.237.48:5000/Auth/Login', signIn)
      .pipe(tap((token) => {
        localStorage.setItem('auth-token', `Bearer ${token}`)
        this.setToken(token)
      }));
  }

  postToSignUp(signUp: SignUp): Observable<any> {
    return this.httpClient
      .post('http://194.87.237.48:5000/Auth/Register', signUp);
  }

  setToken(token: string) {
    this.token = `Bearer ${token}`
  }

  getToken(): string {
    return this.token;
  }

  isAuthenticated(): boolean {
    console.log(!!this.token)
    return !!this.token
  }

  SignOut(){
    this.setToken('')
    localStorage.clear
  }

  

}
