import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistComponent } from './artist.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ArtistService } from '../services/artist.service';
import { GlobalService } from '../../../services/global.service';
import { HttpClientModule } from '@angular/common/http';
import { ErrorImagePipe } from '../../../pipes/error-image.pipe';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';

describe('ArtistComponent', () => {
  let component: ArtistComponent;
  let fixture: ComponentFixture<ArtistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtistComponent, ErrorImagePipe, TranslatePipe ],
      imports: [ RouterTestingModule, HttpClientModule, TranslateModule.forRoot() ],
      providers: [ ArtistService, GlobalService ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
