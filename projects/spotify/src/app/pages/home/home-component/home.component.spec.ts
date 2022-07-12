import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { NewReleasesService } from '../services/new-releases.service';
import { GlobalService } from '../../../services/global.service';
import { HttpClientModule } from '@angular/common/http';
import {TranslateModule, TranslatePipe} from '@ngx-translate/core';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeComponent, TranslatePipe ],
      imports: [ HttpClientModule, TranslateModule.forRoot() ],
      providers: [ NewReleasesService, GlobalService ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
