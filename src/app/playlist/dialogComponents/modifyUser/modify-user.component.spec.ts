import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyUserComponent } from './modify-user.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatDialogModule } from '@angular/material/dialog';

describe('ModifyUserComponent', () => {
  let component: ModifyUserComponent;
  let fixture: ComponentFixture<ModifyUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyUserComponent ],
      imports: [ MatDialogModule, TranslateModule.forRoot() ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
