import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { AppComponent } from './app.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { HeaderComponent } from './header/header.component';
import { RecipeLandingComponent } from './recipes/recipe-landing/recipe-landing.component';
import { AppRoutingModule } from './app-routing.module';
import { RecipeCategoryComponent } from './recipes/recipe-category/recipe-category.component';
import { InfoBoxComponent } from './info-box/info-box.component';
import { RecipeSearchComponent } from './recipes/recipe-search/recipe-search.component';
import { RecipeUserListComponent } from './recipes/recipe-favorite-list/recipe-favorite-list.component';
import { RecipeViewComponent } from './recipes/recipe-view/recipe-view.component';
import { RecipeSearchIngredientComponent } from './recipes/recipe-search-ingredient/recipe-search-ingredient.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { RecipeListsComponent } from './recipes/recipe-lists/recipe-lists.component';
@NgModule({
  declarations: [
    AppComponent,
    RecipeListComponent,
    HeaderComponent,
    RecipeLandingComponent,
    RecipeCategoryComponent,
    InfoBoxComponent,
    RecipeSearchComponent,
    RecipeUserListComponent,
    RecipeViewComponent,
    RecipeSearchIngredientComponent,
    LoginComponent,
    RegisterComponent,
    RecipeListsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    FormsModule,
    MatSnackBarModule,
    MatAutocompleteModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
