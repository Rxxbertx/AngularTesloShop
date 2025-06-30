import {computed, inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '@auth/interfaces/user-interface';
import {environment} from '../../../environments/environment';
import {AuthResponse} from '@auth/interfaces/auth-response-interface';
import {catchError, map, Observable, of, tap} from 'rxjs';
import {rxResource} from '@angular/core/rxjs-interop';

type AuthStatus = 'checking' | 'authenticated' | 'not-authenticated';

const baseUrl = environment.baseUrl

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() {
  }

  private httpClient = inject(HttpClient)
  private _authStatus = signal('checking')
  private _user = signal<User | null>(null)
  private _token = signal<string | null>(localStorage.getItem('token'));

  authStatus = computed<AuthStatus>(() => {
    if (this._authStatus() === 'checking') {
      return 'checking'
    }
    if (this._user()) {
      return 'authenticated'
    }
    return 'not-authenticated'
  });

  user = computed<User | null>(() => {
    return this._user()
  })

  token = computed(this._token)

  //rxresource

  checkStatusResource = rxResource(
    {
      stream: () => (this.checkStatus())
    }
  )


  //login

  login(email: string, password: string): Observable<boolean> {
    return this.httpClient.post<AuthResponse>(`${baseUrl}/auth/login`, {
      email: email,
      password: password
    }, {}).pipe(
      tap(res => this.handleAuthSuccess(res))
      , map(() => true)
      , catchError(() => this.handleAuthError())
    )
  }


//check auth

  checkStatus(): Observable<boolean> {
    const token = localStorage.getItem('token')
    if (!token) {
      this.logout()
      return of(false)
    }

    return this.httpClient.get<AuthResponse>(`${baseUrl}/auth/check-status`).pipe(
      tap(res => this.handleAuthSuccess(res))
      , map(() => true)
      , catchError(() => this.handleAuthError())
    )

  }


//register
  register(email: string, password: string, fullName: string) {
    return this.httpClient.post<AuthResponse>(`${baseUrl}/auth/register`, {
      email: email,
      password: password,
      fullName: fullName
    }, {}).pipe(
      tap(res => this.handleAuthSuccess(res))
      , map(() => true)
      , catchError(() => this.handleAuthError())
    )
  }

  //handlers
  private handleAuthError() {
    this.logout()
    return of(false)
  }

  private handleAuthSuccess(res: AuthResponse) {
    this._user.set(res.user)
    this._authStatus.set('authenticated')
    this._token.set(res.token)
    localStorage.setItem('token', res.token)
  }

  //log out
  logout() {
    this._authStatus.set('not-authenticated')
    this._user.set(null)
    this._token.set(null)
    localStorage.removeItem('token')
  }



}
