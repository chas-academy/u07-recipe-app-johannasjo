import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AuthData } from './auth-data.model';

interface LoginApiReply {
  access_token: string;
  token_type: string;
  expires_in: number;
  user: {};
}
@Injectable({ providedIn: 'root' })
export class AuthService {
  private token: string;
  baseUrl = 'https://git.heroku.com/josjo-recipe-backend.git';
  constructor(private http: HttpClient) {}

  getToken() {
    return this.token;
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
      });
  }
}
