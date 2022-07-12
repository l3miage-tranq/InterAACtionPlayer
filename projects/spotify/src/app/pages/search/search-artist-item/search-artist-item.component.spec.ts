import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchArtistItemComponent } from './search-artist-item.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('SearchArtistItemComponent', () => {
  let component: SearchArtistItemComponent;
  let fixture: ComponentFixture<SearchArtistItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchArtistItemComponent ],
      imports: [ RouterTestingModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchArtistItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
