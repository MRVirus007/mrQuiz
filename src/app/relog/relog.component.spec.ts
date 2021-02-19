import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelogComponent } from './relog.component';

describe('RelogComponent', () => {
  let component: RelogComponent;
  let fixture: ComponentFixture<RelogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RelogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RelogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
