import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeezerPlayerComponent } from './deezer-player.component';

describe('DeezerPlayerComponent', () => {
  let component: DeezerPlayerComponent;
  let fixture: ComponentFixture<DeezerPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeezerPlayerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeezerPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
