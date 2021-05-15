import { Component, OnInit } from '@angular/core';
import { RecipeListsService } from '../recipe-lists.service';
@Component({
  selector: 'app-recipe-lists',
  templateUrl: './recipe-lists.component.html',
  styleUrls: ['./recipe-lists.component.css']
})
export class RecipeListsComponent implements OnInit {
  constructor(private recipeListsService: RecipeListsService) {}

  ngOnInit(): void {}
  getAll() {
    this.recipeListsService.getAll();
  }
}
