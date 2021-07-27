import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumComponent } from './album.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AlbumService } from '../services/album.service';
import { GlobalService } from '../../../services/global.service';
import { HttpClientModule } from '@angular/common/http';
import { NotifierModule } from 'angular-notifier';
import { TranslateModule } from '@ngx-translate/core';
import { ErrorImagePipe } from '../../../pipes/error-image.pipe';

describe('AlbumComponent', () => {
  let component: AlbumComponent;
  let fixture: ComponentFixture<AlbumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlbumComponent, ErrorImagePipe ],
      imports: [ RouterTestingModule, HttpClientModule, NotifierModule, TranslateModule.forRoot() ],
      providers: [ AlbumService, GlobalService ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
