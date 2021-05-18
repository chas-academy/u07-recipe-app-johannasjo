import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';

import { AppComponent } from './app.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { HeaderComponent } from './header/header.component';
import { RecipeLandingComponent } from './recipes/recipe-landing/recipe-landing.component';
import { AppRoutingModule } from './app-routing.module';
import { RecipeCategoryComponent } from './recipes/recipe-category/recipe-category.component';
import { InfoBoxComponent } from './info-box/info-box.component';
import { RecipeSearchComponent } from './recipes/recipe-search/recipe-search.component';
import { RecipeFavoriteListComponent } from './recipes/recipe-favorite-list/recipe-favorite-list.component';
import { RecipeViewComponent } from './recipes/recipe-view/recipe-view.component';
import { RecipeSearchIngredientComponent } from './recipes/recipe-search-ingredient/recipe-search-ingredient.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { UserProfileComponent } from './auth/user-profile/user-profile.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { RecipeFavoriteListCardComponent } from './recipes/recipe-favorite-list-card/recipe-favorite-list-card.component';
@NgModule({
  declarations: [
    AppComponent,
    RecipeListComponent,
    HeaderComponent,
    RecipeLandingComponent,
    RecipeCategoryComponent,
    InfoBoxComponent,
    RecipeSearchComponent,
    RecipeFavoriteListComponent,
    RecipeViewComponent,
    RecipeSearchIngredientComponent,
    LoginComponent,
    RegisterComponent,
    UserProfileComponent,
    RecipeFavoriteListCardComponent
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
    MatAutocompleteModule,
    MatExpansionModule,
    MatTooltipModule,
    MatSelectModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule {}
