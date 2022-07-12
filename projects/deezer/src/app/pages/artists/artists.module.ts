/**
 * Import Modules
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ArtistsRoutingModule } from './artists-routing.module';
import { TranslateModule } from '@ngx-translate/core';

/**
 * Import Components
 */
import { ArtistsComponent } from './artists-component/artists.component';

@NgModule({
  declarations: [
    ArtistsComponent,
  ],
  imports: [
    CommonModule,
    ArtistsRoutingModule,
    HttpClientModule,
    TranslateModule,
  ],
  providers: []
})
export class ArtistsModule { }
