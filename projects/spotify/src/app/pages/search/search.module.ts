import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

// Components
import { SearchComponent } from './search-component/search.component';
import { SearchArtistItemComponent } from './search-artist-item/search-artist-item.component';
import { SearchTrackItemComponent } from './search-track-item/search-track-item.component';
import { SearchModalComponent } from './search-modal/search-modal.component';
import { SearchRoutingModule } from './search-routing.module';
import { SharedTranslate } from '../shared/translate/sharedTranslate.module';

// Services
import { SearchService } from './services/search.service';

// Pipes
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    SearchComponent,
    SearchArtistItemComponent,
    SearchTrackItemComponent,
    SearchModalComponent,
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
