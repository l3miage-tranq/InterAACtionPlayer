import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportfileComponent } from './exportfile.component';

describe('ExportfileComponent', () => {
  let component: ExportfileComponent;
  let fixture: ComponentFixture<ExportfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExportfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
