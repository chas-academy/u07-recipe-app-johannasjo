import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { IngredientService } from '../ingredient.service';

@Component({
  selector: 'app-recipe-search-ingredient',
  templateUrl: './recipe-search-ingredient.component.html',
  styleUrls: ['./recipe-search-ingredient.component.css']
})
export class RecipeSearchIngredientComponent implements OnInit {
  inputValue = new FormControl('');

  constructor(private ingredientService: IngredientService, private router: Router) { }

  ngOnInit(): void {
    this.ingredientService.getAll().subscribe((value) => console.log(value));

  }
  
  onClick(event) {
    // will go to the view the queryParams specifies (have to import Router to have access to .navigate)
    this.router.navigate([], {
      queryParams: { searchByIngredient: this.inputValue.value },
    });
  }


}
