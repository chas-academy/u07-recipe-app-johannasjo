import { Component, Injectable, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Meal } from '../meal.model';
import { RecipesService } from '../recipes.service';
import { ActivatedRoute } from '@angular/router';
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
      if ('categoryName' in queryParams) {
        this.recipesService
          .getAll(queryParams.categoryName)
          .subscribe((meals) => (this.meals = meals));
      }
    });
  }
}
