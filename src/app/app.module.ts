import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { HeaderComponent } from './header/header.component';
import { RecipeLandingComponent } from './recipes/recipe-landing/recipe-landing.component';
import { AppRoutingModule } from './app-routing.module';
import { RecipeCategoryComponent } from './recipes/recipe-category/recipe-category.component';
import { InfoBoxComponent } from './info-box/info-box.component';
@NgModule({
  declarations: [
    AppComponent,
    RecipeListComponent,
    HeaderComponent,
    RecipeLandingComponent,
    RecipeCategoryComponent,
    InfoBoxComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
