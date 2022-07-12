import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchComponent } from './search.component';
import { SearchService } from '../services/search.service';
import { GlobalService } from '../../../services/global.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchComponent, TranslatePipe ],
      imports: [ HttpClientModule, RouterTestingModule, TranslateModule.forRoot() ],
      providers: [ SearchService, GlobalService ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
