import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipeLandingComponent } from './recipes/recipe-landing/recipe-landing.component';
import { RecipeUserListComponent } from './recipes/recipe-favorite-list/recipe-favorite-list.component';
import { RecipeViewComponent } from './recipes/recipe-view/recipe-view.component';
import { RecipeFavoriteListsComponent } from './recipes/recipe-favorite-lists/recipe-favorite-lists.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { UserProfileComponent } from './auth/user-profile/user-profile.component';
import { AuthGuard } from './auth/auth.guard';

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
    component: RecipeUserListComponent,
    canActivate: [AuthGuard]
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
    path: 'user',
    component: UserProfileComponent
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
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
