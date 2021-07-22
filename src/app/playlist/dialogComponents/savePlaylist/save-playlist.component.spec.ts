import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavePlaylistComponent } from './save-playlist.component';
import { MatDialogModule } from '@angular/material/dialog';
import { NotifierModule } from 'angular-notifier';
import { TranslateModule } from '@ngx-translate/core';

describe('SavePlaylistComponent', () => {
  let component: SavePlaylistComponent;
  let fixture: ComponentFixture<SavePlaylistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SavePlaylistComponent ],
      imports: [ MatDialogModule, NotifierModule, TranslateModule.forRoot() ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SavePlaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
