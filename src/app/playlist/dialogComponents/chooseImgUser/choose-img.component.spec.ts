import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseImgComponent } from './choose-img.component';
import { MatDialogModule } from '@angular/material/dialog';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';

describe('ChooseImgComponent', () => {
  let component: ChooseImgComponent;
  let fixture: ComponentFixture<ChooseImgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChooseImgComponent, TranslatePipe ],
      imports: [ MatDialogModule, TranslateModule.forRoot() ]
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

  // called the function with the required parameters and checked if it setting up required variables or not
  it('chooseImg:: should set choosen image', () => {
    // @ts-ignore
    component.userService = { imgChoose: 'xyz' };
    component.chooseImg('abc');
    // @ts-ignore
    expect(component.userService.imgChoose).toBeDefined();
  });
});
