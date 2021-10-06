import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchContainerComponent } from './search-container.component';
import { HttpClientModule } from '@angular/common/http';

describe('SearchContainerComponent', () => {
  let component: SearchContainerComponent;
  let fixture: ComponentFixture<SearchContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchContainerComponent ],
      imports: [ HttpClientModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
