import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { AlertService } from '../services/alert.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private alertService: AlertService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('token') ?? sessionStorage.getItem('token');

    const req = request.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    });

    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        this.alertService.addAlert({
          id: Date.now(),
          type: 'danger',
          message: err.error?.payload?.message ?? 'Something went wrong!',
        });
        throw err;
      }),
    );
  }
}
