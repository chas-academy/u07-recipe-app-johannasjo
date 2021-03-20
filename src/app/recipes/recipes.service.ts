import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { Meal } from './meal.model';
import { Category } from './mealCategory.model';
import { HttpParams } from '@angular/common/http';
import { forkJoin } from 'rxjs';

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

  getAll(params: { categoryName?: string; search?: string }) {
    let httpParams = new HttpParams();

    if (params.categoryName) {
      httpParams = httpParams.set('c', params.categoryName);
      return this.http
        .get<ApiReply>(`${this.baseUrl}/filter.php`, { params: httpParams })
        .pipe(map((apiReply) => apiReply.meals));
    } else if (params.search) {
      httpParams = httpParams.set('s', params.search);
      return this.http
        .get<ApiReply>(`${this.baseUrl}/search.php`, { params: httpParams })
        .pipe(map((apiReply) => apiReply.meals));
    }
  }
  // https://www.themealdb.com/api/json/v1/1/lookup.php?i=52772
  getOne(id: string) {
    console.log({ id });
    let httpParams = new HttpParams().set('i', id);
    return this.http
      .get<ApiReply>(`${this.baseUrl}/lookup.php`, { params: httpParams })
      .pipe(map((apiReply) => apiReply.meals[0]));
  }

  getOneRandom() {
    return this.http
      .get<ApiReply>(`${this.baseUrl}/random.php`)
      .pipe(map((apiReply) => apiReply.meals[0]));
  }

  getFiveRandom() {
    return forkJoin([
      this.getOneRandom(),
      this.getOneRandom(),
      this.getOneRandom(),
      this.getOneRandom(),
      this.getOneRandom(),
    ]);
  }
}
