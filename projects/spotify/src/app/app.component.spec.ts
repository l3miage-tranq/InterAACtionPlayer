import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { GlobalService } from './services/global.service';
import { HttpClientModule } from '@angular/common/http';
import {TranslateModule} from '@ngx-translate/core';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppComponent ],
      imports: [ RouterTestingModule, HttpClientModule, TranslateModule.forRoot() ],
      providers: [ GlobalService ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'spotify'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('spotify');
  });
});
