import { Component, Injectable, OnInit } from '@angular/core';

import { Meal } from '../meal.model';
import { RecipesService } from '../recipes.service';
import { ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
import { RecipeFavoritesService } from '../recipe-favorites.service';
import { randomIntFromInterval } from 'src/app/utils';
@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {
  meals: Meal[] = [];

  constructor(
    private recipesService: RecipesService,
    private route: ActivatedRoute,
    private recipeFavoritesService: RecipeFavoritesService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((queryParams) => {
      // check if string in route corresponds to property name:
      // http://localhost:4200/recipes?categoryName=Seafood = {categoryName: "Seafood"}
      if ('categoryName' in queryParams && queryParams.categoryName) {
        this.recipesService
          .getAll({ categoryName: queryParams.categoryName })
          // will return all meals and assign it to meals
          .pipe(filter((meals) => !!meals))
          .subscribe((meals) => (this.meals = meals));
      } else if ('search' in queryParams && queryParams.search) {
        this.recipesService
          .getAll({ search: queryParams.search })
          .pipe(filter((meals) => !!meals))
          .subscribe((meals) => (this.meals = meals));
      }
    });

    this.recipesService
      .getFiveRandom()
      .subscribe((meals) => (this.meals = meals));
  }

  addRecipe(id: string, title: string, image?: string) {
    this.recipeFavoritesService.add(id, title, image);
  }

  fiveRandomRecipes() {
    return this.recipesService.getOne(
      randomIntFromInterval(1, 1000).toString()
    );
  }
}
