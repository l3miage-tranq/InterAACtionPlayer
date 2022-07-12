import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistsComponent } from './artists.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';

describe('ArtistsComponent', () => {
  let component: ArtistsComponent;
  let fixture: ComponentFixture<ArtistsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtistsComponent, TranslatePipe ],
      imports: [ HttpClientModule, RouterTestingModule, TranslateModule.forRoot() ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
