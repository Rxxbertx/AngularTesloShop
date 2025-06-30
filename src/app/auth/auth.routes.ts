import {Routes} from '@angular/router';
import {AuthLayout} from '@auth/layout/auth-layout/auth-layout';
import {LoginPage} from '@auth/pages/login-page/login-page';
import {RegisterPage} from '@auth/pages/register-page/register-page';

export const AuthRoutes: Routes = [
  {
    path: '',
    component: AuthLayout,
    children: [
      {path: 'login', component: LoginPage},
      {path: 'register', component: RegisterPage},
      {path: '**', redirectTo: 'login'},
    ]
  }
]

export default AuthRoutes
