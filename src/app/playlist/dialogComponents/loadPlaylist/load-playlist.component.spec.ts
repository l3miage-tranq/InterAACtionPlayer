import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadPlaylistComponent } from './load-playlist.component';
import { MatDialogModule } from '@angular/material/dialog';
import { NotifierModule } from 'angular-notifier';
import { TranslateModule } from '@ngx-translate/core';

describe('LoadPlaylistComponent', () => {
  let component: LoadPlaylistComponent;
  let fixture: ComponentFixture<LoadPlaylistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadPlaylistComponent ],
      imports: [ MatDialogModule, NotifierModule, TranslateModule.forRoot() ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadPlaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
