import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SignIn } from '../auth.interfaces';
import { SignUp } from '../auth.interfaces';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  postToSignIn(signIn: SignIn): Observable<any> {
    return this.httpClient
      .post('http://194.87.237.48:5000/Auth/Login', signIn);
  }

  postToSignUp(signUp: SignUp): Observable<any> {
    return this.httpClient
      .post('http://194.87.237.48:5000/Auth/Register', signUp);
  }

}
