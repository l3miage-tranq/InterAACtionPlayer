/**
 * Import Modules
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SearchRoutingModule } from './search-routing.module';
import { SharedTranslate } from '../shared/translate/sharedTranslate.module';

/**
 * Import Components
 */
import { SearchComponent } from './search-component/search.component';
import { SearchArtistItemComponent } from './search-artist-item/search-artist-item.component';
import { SearchTrackItemComponent } from './search-track-item/search-track-item.component';

/**
 * Import Services
 */
import { SearchService } from './services/search.service';

/**
 * Import Pipe
 */
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    SearchComponent,
    SearchArtistItemComponent,
    SearchTrackItemComponent,
  ],
  imports: [
    CommonModule,
    SearchRoutingModule,
    PipesModule,
    HttpClientModule,
    SharedTranslate
  ],
  providers: [
    SearchService,
  ]
})
export class SearchModule { }
