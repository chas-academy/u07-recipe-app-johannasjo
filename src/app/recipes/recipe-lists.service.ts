import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class RecipeListsService {
  baseUrl: string;
  constructor(private http: HttpClient) {
    this.baseUrl = 'https://git.heroku.com/josjo-recipe-backend.git';
  }

  // getAll() {
  //   return this.http.get(`${this.baseUrl}/api/auth/favorites`).pipe(
  //     map((response: Response) => {
  //       return response.json();
  //     })
  //   );
  // }
}
