import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ArtistComponent } from './artist-component/artist.component';

const routes: Routes = [
  { // route => /artist/id
    path: '',
    component: ArtistComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArtistRoutingModule { }
