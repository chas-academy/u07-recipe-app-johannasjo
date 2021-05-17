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
    this.baseUrl = 'http://localhost';
  }

  getAll() {
    return this.http.get<{ id: string; title: string }[]>(`${this.baseUrl}/api/auth/favorites`);
  }

  getAllRecipes(id: string) {
    return this.http.get<{ id: number; title: string; external_id: string }[]>(
      `${this.baseUrl}/api/auth/favorites/${id}/recipes`
    );
  }

  detach(id: string, recipeId: string) {
    console.log({ component: 'RecipeListsService', id, recipeId });
    return this.http.delete(`${this.baseUrl}/api/auth/favorites/${id}/recipes/${recipeId}`);
  }

  attach(id: string, recipeId: string) {
    return this.http.put(`${this.baseUrl}/api/auth/favorites/${id}/recipes/${recipeId}`, {});
  }

  delete(favoriteId: number) {
    return this.http.delete(`${this.baseUrl}/api/auth/favorites/${favoriteId}`);
  }

  create(title: string) {
    return this.http.post(`${this.baseUrl}/api/auth/favorites`, { title });
  }
}
