import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RecipeFavoritesService {
  public userRecipes: { id: string; title: string }[] = [
    { id: '1', title: 'Bolognese' },
    { id: '2', title: 'Pancakes' },
    { id: '3', title: 'Pizza' },
  ];
  constructor() {}

  deleteRecipe(id: string) {
    this.userRecipes = this.userRecipes.filter((recipe) => recipe.id !== id);
  }

  addRecipe(id: string = '5', title: string = 'New item') {
    const userRecipesCopy = [...this.userRecipes];
    userRecipesCopy.push({
      id: id,
      title,
    });

    this.userRecipes = userRecipesCopy;

    // this.userRecipes = [...this.userRecipes, { id, title }];
  }
}
