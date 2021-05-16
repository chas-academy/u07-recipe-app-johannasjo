import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeFavoriteListComponent } from './recipe-favorite-list.component';

describe('RecipeUserListComponent', () => {
  let component: RecipeFavoriteListComponent;
  let fixture: ComponentFixture<RecipeFavoriteListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecipeFavoriteListComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeFavoriteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
