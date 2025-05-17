// src/app/core/services/auth.service.ts


import { Injectable } from '@angular/core';

import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'access_token';
  private readonly _loginUrl = `${environment.baseUrl}/Account/login`;

  constructor(private http: HttpClient) {}

  login(email: string, password: string ): Observable<any> {
    debugger
    return this.http.post(`${this._loginUrl}`, {email:email, password:password}).pipe(
      tap((response: any) => {
        if (response.token) {
          localStorage.setItem(this.TOKEN_KEY, response.token);
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
