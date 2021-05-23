import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Favorite } from './favorite.model';
@Injectable({
  providedIn: 'root'
})
export class RecipeListsService {
  baseUrl: string;
  constructor(private http: HttpClient, private snackBar: MatSnackBar) {
    this.baseUrl = environment.backendApiUrl;
  }

  getAll() {
    return this.http.get<Favorite[]>(`${this.baseUrl}/api/auth/favorites`);
  }

  getAllRecipes(id: string) {
    return this.http.get<{ id: number; title: string; external_id: string }[]>(
      `${this.baseUrl}/api/auth/favorites/${id}/recipes`
    );
  }

  detach(id: string, recipeId: string) {
    console.log({ component: 'RecipeListsService', id, recipeId });
    return this.http.delete(`${this.baseUrl}/api/auth/favorites/${id}/recipes/${recipeId}`).pipe(
      tap(response => {
        this.snackBar.open('Recipe was removed from your list!', undefined, {
          duration: 5000
        });
      })
    );
  }

  attach(id: string, recipeId: string) {
    return this.http.put(`${this.baseUrl}/api/auth/favorites/${id}/recipes/${recipeId}`, {}).pipe(
      tap(response => {
        this.snackBar.open('Recipe was added to your list!', undefined, {
          duration: 5000
        });
      })
    );
  }

  delete(favoriteId: number) {
    return this.http.delete(`${this.baseUrl}/api/auth/favorites/${favoriteId}`).pipe(
      tap(response => {
        this.snackBar.open('Your list was removed', undefined, {
          duration: 5000
        });
      })
    );
  }

  create(title: string) {
    return this.http.post<Favorite>(`${this.baseUrl}/api/auth/favorites`, { title });
  }
}
