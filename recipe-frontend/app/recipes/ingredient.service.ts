import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { Ingredient } from "./ingredient.model";


interface ApiReply {
  meals: Ingredient[];
}

@Injectable({
  providedIn: 'root',
})
export class IngredientService {
  baseUrl: string;
  constructor(private http: HttpClient) {
    this.baseUrl = 'https://www.themealdb.com/api/json/v1/1';
  }

  getAll() {
    let httpParams = new HttpParams();
    httpParams = httpParams.set('i', 'list');
    return this.http
      .get<ApiReply>(`${this.baseUrl}/list.php`, {params: httpParams})
      .pipe(map((apiReply) => apiReply.meals));
  }
}

