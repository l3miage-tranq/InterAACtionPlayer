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
import { PipesModule } from '../../projects/spotify/src/app/pipes/pipes.module';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSliderModule } from '@angular/material/slider';

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
import { SettingsComponent } from './playlist/dialogComponents/settings/settings.component';
import { ProgressIndicatorComponent } from './playlist/progressIndicator/progress-indicator.component';
import { ImportfileComponent } from './playlist/dialogComponents/importFile/importfile.component';
import { AudioPlayerComponent } from './playlist/audioPlayer/audio-player.component';
import { DeleteDialogComponent } from './playlist/dialogComponents/deletePlaylist/delete-dialog.component';
import { PrefabricatedPlaylistComponent } from './playlist/dialogComponents/prefabricatedPlaylist/prefabricated-playlist.component';
import { SavePlaylistComponent } from './playlist/dialogComponents/savePlaylist/save-playlist.component';
import { LoadPlaylistComponent } from './playlist/dialogComponents/loadPlaylist/load-playlist.component';

/**
 * Import module Sub-Application
 */
import { YoutubeSharedModule } from '../../projects/youtube/src/app/app.module';
import { SpotifySharedModule } from '../../projects/spotify/src/app/app.module';

/**
 * Import Translation
 */
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, '/assets/i18n/', '.json');
}

/**
 * Import Pipe
 */
import { MapPipe } from './playlist/pipe/map.pipe';
import { AlertComponent } from './playlist/dialogComponents/alert/alert.component';

@NgModule({
  declarations: [
    AppComponent,
    PlaylistComponent,
    DialogChooseTypeComponent,
    ImportfileComponent,
    ExportfileComponent,
    SettingsComponent,
    ProgressIndicatorComponent,
    AudioPlayerComponent,
    DeleteDialogComponent,
    PrefabricatedPlaylistComponent,
    SavePlaylistComponent,
    LoadPlaylistComponent,
    MapPipe,
    AlertComponent
  ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        NotifierModule.withConfig(customNotifierOptions),
        MatDialogModule,
        RouterModule,
        YoutubeSharedModule.forRoot(),
        SpotifySharedModule.forRoot(),
        RouterModule.forRoot([
            {path: 'playlist', component: PlaylistComponent},
            {path: 'youtube', loadChildren: '../../projects/src/app/app.module#YoutubeShareModule'},
            {path: 'spotify', loadChildren: '../../projects/src/app/app.module#SpotifySharedModule'},
            {path: '', redirectTo: 'playlist', pathMatch: 'full'},
        ]),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [HttpClient],
            }
        }),
        PipesModule,
        FormsModule,
        MatProgressSpinnerModule,
        DragDropModule,
        NgxAudioPlayerModule,
        MatTooltipModule,
        MatSliderModule,
    ],
  providers: [
    PlaylistService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
