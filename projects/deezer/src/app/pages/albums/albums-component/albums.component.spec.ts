import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumsComponent } from './albums.component';
import { NotifierModule } from 'angular-notifier';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientModule } from '@angular/common/http';

describe('AlbumsComponent', () => {
  let component: AlbumsComponent;
  let fixture: ComponentFixture<AlbumsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlbumsComponent ],
      imports: [ NotifierModule, TranslateModule.forRoot(), HttpClientModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
