import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchInputComponent } from './search-input.component';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';

describe('SearchInputComponent', () => {
  let component: SearchInputComponent;
  let fixture: ComponentFixture<SearchInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchInputComponent, TranslatePipe ],
      imports: [ RouterTestingModule, TranslateModule.forRoot() ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
