import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

interface UserRecipe {
  id: string;
  title: string;
  image: string;
}
@Injectable({
  providedIn: 'root',
})
export class RecipeFavoritesService {
  public userRecipes$: BehaviorSubject<UserRecipe[]> = new BehaviorSubject([]);
  constructor(private snackBar: MatSnackBar, private router: Router) {}

  delete(id: string) {
    this.userRecipes$.next([
      ...this.userRecipes$.getValue().filter((recipe) => recipe.id !== id),
    ]);
  }

  add(id: string, title: string, image?: string) {
    if (this.get(id)) {
      this.snackBar
        .open('This recipe has already been added!', 'Show', {
          duration: 5000,
        })
        .onAction()
        .subscribe(() => {
          this.router.navigateByUrl('favorites');
        });
    } else {
      this.userRecipes$.next([
        ...this.userRecipes$.getValue(),
        { id, title, image },
      ]);
    }
  }

  get(id: string) {
    return this.userRecipes$
      .getValue()
      .find((userRecipe) => userRecipe.id === id);
  }
}
