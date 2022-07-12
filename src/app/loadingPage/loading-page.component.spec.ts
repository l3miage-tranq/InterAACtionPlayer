import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { LoadingPageComponent } from './loading-page.component';
import {TranslateModule} from '@ngx-translate/core';
import {RouterTestingModule} from '@angular/router/testing';
import { SaveService } from '../services/save.service';

describe('LoadingPageComponent', () => {
  let component: LoadingPageComponent;
  let fixture: ComponentFixture<LoadingPageComponent>;

  beforeEach(async () => {
    const mocksaveService = jasmine.createSpyObj('SaveService', ['updateListUsers', 'updatePlaylist', 'updateSettingsAFSR', 'updateMapPlaylist', 'updateUser', 'initPlaylistAFSR']);
    await TestBed.configureTestingModule({
      declarations: [ LoadingPageComponent ],
      imports: [TranslateModule.forRoot(), RouterTestingModule.withRoutes([{
        path: 'fr/playlist', component: LoadingPageComponent,
      }, {
        path: 'en/playlist', component: LoadingPageComponent,
      }])],
      providers: [
        { provide: SaveService, useValue: mocksaveService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingPageComponent);
    component = fixture.componentInstance;
  });

  it('should create', fakeAsync(() => {
    fixture.detectChanges();
    tick(1100);
    expect(component).toBeTruthy();
  }));

  // spied upon the userAlreadyInTheList from user service and after calling the function just checked if it is getting called or not
  it('getUser:: should not call addNewUser if user is already in the list', fakeAsync(() => {
    // @ts-ignore
    spyOn(component.userService, 'userAlreadyInTheList').and.returnValue(true);
    spyOn(component, 'addNewUser');
    component.getUser();
    tick(1100)
    expect(component.addNewUser).not.toHaveBeenCalled();
  }));
});
