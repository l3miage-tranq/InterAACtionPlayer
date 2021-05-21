import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [
  { // default route
    path: 'deezer',
    component: AppComponent,
    children: [
      { // route => deezer/search
        path: 'search',
        loadChildren: () => import('./pages/search/search.module').then(m => m.SearchModule)
      },
      {
        path: 'albums',
        loadChildren: () => import('./pages/albums/albums.module').then(m => m.AlbumsModule)
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
