import { Injectable } from '@angular/core';
import { Observable, catchError, of, retry, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  login(login: any) {
    return this.http.post<any>('v1/auth/token', login).pipe(retry(1), catchError(this.handleError));
  }

  logout(): Observable<boolean> {
    localStorage.removeItem('accessToken');
    this.router.navigate(['/auth/login']);
    return of(false);
  }

  get isLoggedIn(): boolean {
    const user = localStorage.getItem('accessToken');
    return user ? true : false;
  }

  // Error handling
  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}
