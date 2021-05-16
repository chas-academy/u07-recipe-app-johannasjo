import { Component, Injectable, OnDestroy, OnInit } from '@angular/core';

import { Meal } from '../meal.model';
import { RecipesService } from '../recipes.service';
import { ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
import { RecipeFavoritesService } from '../recipe-favorites.service';
import { randomIntFromInterval } from 'src/app/utils';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';
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

  constructor(
    private recipesService: RecipesService,
    private route: ActivatedRoute,
    private recipeFavoritesService: RecipeFavoritesService,
    private authService: AuthService
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
  }

  addRecipe(id: string, title: string, image?: string) {
    this.recipeFavoritesService.add(id, title, image);
  }

  fiveRandomRecipes() {
    return this.recipesService.getOne(randomIntFromInterval(1, 1000).toString());
  }

  ngOnDestroy(): void {
    this.authStatusSubscription.unsubscribe();
  }
}
