import {  HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable, inject } from "@angular/core"; 
import { Router } from "@angular/router";
import { EMPTY, Observable, catchError, finalize, switchMap, switchMapTo, throwError, timer } from "rxjs";
import { SpinnerService } from "../loading-animation/spinner.service";

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private spinnerService: SpinnerService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.spinnerService.set(true);
    return timer(1500).pipe(
    switchMap(() => next.handle(request)),
      finalize(() => {
        this.spinnerService.set(false);
      })
    );
  }
}