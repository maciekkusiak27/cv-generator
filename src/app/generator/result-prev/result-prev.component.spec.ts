import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultPrevComponent } from './result-prev.component';

describe('ResultPrevComponent', () => {
  let component: ResultPrevComponent;
  let fixture: ComponentFixture<ResultPrevComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResultPrevComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultPrevComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
