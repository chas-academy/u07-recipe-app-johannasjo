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
    private recipeListsService: RecipeListsService,
    private recipesService: RecipesService
  ) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    const recipeFavoriteListId = changes?.recipeFavoriteListId?.currentValue;
    if (recipeFavoriteListId) {
      this.recipeListsService
        .getAllRecipes(recipeFavoriteListId)
        .pipe(
          concatMap(recipes => {
            return forkJoin(
              recipes.map(internalRecipe =>
                this.recipesService
                  .getOne(internalRecipe.external_id)
                  .pipe(map(externalRecipe => ({ ...externalRecipe, id: internalRecipe.id })))
              )
            );
          })
        )
        .subscribe(recipeFavoriteListRecipes => {
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
