import { Component, OnDestroy } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Subscription, catchError, delay, finalize, of, tap } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy {

  error: string = '';
  isLoading: boolean = false;
  loginForm: UntypedFormGroup;

  private sub = new Subscription();

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.initForm();
  }

  get f() {
    return this.loginForm.controls;
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  login() {
    this.isLoading = true;

    const credentials = this.loginForm.value;

    this.sub = this.authService
      .login(credentials)
      .pipe(
        delay(0),
        tap(() => this.router.navigate(['/dashboard'])),
        finalize(() => (this.isLoading = false)),
        catchError(error => of((this.error = error)))
      )
      .subscribe();
  }
  private initForm() {
    return new UntypedFormGroup({
      username: new UntypedFormControl(''),
      password: new UntypedFormControl('')
    });
  }
}
