import { Component, Injectable, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Meal } from '../meal.model';
import { RecipesService } from '../recipes.service';
@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {
  meals: Meal[] = [
    {
      idMeal: '52861',
      strMeal: 'Peanut Butter Cheesecake',
      strMealThumb:
        'https://www.themealdb.com/images/media/meals/qtuuys1511387068.jpg',
    },
    {
      idMeal: '52991',
      strMeal: 'Peanut Butter Cheesecake',
      strMealThumb:
        'https://www.themealdb.com/images/media/meals/qtuuys1511387068.jpg',
    },
  ];

  constructor(
    private http: HttpClient,
    private recipesService: RecipesService
  ) {}
  getRecipeList(): Observable<Meal[]> {
    return this.http.get<Meal[]>(
      'https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken_breast'
    );
  }

  ngOnInit(): void {
    this.recipesService
      .getAll('chicken')
      .subscribe((meals) => (this.meals = meals));
  }
}
