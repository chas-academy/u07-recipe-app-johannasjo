import { Component, Injectable, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Meal } from '../meal.model';
import { RecipesService } from '../recipes.service';
import { ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
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
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((queryParams) => {
      console.log(queryParams);
      if ('categoryName' in queryParams && queryParams.categoryName) {
        this.recipesService
          .getAll({ categoryName: queryParams.categoryName })
          .pipe(filter((meals) => !!meals))
          .subscribe((meals) => (this.meals = meals));
      } else if ('search' in queryParams && queryParams.search) {
        this.recipesService
          .getAll({ search: queryParams.search })
          .pipe(filter((meals) => !!meals))
          .subscribe((meals) => (this.meals = meals));
      }
    });
  }
}
