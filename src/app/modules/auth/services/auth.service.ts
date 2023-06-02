import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { User } from '../components/models/user.model';


interface LoginContextInterface {
  username: string;
  password: string;
  token: string;
}

const defaultUser = {
  username: 'mahendra',
  password: 'mahendra',
  token: 'mahendra'
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token: string = '';

  login(loginContext: LoginContextInterface): Observable<User> {
    const isDefaultUser =
      loginContext.username === defaultUser.username &&
      loginContext.password === defaultUser.password;

    if (isDefaultUser) {
      return of(defaultUser);
    }

    return throwError('Invalid username or password');
  }

  logout(): Observable<boolean> {
    return of(false);
  }
}
