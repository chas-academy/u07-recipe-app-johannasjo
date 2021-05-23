import { Component, Injectable, OnDestroy, OnInit } from '@angular/core';

import { Meal } from '../meal.model';
import { RecipesService } from '../recipes.service';
import { ActivatedRoute } from '@angular/router';
import { catchError, filter } from 'rxjs/operators';
import { randomIntFromInterval } from 'src/app/utils';
import { AuthService } from 'src/app/auth/auth.service';
import { EMPTY, Subscription, throwError, VirtualTimeScheduler } from 'rxjs';
import { RecipeListsService } from '../recipe-lists.service';
import { Favorite } from '../favorite.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  private authStatusSubscription: Subscription;
  public userIsAuthenticated = false;

  meals: Meal[] = [];
  favorites: Favorite[] = [];

  constructor(
    private recipesService: RecipesService,
    private recipeListsService: RecipeListsService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(queryParams => {
      // check if string in route corresponds to property name:
      // http://localhost:4200/recipes?categoryName=Seafood = {categoryName: "Seafood"}
      if ('categoryName' in queryParams && queryParams.categoryName) {
        this.recipesService
          .getAll({ categoryName: queryParams.categoryName })
          // will return all meals and assign it to meals
          .pipe(filter(meals => !!meals))
          .subscribe(meals => (this.meals = meals));
      } else if ('search' in queryParams && queryParams.search) {
        this.recipesService
          .getAll({ search: queryParams.search })
          .pipe(filter(meals => !!meals))
          .subscribe(meals => (this.meals = meals));
      } else if ('searchByIngredient' in queryParams && queryParams.searchByIngredient) {
        this.recipesService
          .getAll({ ingredientName: queryParams.searchByIngredient })
          .pipe(filter(meals => !!meals))
          .subscribe(meals => (this.meals = meals));
      }
    });

    this.recipesService.getFiveRandom().subscribe(meals => (this.meals = meals));

    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSubscription = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
    this.recipeListsService.getAll().subscribe(favorites => {
      this.favorites = favorites;
    });
  }

  addRecipe(id: string, title: string, externalId: string) {
    this.recipesService.getAllFromBackend(externalId).subscribe(recipes => {
      const [foundRecipe] = recipes;
      if (!foundRecipe) {
        this.recipesService.create(title, externalId).subscribe(recipe => {
          this.recipeListsService.attach(id, recipe.id).subscribe();
        });
      } else {
        this.recipeListsService
          .attach(id, foundRecipe.id)
          .pipe(
            catchError(err => {
              if (err.status === 409) {
                this.snackBar.open('The recipe already exists on the list', undefined, {
                  duration: 5000
                });
                return EMPTY;
              }
              return throwError(err);
            })
          )
          .subscribe();
      }
    });
  }

  fiveRandomRecipes() {
    return this.recipesService.getOne(randomIntFromInterval(1, 1000).toString());
  }

  ngOnDestroy(): void {
    this.authStatusSubscription.unsubscribe();
  }
}
