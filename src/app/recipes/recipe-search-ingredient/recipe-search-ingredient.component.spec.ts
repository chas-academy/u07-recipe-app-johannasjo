import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeSearchIngredientComponent } from './recipe-search-ingredient.component';

describe('RecipeSearchIngredientComponent', () => {
  let component: RecipeSearchIngredientComponent;
  let fixture: ComponentFixture<RecipeSearchIngredientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecipeSearchIngredientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeSearchIngredientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
