import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../categories.service';
import { Category } from '../mealCategory.model';

@Component({
  selector: 'app-recipe-category',
  templateUrl: './recipe-category.component.html',
  styleUrls: ['./recipe-category.component.css'],
})
export class RecipeCategoryComponent implements OnInit {
  categories: Category[] = [];
  constructor(private categoriesService: CategoriesService) {}
  categories$ = this.categoriesService.getAll();

  ngOnInit(): void {}
}
