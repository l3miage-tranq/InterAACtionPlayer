import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { TranslateModule } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
import { ThemeService } from './services/theme.service';
import { of } from 'rxjs';

let count = 1;

class MockThemeService {
  // tslint:disable-next-line:typedef
  get themeObservable() {
    // tslint:disable-next-line:triple-equals
    if (count == 1) {
      count++;
      return of('inverted');
    }
    return of('');
  }
}
describe('AppComponent', () => {
  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [ AppComponent ],
      imports: [ TranslateModule.forRoot(), RouterTestingModule ],
      providers: [
        { provide: ThemeService, useClass: MockThemeService }
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'InterAACtionPlayer'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('InterAACtionPlayer');
  });

  it(`should have as title 'InterAACtionPlayer'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('InterAACtionPlayer');
  });
});
