import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

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
  private errorMessage: any;
  private tokenTimer: any;
  private authStatusListener = new Subject<boolean>();
  baseUrl = 'https://git.heroku.com/josjo-recipe-backend.git';

  constructor(private http: HttpClient, private router: Router) {}

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
    this.errorMessage = '';
    const authData: AuthData = { name: name, email: email, password: password };
    this.http.post(`http://localhost/api/auth/register`, authData).subscribe(
      response => {
        console.log(response);

        // const token = response;
        // this.token = token;
        // if (token) {
        //   this.router.navigate['/login'];
        // }
      },
      error => {
        console.error('error caught in component');
        this.errorMessage = error;
      }
    );
  }

  login(email: string, password: string) {
    const authData: AuthData = { email: email, password: password };
    this.http
      .post<LoginApiReply>(`http://localhost/api/auth/login`, authData)
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
