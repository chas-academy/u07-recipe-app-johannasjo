import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipeLandingComponent } from './recipes/recipe-landing/recipe-landing.component';
import { RecipeUserListComponent } from './recipes/recipe-favorite-list/recipe-favorite-list.component';
import { RecipeViewComponent } from './recipes/recipe-view/recipe-view.component';
import { RecipeListsComponent } from './recipes/recipe-lists/recipe-lists.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';

const routes: Routes = [
  {
    path: 'recipes',
    component: RecipeLandingComponent
  },
  {
    path: 'recipes/:id',
    component: RecipeViewComponent
  },
  {
    path: 'favorites',
    component: RecipeUserListComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'favorites/all',
    component: RecipeListsComponent
  },
  // default to recipes
  {
    path: '',
    redirectTo: '/recipes',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
