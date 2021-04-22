import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { DialogChooseTypeComponent } from './playlist/dialogComponents/dialogChooseType/dialog-choose-type.component';
import { PlaylistService } from './playlist/services/playlist.service';

import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';

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
 * Import module Sub-Application
 */

import { YoutubeSharedModule } from '../../projects/youtube/src/app/app.module';
import { SpotifySharedModule } from '../../projects/spotify/src/app/app.module';
import { PipesModule } from '../../projects/spotify/src/app/pipes/pipes.module';
import { ImportfileComponent } from './playlist/dialogComponents/importFile/importfile.component';
import { FormsModule } from '@angular/forms';
import { SaveDialogComponent } from './playlist/dialogComponents/saveDialog/save-dialog.component';
import { SettingsComponent } from './playlist/dialogComponents/settings/settings.component';
import { ProgressIndicatorComponent } from './playlist/progressIndicator/progress-indicator.component';

/**
 * Import Translation
 */

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, '/assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    PlaylistComponent,
    DialogChooseTypeComponent,
    ImportfileComponent,
    SaveDialogComponent,
    SettingsComponent,
    ProgressIndicatorComponent
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
  ],
  providers: [
    PlaylistService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
