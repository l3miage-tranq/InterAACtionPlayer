import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistComponent } from './playlist.component';
import { NotifierModule } from 'angular-notifier';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { GlobalService } from '../../../projects/spotify/src/app/services/global.service';
import { HttpClientModule } from '@angular/common/http';

describe('PlaylistComponent', () => {
  let component: PlaylistComponent;
  let fixture: ComponentFixture<PlaylistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlaylistComponent ],
      imports: [ MatDialogModule, NotifierModule, RouterTestingModule, TranslateModule.forRoot(), HttpClientModule ],
      providers: [ GlobalService ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
