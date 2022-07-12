import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistAlbumsComponent } from './artist-albums.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('ArtistAlbumsComponent', () => {
  let component: ArtistAlbumsComponent;
  let fixture: ComponentFixture<ArtistAlbumsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtistAlbumsComponent ],
      imports: [ RouterTestingModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistAlbumsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
