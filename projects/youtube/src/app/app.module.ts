import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { SearchContainerComponent } from './search/container/search-container.component';
import { SearchInputComponent } from './search/components/search-input/search-input.component';
import { SearchListComponent } from './search/components/search-list/search-list.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchContainerComponent,
    SearchInputComponent,
    SearchListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
