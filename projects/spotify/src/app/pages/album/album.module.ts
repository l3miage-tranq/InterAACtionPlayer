/**
 * Import Modules
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlbumRoutingModule } from './album-routing.module';
import { TranslateModule } from '@ngx-translate/core';

/**
 * Import Components
 */
import { AlbumComponent } from './album-component/album.component';

/**
 * Import Services
 */
import { AlbumService } from './services/album.service';

/**
 * Import Pipe
 */
import { PipesModule } from '../../pipes/pipes.module';

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
    AlbumComponent,
  ],
    imports: [
        CommonModule,
        AlbumRoutingModule,
        PipesModule,
        NotifierModule.withConfig(customNotifierOptions),
        TranslateModule,
    ],
  providers: [
    AlbumService,
  ]
})
export class AlbumModule { }
