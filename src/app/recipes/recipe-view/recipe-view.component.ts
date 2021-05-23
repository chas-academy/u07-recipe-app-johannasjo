import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Meal } from '../meal.model';
import { RecipeListsService } from '../recipe-lists.service';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recipe-view',
  templateUrl: './recipe-view.component.html',
  styleUrls: ['./recipe-view.component.css']
})
export class RecipeViewComponent implements OnInit, OnDestroy {
  private authStatusSubscription: Subscription;
  public userIsAuthenticated = false;
  recipe: Meal;
  constructor(
    private route: ActivatedRoute,
    private recipesService: RecipesService,
    private recipeListsService: RecipeListsService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // get the id of the recipe from route: http://localhost:4200/recipes/52906 = {id: "52906"}
    this.route.params.subscribe(params => {
      // use getOne method of recipeService to access the meal
      this.recipesService
        .getOne(params.id)
        // assign recipe to the component so that it can be accessed from the template
        .subscribe(recipe => (this.recipe = recipe));
    });
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSubscription = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }

  ngOnDestroy(): void {
    this.authStatusSubscription.unsubscribe();
  }
}
