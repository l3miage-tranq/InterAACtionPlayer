/**
 * Import Module
 */
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { AppRoutingModule } from './app-routing.module';

/**
 * Import Component Main-Application
 */
import { AppComponent } from './app.component';
import { NavBarComponent } from './pages/shared/nav-bar/nav-bar.component';

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
 * Import Services
 */
import { GlobalService } from './services/global.service';

const providers = [
  GlobalService,
]

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
  ],
  imports: [
    BrowserModule,
    NotifierModule.withConfig(customNotifierOptions),
    AppRoutingModule,
    HttpClientModule,
    TranslateModule,
  ],
  providers: providers,
  bootstrap: [
    AppComponent
  ]
})

export class AppModule { }

@NgModule({})
export class SpotifySharedModule{
  static forRoot(): ModuleWithProviders<any> {
    return {
      ngModule: AppModule,
      providers: providers,
    }
  }
}
