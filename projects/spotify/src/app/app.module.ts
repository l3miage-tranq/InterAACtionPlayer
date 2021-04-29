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
import { NavBarComponent} from './pages/shared/nav-bar/nav-bar.component';

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
