import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrefabricatedPlaylistComponent } from './prefabricated-playlist.component';

describe('PrefabricatedPlaylistComponent', () => {
  let component: PrefabricatedPlaylistComponent;
  let fixture: ComponentFixture<PrefabricatedPlaylistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrefabricatedPlaylistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrefabricatedPlaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
