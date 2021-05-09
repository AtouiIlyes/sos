import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrigoFilterComponent } from './frigo-filter.component';

describe('FrigoFilterComponent', () => {
  let component: FrigoFilterComponent;
  let fixture: ComponentFixture<FrigoFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrigoFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FrigoFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
