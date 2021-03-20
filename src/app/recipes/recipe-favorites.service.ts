import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipeFavoritesService {
  public userRecipes$ = new BehaviorSubject([]);
  constructor() {}

  deleteRecipe(id: string) {
    this.userRecipes$.next([
      ...this.userRecipes$.getValue().filter((recipe) => recipe.id !== id),
    ]);
  }

  addRecipe(id: string, title: string) {
    this.userRecipes$.next([...this.userRecipes$.getValue(), { id, title }]);
  }
}
