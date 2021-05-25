/**
 * Import Modules
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AlbumRoutingModule } from './album-routing.module';
import { TranslateModule } from '@ngx-translate/core';

/**
 * Import Components
 */
import { AlbumsComponent } from './albums-component/albums.component';

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

@NgModule({
  declarations: [
    AlbumsComponent,
  ],
  imports: [
    CommonModule,
    AlbumRoutingModule,
    HttpClientModule,
    TranslateModule,
    NotifierModule.withConfig(customNotifierOptions),
  ],
  providers: []
})
export class AlbumsModule { }
