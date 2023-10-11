import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, switchMap, tap } from 'rxjs';
import { SignIn } from '../interfaces/auth.interfaces';
import { SignUp } from '../interfaces/auth.interfaces';
import { User } from '../interfaces/user.interface';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token!: string;

  constructor(private httpClient: HttpClient) { }

  postToSignIn(signIn: SignIn): Observable<any> {
    return this.httpClient
      .post<any>('http://194.87.237.48:5000/Auth/Login', signIn)
      .pipe(
        tap((token) => {
        localStorage.setItem('auth-token', `Bearer ${token}`)
        this.setToken(`Bearer ${token}`)})
       );
  }


  private authStatusSource = new BehaviorSubject<boolean>(false);
  authStatus = this.authStatusSource.asObservable();

  private currUsernameSource = new BehaviorSubject<string>('');
  currUsername = this.currUsernameSource.asObservable();
  



  getCurrentUser(): Observable<User>{
    return this.httpClient.get<User>('http://194.87.237.48:5000/Users/current').pipe(
      switchMap((user) => {
      const name = user.name || '';
      localStorage.setItem('user-name', JSON.stringify(name));
      this.currUsernameSource.next(name);
      return of(user);
    }));
  }

  postToSignUp(signUp: SignUp): Observable<any> {
    return this.httpClient
      .post('http://194.87.237.48:5000/Auth/Register', signUp);
  }

  setToken(token: string) {
    this.token = token;
    this.authStatusSource.next(!!token)
  }

  getToken(): string {
    return this.token;
  }

  isAuthenticated(): boolean {
    return !!this.token
  }

  /*Special for components, what changing dynamicly, depending on user's status 
    and I'm barely sure that's tecnicly incorrect*/
  isAuthenticatedStatus(): Observable<boolean> {
    return of (!!this.token)
  }

  SignOut(){
    this.setToken('')
    localStorage.clear()
  }

  

}
