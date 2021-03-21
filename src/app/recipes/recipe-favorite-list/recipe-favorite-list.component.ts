import { Component, OnInit } from '@angular/core';
import { RecipeFavoritesService } from '../recipe-favorites.service';
@Component({
  selector: 'app-recipe-favorite-list',
  templateUrl: './recipe-favorite-list.component.html',
  styleUrls: ['./recipe-favorite-list.component.css'],
})
export class RecipeUserListComponent implements OnInit {
  constructor(private recipeFavoritesService: RecipeFavoritesService) {}
  userRecipes$ = this.recipeFavoritesService.userRecipes$;
  ngOnInit(): void {}

  addRecipe(id: string, title: string) {
    this.recipeFavoritesService.addRecipe(id, title);
  }

  deleteRecipe(id: string) {
    this.recipeFavoritesService.deleteRecipe(id);
  }
}
