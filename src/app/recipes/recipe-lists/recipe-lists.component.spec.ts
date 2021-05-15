import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeListsComponent } from './recipe-lists.component';

describe('RecipeListsComponent', () => {
  let component: RecipeListsComponent;
  let fixture: ComponentFixture<RecipeListsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecipeListsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
