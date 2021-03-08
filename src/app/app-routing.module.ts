import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { RecipeLandingComponent } from './recipes/recipe-landing/recipe-landing.component';

const routes: Routes = [
  {
    path: 'recipes',
    component: RecipeLandingComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
