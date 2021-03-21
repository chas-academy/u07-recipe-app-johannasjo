import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { RecipesService } from './recipes.service';

@Injectable({
  providedIn: 'root',
})
export class RecipeFavoritesService {
  public userRecipes$ = new BehaviorSubject([]);
  constructor(private recipesService: RecipesService) {}

  deleteRecipe(id: string) {
    this.userRecipes$.next([
      ...this.userRecipes$.getValue().filter((recipe) => recipe.id !== id),
    ]);
  }

  addRecipe(id: string, title: string, image?: string) {
    this.userRecipes$.next([
      ...this.userRecipes$.getValue(),
      { id, title, image },
    ]);
  }
}
