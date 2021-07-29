import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarPlayerComponent } from './sidebar-player.component';

describe('SidebarPlayerComponent', () => {
  let component: SidebarPlayerComponent;
  let fixture: ComponentFixture<SidebarPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarPlayerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
