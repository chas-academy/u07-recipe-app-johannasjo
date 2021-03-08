import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { Meal } from './meal.model';
import { HttpParams } from '@angular/common/http';

interface ApiReply {
  meals: Meal[];
}

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  baseUrl: string;
  constructor(private http: HttpClient) {
    this.baseUrl = 'https://www.themealdb.com/api/json/v1/1';
  }

  getAll(category?: string) {
    let params = new HttpParams();

    if (category) {
      params = params.set('c', category);
    }

    return this.http
      .get<ApiReply>(`${this.baseUrl}/filter.php`, { params })
      .pipe(map((apiReply) => apiReply.meals));
  }
}
