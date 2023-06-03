import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    const token = localStorage.getItem("auth_token");
    if (token) {
      request = this.addToken(request, token);
    }
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      TimeZoneOffset: new Date().getTimezoneOffset().toString()
    });

    request = request.clone({
      url: environment.API_URL + request.url,
      headers: headers,
    });

    return next.handle(request);
  }

  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      },
    });
  }
}