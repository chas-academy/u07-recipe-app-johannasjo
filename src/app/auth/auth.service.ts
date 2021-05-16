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
    const authData: AuthData = { name: name, email: email, password: password };
    this.http.post(`http://localhost/api/auth/register`, authData).subscribe(response => {
      console.log(response);
    });
  }

  login(email: string, password: string) {
    const authData: AuthData = { email: email, password: password };
    console.log(authData);
    this.http
      .post<LoginApiReply>(`http://localhost/api/auth/login`, authData)
      .subscribe(response => {
        const token = response.access_token;
        this.token = token;
        if (token) {
          const tokenExpiresIn = response.expires_in;
          // log out user when token expires
          this.tokenTimer = setTimeout(
            () => {
              this.logout();
            },
            // convert to millisec as setTimeout only reads that
            tokenExpiresIn * 1000
          );
          this.isAuthenticated = true;
          this.authStatusListener.next(true);
          this.router.navigate(['/']);
        }
      });
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.router.navigate(['/']);
    clearTimeout(this.tokenTimer);
  }
}
