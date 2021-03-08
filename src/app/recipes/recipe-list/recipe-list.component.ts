import { Component, Injectable, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface Meal {
  idMeal: string;
  strMeal: string;
  strDrinkAlternate?: any;
  strCategory?: string;
  strArea?: string;
  strInstructions?: string;
  strMealThumb: string;
  strTags?: string;
  strYoutube?: string;
  strIngredient1?: string;
  strIngredient2?: string;
  strIngredient3?: string;
  strIngredient4?: string;
  strIngredient5?: string;
  strIngredient6?: string;
  strIngredient7?: string;
  strIngredient8?: string;
  strIngredient9?: string;
  strIngredient10?: string;
  strIngredient11?: string;
  strIngredient12?: string;
  strIngredient13?: string;
  strIngredient14?: string;
  strIngredient15?: string;
  strIngredient16?: string;
  strIngredient17?: string;
  strIngredient18?: string;
  strIngredient19?: string;
  strIngredient20?: string;
  strMeasure1?: string;
  strMeasure2?: string;
  strMeasure3?: string;
  strMeasure4?: string;
  strMeasure5?: string;
  strMeasure6?: string;
  strMeasure7?: string;
  strMeasure8?: string;
  strMeasure9?: string;
  strMeasure10?: string;
  strMeasure11?: string;
  strMeasure12?: string;
  strMeasure13?: string;
  strMeasure14?: string;
  strMeasure15?: string;
  strMeasure16?: string;
  strMeasure17?: string;
  strMeasure18?: string;
  strMeasure19?: string;
  strMeasure20?: string;
  strSource?: string;
  strImageSource?: any;
  strCreativeCommonsConfirmed?: any;
  dateModified?: any;
}

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

  constructor(private http: HttpClient) {}
  getRecipeList(): Observable<Meal[]> {
    return this.http.get<Meal[]>(
      'https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken_breast'
    );
  }

  ngOnInit(): void {}
}
