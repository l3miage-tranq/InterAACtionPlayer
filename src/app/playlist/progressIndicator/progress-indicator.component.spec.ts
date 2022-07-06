import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { DwelltimeService } from 'src/app/services/dwelltime.service';
import { ProgressIndicatorComponent } from './progress-indicator.component';

describe('ProgressIndicatorComponent', () => {
  let component: ProgressIndicatorComponent;
  let fixture: ComponentFixture<ProgressIndicatorComponent>;
  let dwellTimeService: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgressIndicatorComponent ],
      providers: [DwelltimeService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressIndicatorComponent);
    component = fixture.componentInstance;
    dwellTimeService = TestBed.inject(DwelltimeService);
    dwellTimeService.dwellTimeSpinnerSize = of(2);
    dwellTimeService.diskProgressObs = of(1);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
