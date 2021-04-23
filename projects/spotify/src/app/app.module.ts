import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { ModuleWithProviders, NgModule } from '@angular/core';

//Translation
import { TranslateModule } from '@ngx-translate/core';

// Routes
import { AppRoutingModule } from './app-routing.module';

// Components and Modules
import { AppComponent } from './app.component';
import { NavBarComponent} from './pages/shared/nav-bar/nav-bar.component';

// Services
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
