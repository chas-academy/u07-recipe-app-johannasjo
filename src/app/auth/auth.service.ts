import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { EMPTY, Subject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { AuthData } from './auth-data.model';

interface LoginApiReply {
  access_token: string;
  token_type: string;
  expires_in: number;
  user: {};
}
@Injectable({ providedIn: 'root' })
export class AuthService {
  private isAuthenticated = false;
  private token: string;
  private tokenTimer: any;
  private authStatusListener = new Subject<boolean>();
  baseUrl = environment.backendApiUrl;

  constructor(private http: HttpClient, private router: Router, private snackBar: MatSnackBar) {}

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  register(name: string, email: string, password: string) {
    const authData: AuthData = { name: name, email: email, password: password };
    return this.http.post(`${this.baseUrl}/api/auth/register`, authData).pipe(
      catchError(err => {
        if (err.status === 400) {
          this.snackBar.open('This email is already connected to user!', undefined, {
            duration: 5000
          });
        }
        return EMPTY;
      })
    );
  }

  login(email: string, password: string) {
    const authData: AuthData = { email: email, password: password };
    this.http
      .post<LoginApiReply>(`${this.baseUrl}/api/auth/login`, authData)
      .pipe(
        catchError(err => {
          if (err.status === 401) {
            this.snackBar.open('Please check your credentials and try again', undefined, {
              duration: 5000
            });
          }
          return EMPTY;
        })
      )
      .subscribe(response => {
        const token = response.access_token;
        this.token = token;
        if (token) {
          const tokenExpiresIn = response.expires_in;
          this.setAuthTimer(tokenExpiresIn);
          this.isAuthenticated = true;
          this.authStatusListener.next(true);
          const now = new Date();
          const expirationDate = new Date(now.getTime() + tokenExpiresIn * 1000);
          console.log(expirationDate);
          this.saveAuthData(token, expirationDate);
          this.router.navigate(['/']);
        }
      });
    // add error message in snackbar if login not possible
  }

  autoAuthUser() {
    const authInfo = this.getAuthData();
    if (!authInfo) {
      return;
    }
    const now = new Date();
    const expiresIn = authInfo.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInfo.token;
      this.isAuthenticated = true;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/']);
  }

  private setAuthTimer(duration: number) {
    console.log('setting timer ' + duration);
    // log out user when token expires
    this.tokenTimer = setTimeout(
      () => {
        this.logout();
      },
      // convert to millisec as setTimeout only reads that
      duration * 1000
    );
  }

  private saveAuthData(token: string, tokenExpirationDate: Date) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', tokenExpirationDate.toISOString());
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    if (!token || !expirationDate) {
      return;
    }
    return { token: token, expirationDate: new Date(expirationDate) };
  }
}
