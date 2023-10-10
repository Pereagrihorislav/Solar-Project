
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { SignIn } from '../auth.interfaces';

describe('AuthService', () => {
  let authService: AuthService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    });

    authService = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should post sign-in data and set token', () => {
    const signInData: SignIn = {login: 'Myname', password: 'Mypassword' };
    const token = 'your-token'; 

    authService.postToSignIn(signInData).subscribe(() => {
      expect(authService.getToken()).toBe(`Bearer ${token}`);
    });

    const req = httpTestingController.expectOne('http://194.87.237.48:5000/Auth/Login');
    expect(req.request.method).toBe('POST');
    req.flush(token);

    httpTestingController.verify();
  });
});

  