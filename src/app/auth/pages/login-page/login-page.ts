import {Component, inject, signal} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '@auth/services/auth-service';

@Component({
  selector: 'app-login-page',
  imports: [
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css'
})
export class LoginPage {

  fb = inject(FormBuilder)
  authService: AuthService = inject(AuthService)
  router = inject(Router)

  hasError = signal(false)
  isPosting = signal(false)

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  })

  onSubmit() {
    if (this.loginForm.invalid) {
      this.hasError.set(true);
      setTimeout(() => {
        this.hasError.set(false);
      }, 2000)
      return;
    }

    const {email = "", password = ""} = this.loginForm.value;

    this.authService
      .login(email, password)
      .subscribe(
        isValid => {
          if (isValid) {
            this.router.navigateByUrl('/')
            return
          }
          this.hasError.set(true);
        }
      )

  }



}
