import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent} from './app.component';
import { AuthguardService } from '../../../../src/app/services/authguard.service';

const routes: Routes = [
  { path: 'youtube', canActivate:[AuthguardService], component: AppComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
