import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AppComponent} from './app.component';

const routes: Routes = [
  { // default route
    path: 'spotify',
    component: AppComponent,
    children: [
      { // route => spotify/home
        path: 'home',
        loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)
      },
      { // route => spotify/search
        path: 'search',
        loadChildren: () => import('./pages/search/search.module').then(m => m.SearchModule)
      },
      { // route => /search/term
        path: 'search/:term',
        loadChildren: () => import('./pages/search/search.module').then(m => m.SearchModule)
      },
      { // route => /artist/id
        path: 'artist/:id',
        loadChildren: () => import('./pages/artist/artist.module').then(m => m.ArtistModule)
      },
      { // route => /album/id
        path: 'album/:id',
        loadChildren: () => import('./pages/album/album.module').then(m => m.AlbumModule)
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
