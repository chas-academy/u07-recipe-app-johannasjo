import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-recipe-search',
  templateUrl: './recipe-search.component.html',
  styleUrls: ['./recipe-search.component.css'],
})
export class RecipeSearchComponent implements OnInit {
  inputValue = new FormControl('');
  constructor(private router: Router) {}

  onClick(event) {
    // will go to the view the queryParams specifies (have to import Router to have access to .navigate)
    this.router.navigate([], {
      queryParams: { search: this.inputValue.value },
    });
  }

  ngOnInit(): void {}
}
