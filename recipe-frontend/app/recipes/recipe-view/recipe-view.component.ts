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
    // get the id of the recipe from route: http://localhost:4200/recipes/52906 = {id: "52906"}
    this.route.params.subscribe((params) => {
      // use getOne method of recipeService to access the meal
      this.recipesService
        .getOne(params.id)
        // assign recipe to the component so that it can be accessed from the template
        .subscribe((recipe) => (this.recipe = recipe));
    });
  }

  addRecipe(id: string, meal: string, image: string) {
    this.recipeFavoritesService.add(id, meal, image);
  }
}
