import { Component, Injectable, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface Recipe {}

@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {
  constructor(private http: HttpClient) {}
  getRecipeList(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(
      'https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken_breast'
    );
  }

  ngOnInit(): void {}
}
