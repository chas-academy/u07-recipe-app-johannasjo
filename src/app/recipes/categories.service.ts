import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { Category } from './mealCategory.model';

interface ApiReply {
  categories: Category[];
}

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  baseUrl: string;
  constructor(private http: HttpClient) {
    this.baseUrl = environment.mealDBApiUrl;
  }

  getAll() {
    return this.http
      .get<ApiReply>(`${this.baseUrl}/categories.php`)
      .pipe(map(apiReply => apiReply.categories));
  }
}
