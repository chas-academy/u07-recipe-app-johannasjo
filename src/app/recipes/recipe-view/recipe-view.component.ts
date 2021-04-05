import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs/operators';
import { Meal } from '../meal.model';
import { RecipeFavoritesService } from '../recipe-favorites.service';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recipe-view',
  templateUrl: './recipe-view.component.html',
  styleUrls: ['./recipe-view.component.css'],
})
export class RecipeViewComponent implements OnInit {
  recipe: Meal;
  constructor(
    private route: ActivatedRoute,
    private recipesService: RecipesService,
    private recipeFavoritesService: RecipeFavoritesService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.recipesService
        .getOne(params.id)
        .pipe(tap((value) => console.log(value)))
        .subscribe((recipe) => (this.recipe = recipe));
    });
  }

  addRecipe(id: string, meal: string) {
    this.recipeFavoritesService.add(id, meal);
  }
}
