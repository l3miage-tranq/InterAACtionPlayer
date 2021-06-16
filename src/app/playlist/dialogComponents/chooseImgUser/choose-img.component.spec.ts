import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseImgComponent } from './choose-img.component';

describe('ChooseImgComponent', () => {
  let component: ChooseImgComponent;
  let fixture: ComponentFixture<ChooseImgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChooseImgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
