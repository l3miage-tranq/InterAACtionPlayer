/**
 * Import Modules
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AlbumRoutingModule } from './album-routing.module';
import { TranslateModule } from '@ngx-translate/core';

/**
 * Import Components
 */
import { AlbumsComponent } from './albums-component/albums.component';

@NgModule({
  declarations: [
    AlbumsComponent,
  ],
  imports: [
    CommonModule,
    AlbumRoutingModule,
    HttpClientModule,
    TranslateModule,
  ],
  providers: []
})
export class AlbumsModule { }
