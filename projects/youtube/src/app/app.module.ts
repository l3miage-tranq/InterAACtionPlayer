import { BrowserModule } from '@angular/platform-browser';
import { ModuleWithProviders, NgModule } from '@angular/core';

/**
 * Import Module
 */
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';

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
import { SearchContainerComponent } from './search/container/search-container.component';
import { SearchInputComponent } from './search/components/search-input/search-input.component';
import { SearchListComponent } from './search/components/search-list/search-list.component';

/**
 * Import Pipe
 */
import { YoutubePipe } from './pipe/youtube.pipe';

const providers = [];

@NgModule({
  declarations: [
    AppComponent,
    SearchContainerComponent,
    SearchInputComponent,
    SearchListComponent,
    YoutubePipe
  ],
  imports: [
    BrowserModule,
    NotifierModule.withConfig(customNotifierOptions),
    HttpClientModule,
    AppRoutingModule,
    TranslateModule,
  ],
  providers: providers,
  exports: [
    YoutubePipe
  ],
  bootstrap: [
    AppComponent
  ]
})

export class AppModule { }

@NgModule({})
export class YoutubeSharedModule{
  static forRoot(): ModuleWithProviders<any> {
    return {
      ngModule: AppModule,
      providers: providers,
    }
  }
}
