import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlotterComponent } from './plotter.component';

describe('PlotterComponent', () => {
  let component: PlotterComponent;
  let fixture: ComponentFixture<PlotterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlotterComponent]
    });
    fixture = TestBed.createComponent(PlotterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
