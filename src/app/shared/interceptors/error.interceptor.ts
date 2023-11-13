import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable, inject } from "@angular/core"; 
import { Router } from "@angular/router";
import { EMPTY, Observable, catchError, throwError } from "rxjs";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req)
        .pipe(
            catchError((error: HttpErrorResponse) => {
                if (error instanceof HttpErrorResponse) {
                    if (error.error instanceof ErrorEvent) {
                        console.log('An error event occured')
                    } else {
                        switch (error.status) {
                            case 400:  //Invalid data
                                console.log(error.statusText);
                                break;
                            case 401:  //Unautorized
                                console.log(error.statusText);
                                break;
                            case 404:  //not found
                                console.log(error.statusText);
                                inject(Router).navigate(['/not-found'])
                                break;
                            case 500:  //Server Issues
                                console.log(error.statusText);
                                break;
                        }
                    }
                } else {
                    console.log('An error occured')
                }
                return throwError(() => new Error(error.statusText));
            })
        )
    }
}