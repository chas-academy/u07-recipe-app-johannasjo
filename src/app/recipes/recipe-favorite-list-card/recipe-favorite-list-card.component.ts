import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import { forkJoin } from 'rxjs';
import { concatMap, map } from 'rxjs/operators';
import { RecipeFavoritesService } from '../recipe-favorites.service';
import { RecipeListsService } from '../recipe-lists.service';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recipe-favorite-list-card',
  templateUrl: './recipe-favorite-list-card.component.html',
  styleUrls: ['./recipe-favorite-list-card.component.css']
})
export class RecipeFavoriteListCardComponent implements OnInit, OnChanges {
  @Input() recipeFavoriteListId: string;
  @Output() deleteRecipeEvent = new EventEmitter();
  recipeFavoriteListRecipes: any[];

  constructor(
    private recipeFavoritesService: RecipeFavoritesService,
    private recipeListsService: RecipeListsService,
    private recipesService: RecipesService
  ) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log({ component: 'RecipeFavoriteListCardComponent', changes });
    const recipeFavoriteListId = changes?.recipeFavoriteListId?.currentValue;
    if (recipeFavoriteListId) {
      this.recipeListsService
        .getAllRecipes(recipeFavoriteListId)
        .pipe(
          concatMap(recipeFavoriteLists => {
            return forkJoin(
              recipeFavoriteLists.map(recipeFavoriteList =>
                this.recipesService
                  .getOne(recipeFavoriteList.external_id)
                  .pipe(map(recipe => ({ ...recipe, id: recipeFavoriteListId })))
              )
            );
          })
        )
        .subscribe(recipeFavoriteListRecipes => {
          console.log({ recipeFavoriteListRecipes, component: 'RecipeFavoriteListCardComponent' });
          this.recipeFavoriteListRecipes = recipeFavoriteListRecipes;
        });
    }
  }

  detach(id: string, recipeId: string) {
    this.recipeListsService.detach(id, recipeId).subscribe(
      () =>
        (this.recipeFavoriteListRecipes = this.recipeFavoriteListRecipes.filter(recipe => {
          return recipe.id !== recipeId;
        }))
    );
  }
}
