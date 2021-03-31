import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { DialogChooseTypeComponent } from './playlist/dialogChooseType/dialog-choose-type.component';
import { PlaylistService } from './playlist/services/playlist.service';

import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

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
import {PipesModule} from '../../projects/spotify/src/app/pipes/pipes.module';

@NgModule({
  declarations: [
    AppComponent,
    PlaylistComponent,
    DialogChooseTypeComponent
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
    PipesModule,
  ],
  providers: [
    PlaylistService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
