/**
 * Import Module
 */
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { TranslateModule } from '@ngx-translate/core';

/**
 * Import Component Main-Application
 */
import { AppComponent } from './app.component';

const providers = []

@NgModule({
  declarations: [
    AppComponent
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
export class DeezerSharedModule{
  static forRoot(): ModuleWithProviders<any> {
    return {
      ngModule: AppModule,
      providers: providers,
    }
  }
}
