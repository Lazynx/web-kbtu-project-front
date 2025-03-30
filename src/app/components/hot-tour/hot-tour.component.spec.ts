import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotTourComponent } from './hot-tour.component';

describe('HotTourComponent', () => {
  let component: HotTourComponent;
  let fixture: ComponentFixture<HotTourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HotTourComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HotTourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
