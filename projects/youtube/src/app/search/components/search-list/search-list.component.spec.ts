import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchListComponent } from './search-list.component';
import { NotifierModule } from 'angular-notifier';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientModule } from '@angular/common/http';

describe('SearchListComponent', () => {
  let component: SearchListComponent;
  let fixture: ComponentFixture<SearchListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchListComponent ],
      imports: [ NotifierModule, TranslateModule.forRoot(), HttpClientModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
