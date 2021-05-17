import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeFavoriteListCardComponent } from './recipe-favorite-list-card.component';

describe('RecipeFavoriteListCardComponent', () => {
  let component: RecipeFavoriteListCardComponent;
  let fixture: ComponentFixture<RecipeFavoriteListCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecipeFavoriteListCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeFavoriteListCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
