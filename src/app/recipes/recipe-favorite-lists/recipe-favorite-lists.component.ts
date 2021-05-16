import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../auth/auth.service';
import { RecipeFavoritesService } from '../recipe-favorites.service';
@Component({
  selector: 'app-recipe-favorite-lists',
  templateUrl: './recipe-favorite-lists.component.html',
  styleUrls: ['./recipe-favorite-lists.component.css']
})
export class RecipeFavoriteListsComponent implements OnInit {
  constructor(private favoriteService: RecipeFavoritesService) {}

  ngOnInit(): void {
    this.onGetAll();
  }

  onGetAll() {
    this.favoriteService.getAll().subscribe(value => {
      console.log(value);
    });
  }
}
