import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Ingredient } from '../ingredient.model';
import { IngredientService } from '../ingredient.service';

@Component({
  selector: 'app-recipe-search-ingredient',
  templateUrl: './recipe-search-ingredient.component.html',
  styleUrls: ['./recipe-search-ingredient.component.css']
})
export class RecipeSearchIngredientComponent implements OnInit {
  inputValue = new FormControl('');
  ingredients: Ingredient[];
  filteredIngredients: Observable<Ingredient[]>;

  constructor(private ingredientService: IngredientService, private router: Router) {}

  ngOnInit(): void {
    this.filteredIngredients = this.inputValue.valueChanges.pipe(
      startWith(''),
      map(value =>
        this.ingredients
          ? this.ingredients.filter(ingredient =>
              ingredient.strIngredient.toLowerCase().includes(value.toLowerCase())
            )
          : []
      )
    );
    this.ingredientService.getAll().subscribe(ingredients => (this.ingredients = ingredients));
  }

  onClick(event) {
    // will go to the view the queryParams specifies (have to import Router to have access to .navigate)
    this.router.navigate([], {
      queryParams: {
        searchByIngredient: this.inputValue.value === '' ? null : this.inputValue.value
      }
    });
  }
}
