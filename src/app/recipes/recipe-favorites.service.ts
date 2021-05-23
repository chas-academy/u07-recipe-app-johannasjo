import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

interface UserRecipe {
  id: string;
  title: string;
  image: string;
}
@Injectable({
  providedIn: 'root'
})
export class RecipeFavoritesService {
  baseUrl = environment.backendApiUrl;
  public userRecipes$: BehaviorSubject<UserRecipe[]> = new BehaviorSubject([]);
  constructor(private snackBar: MatSnackBar, private router: Router, private http: HttpClient) {}

  delete(id: string) {
    // send out new values from the observable
    this.userRecipes$.next([...this.userRecipes$.getValue().filter(recipe => recipe.id !== id)]);
  }

  add(id: string, title: string, image?: string) {
    if (this.get(id)) {
      this.snackBar
        .open('This recipe has already been added!', 'Show', {
          duration: 5000
        })
        .onAction()
        // routes the observable object to fav-list
        .subscribe(() => {
          this.router.navigateByUrl('favorites');
        });
    } else {
      this.userRecipes$.next([...this.userRecipes$.getValue(), { id, title, image }]);
    }
  }

  // check if recipe exists
  get(id: string) {
    return this.userRecipes$.getValue().find(userRecipe => userRecipe.id === id);
  }

  getAll() {
    return this.http.get(`${this.baseUrl}/api/auth/favorites`);
  }
}
