/**
 * Import Module
 */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgxAudioPlayerModule } from 'ngx-audio-player';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSliderModule } from '@angular/material/slider';
import { RoundProgressModule } from 'angular-svg-round-progressbar';
import { AuthguardService } from './services/authguard.service';

/**
 * Custom angular notifier options
 */
import { NotifierModule, NotifierOptions } from 'angular-notifier';
const customNotifierOptions: NotifierOptions = {
  position: { horizontal: { position: 'left', distance: 12 },
    vertical: { position: 'bottom', distance: 12, gap: 10 }
  },
  theme: 'material',
  behaviour: { autoHide: 5000, onClick: 'hide', onMouseover: 'pauseAutoHide', showDismissButton: true, stacking: 1 },
  animations: { enabled: true, show: { preset: 'slide', speed: 300, easing: 'ease' },
    hide: { preset: 'fade', speed: 300, easing: 'ease', offset: 50 },
    shift: { speed: 300, easing: 'ease' },
    overlap: 150 }
};

/**
 * Import Component Main-Application
 */
import { AppComponent } from './app.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { DialogChooseTypeComponent } from './playlist/dialogComponents/choosePlatform/dialog-choose-type.component';
import { PlaylistService } from './playlist/services/playlist.service';
import { ExportfileComponent } from './playlist/dialogComponents/exportFile/exportfile.component';
import { ProgressIndicatorComponent } from './playlist/progressIndicator/progress-indicator.component';
import { ImportfileComponent } from './playlist/dialogComponents/importFile/importfile.component';
import { AudioPlayerComponent } from './playlist/audioPlayer/filePlayer/audio-player.component';
import { DeleteDialogComponent } from './playlist/dialogComponents/deletePlaylist/delete-dialog.component';
import { PrefabricatedPlaylistComponent } from './playlist/dialogComponents/prefabricatedPlaylist/prefabricated-playlist.component';
import { SavePlaylistComponent } from './playlist/dialogComponents/savePlaylist/save-playlist.component';
import { LoadPlaylistComponent } from './playlist/dialogComponents/loadPlaylist/load-playlist.component';
import { AlertComponent } from './playlist/dialogComponents/alert/alert.component';
import { UserComponent } from './userPage/user.component';
import { UserFormComponent } from './playlist/dialogComponents/userForm/user-form.component';
import { DeleteUserComponent } from './playlist/dialogComponents/deleteUser/delete-user.component';
import { ChooseImgComponent } from './playlist/dialogComponents/chooseImgUser/choose-img.component';
import { ModifyUserComponent } from './playlist/dialogComponents/modifyUser/modify-user.component';
import { DeezerPlayerComponent } from './playlist/audioPlayer/deezerPlayer/deezer-player.component';
import { AccountsComponent } from './playlist/dialogComponents/accounts/accounts.component';
import { ImportuserComponent } from './playlist/dialogComponents/importUser/importuser.component';

/**
 * Import module Sub-Application
 */
import { YoutubeSharedModule } from '../../projects/youtube/src/app/app.module';
import { SpotifySharedModule } from '../../projects/spotify/src/app/app.module';
import { DeezerSharedModule } from '../../projects/deezer/src/app/app.module';

/**
 * Import Translation
 */
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

/**
 * Import Pipe
 */
import { MapPipe } from './playlist/pipe/map.pipe';
import { PipesModule } from '../../projects/spotify/src/app/pipes/pipes.module';
import { PipeModule } from '../../projects/deezer/src/app/pipe/pipe.module';
import { SpotifyRedirectComponent } from './spotifyRedirect/spotify-redirect.component';
import {DialogSiteASFRComponent} from "./dialog-site-asfr/dialog-site-asfr.component";
import {DialogLinkInteraactionboxComponent} from "./playlist/dialogComponents/dialog-link-interaactionbox/dialog-link-interaactionbox.component";
import {SettingsPageComponentAsfr} from "./settingsPage-asfr/settings-page.component-asfr";
import {ErrorPageComponent} from "./errorPage/error-page.component";
import {LoadingPageComponent} from "./loadingPage/loading-page.component";
import {LogoutAppComponent} from "./playlist/dialogComponents/logoutApp/logout-app.component";
import { SettingsComponent } from './playlist/dialogComponents/settings/settings.component';
import {SpeedTestModule} from "ng-speed-test";
import {SettingsPageComponent} from "./playlist/settingsPage/settings-page.component";

@NgModule({
  declarations: [
    AppComponent,
    PlaylistComponent,
    DialogChooseTypeComponent,
    ImportfileComponent,
    ExportfileComponent,
    SettingsPageComponentAsfr,
    ProgressIndicatorComponent,
    AudioPlayerComponent,
    DeleteDialogComponent,
    PrefabricatedPlaylistComponent,
    SavePlaylistComponent,
    LoadPlaylistComponent,
    MapPipe,
    AlertComponent,
    UserComponent,
    UserFormComponent,
    DeleteUserComponent,
    ChooseImgComponent,
    ModifyUserComponent,
    DeezerPlayerComponent,
    AccountsComponent,
    ImportuserComponent,
    SpotifyRedirectComponent,
    DialogSiteASFRComponent,
    DialogLinkInteraactionboxComponent,
    ErrorPageComponent,
    LoadingPageComponent,
    LogoutAppComponent,
    SettingsComponent,
    SettingsPageComponent
  ],
  imports: [
    BrowserModule,
    SpeedTestModule,
    BrowserAnimationsModule,
    NotifierModule.withConfig(customNotifierOptions),
    MatDialogModule,
    RouterModule,
    YoutubeSharedModule.forRoot(),
    SpotifySharedModule.forRoot(),
    DeezerSharedModule.forRoot(),
    RouterModule.forRoot([
      {path: 'user', component: UserComponent},
      {path: 'playlist', component: PlaylistComponent},
      {path: 'access_token', component: SpotifyRedirectComponent},
      {path: 'settings', component: SettingsPageComponentAsfr},
      {path: 'youtube', loadChildren: '../../projects/src/app/app.module#YoutubeShareModule'},
      {path: 'spotify', loadChildren: '../../projects/src/app/app.module#SpotifySharedModule'},
      {path: 'deezer', loadChildren: '../../projects/src/app/app.module#DeezerSharedModule'},
      //{path: '', redirectTo: 'user', pathMatch: 'full'},
      {path: ':lg/connect/:id', component: LoadingPageComponent},
      {path: ':lg/playlist', component: PlaylistComponent},
      {path: ':lg/settings', component: SettingsPageComponentAsfr},
      {path: ':lg/error', component: ErrorPageComponent},
      {path: ':lg/youtube', loadChildren: '../../projects/src/app/app.module#YoutubeShareModule'},
      {path: ':lg/spotify', loadChildren: '../../projects/src/app/app.module#SpotifySharedModule'},
      {path: ':lg/deezer', loadChildren: '../../projects/src/app/app.module#DeezerSharedModule'},
      {path: '', component: SpotifyRedirectComponent},
      {path: '**', component: SpotifyRedirectComponent},
    ], {useHash: true}),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient],
      }
    }),
    PipesModule,
    PipeModule,
    FormsModule,
    MatProgressSpinnerModule,
    DragDropModule,
    NgxAudioPlayerModule,
    MatTooltipModule,
    MatSliderModule,
    RoundProgressModule,
  ],
  providers: [
    PlaylistService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
