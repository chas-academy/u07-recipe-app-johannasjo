import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeFavoriteListsComponent } from './recipe-favorite-lists.component';

describe('RecipeFavoriteListsComponent', () => {
  let component: RecipeFavoriteListsComponent;
  let fixture: ComponentFixture<RecipeFavoriteListsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecipeFavoriteListsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeFavoriteListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
