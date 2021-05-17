import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { RecipeFavoritesService } from '../recipe-favorites.service';
import { RecipeListsService } from '../recipe-lists.service';
@Component({
  selector: 'app-recipe-favorite-list',
  templateUrl: './recipe-favorite-list.component.html',
  styleUrls: ['./recipe-favorite-list.component.css']
})
export class RecipeFavoriteListComponent implements OnInit {
  favorites = [];
  constructor(
    private recipeFavoritesService: RecipeFavoritesService,
    private recipeListsService: RecipeListsService
  ) {}

  listName = new FormControl('', [Validators.required]);

  ngOnInit(): void {
    this.recipeListsService.getAll().subscribe(favorites => (this.favorites = favorites));
  }

  onCreateFavorite(title: string) {
    console.log({ component: 'RecipeFavoriteListComponent', title });
    this.recipeListsService.create(title).subscribe(favorite => {
      this.favorites = [...this.favorites, favorite];
    });
  }

  onDeleteFavorite(favoriteId: number) {
    this.recipeListsService.delete(favoriteId).subscribe(() => {
      this.favorites = this.favorites.filter(favorite => {
        return favorite.id !== favoriteId;
      });
    });
  }
}
