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

    this.authService.login(credentials).subscribe((resp: any) => {
      console.log(resp);
      localStorage.setItem('accessToken', resp?.data[0].accessToken);
      localStorage.setItem('fullName', resp?.data[0].name);
      this.router.navigate(['/dashboard']);
    });
  }
  private initForm() {
    return new UntypedFormGroup({
      email: new UntypedFormControl(''),
      password: new UntypedFormControl('')
    });
  }
}
