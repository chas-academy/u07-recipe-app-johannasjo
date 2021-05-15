import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AuthData } from './auth-data.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  baseUrl = 'https://git.heroku.com/josjo-recipe-backend.git';
  constructor(private http: HttpClient) {}
  createUser(name: string, email: string, password: string) {
    const authData: AuthData = { name: name, email: email, password: password };
    this.http.post(`http://localhost/api/auth/register`, authData).subscribe(response => {
      console.log(response);
    });
  }
}
