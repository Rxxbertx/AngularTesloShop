import {Component, inject, signal} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {AuthService} from '@auth/services/auth-service';

@Component({
  selector: 'app-register-page',
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './register-page.html',
  standalone: true,
  styleUrl: './register-page.css'
})
export class RegisterPage {

  fb = inject(FormBuilder)
  authService: AuthService = inject(AuthService)
  router = inject(Router)

  hasError = signal(false)
  isPosting = signal(false)

  formGroup: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    fullName: ['', [Validators.required, Validators.minLength(6)]],
  })

  onSubmit() {
    if (this.formGroup.invalid) {
      this.hasError.set(true);
      setTimeout(() => {
        this.hasError.set(false);
      }, 2000)
      return;
    }

    const {email = "", password = "", fullName=""} = this.formGroup.value;

    this.authService
      .register(email, password,fullName)
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
