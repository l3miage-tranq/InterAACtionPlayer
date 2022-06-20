import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { DeezerPlayerComponent } from './deezer-player.component';
declare var initDZPlayer: any;
declare var setTrack: any;
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
  });

  it('should create and call function', fakeAsync(() => {
    setTrack = jasmine.createSpy();
    initDZPlayer = jasmine.createSpy();
    fixture.detectChanges();
    tick(600);
    expect(component).toBeTruthy();
    expect(initDZPlayer).toHaveBeenCalled();
    expect(setTrack).toHaveBeenCalled();
  }));
});
