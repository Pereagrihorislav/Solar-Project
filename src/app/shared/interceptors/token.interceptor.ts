import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "src/app/pages/services/auth-service/auth.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor (private auth: AuthService) {}

    intercept(req: HttpRequest<any>, next : HttpHandler): Observable<HttpEvent<any>> {
        this.auth.authStatus$.subscribe(response => {
            if (response) {
                req = req.clone({ setHeaders: {
                    Authorization: this.auth.getToken()
                    }
                });
            }
        })
        return next.handle(req); 
    }
}

