/**
 * Import Modules
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PipesModule } from '../../pipes/pipes.module';
import { ArtistRoutingModule } from './artist-routing.module';
import { SharedTranslate } from '../shared/translate/sharedTranslate.module';

/**
 * Import Components
 */
import { ArtistComponent } from './artist-component/artist.component';
import { ArtistAlbumsComponent } from './artist-albums/artist-albums.component';

/**
 * Import Services
 */
import { ArtistService } from './services/artist.service';

@NgModule({
  declarations: [
    ArtistComponent,
    ArtistAlbumsComponent
  ],
  imports: [
    CommonModule,
    ArtistRoutingModule,
    PipesModule,
    HttpClientModule,
    SharedTranslate
  ],
  providers: [
    ArtistService,
  ]
})
export class ArtistModule { }
