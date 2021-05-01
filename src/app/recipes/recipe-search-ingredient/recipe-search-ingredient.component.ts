import { Component, OnInit } from '@angular/core';
import { IngredientService } from '../ingredient.service';

@Component({
  selector: 'app-recipe-search-ingredient',
  templateUrl: './recipe-search-ingredient.component.html',
  styleUrls: ['./recipe-search-ingredient.component.css']
})
export class RecipeSearchIngredientComponent implements OnInit {

  constructor(private ingredientService: IngredientService) { }

  ngOnInit(): void {
  }

}
