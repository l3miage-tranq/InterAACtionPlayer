/**
 * Import Modules
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HomeRoutingModule } from './home-routing.module';
import { SharedTranslate } from '../shared/translate/sharedTranslate.module';

/**
 * Import Components
 */
import { HomeComponent } from './home-component/home.component';
import { NewReleaseItemComponent } from './new-release-item/new-release-item.component';

/**
 * Import Services
 */
import { NewReleasesService } from './services/new-releases.service';
import { PipesModule } from '../../pipes/pipes.module';


@NgModule({
  declarations: [
    HomeComponent,
    NewReleaseItemComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    PipesModule,
    HttpClientModule,
    SharedTranslate
  ],
  providers: [
    NewReleasesService
  ]
})
export class HomeModule { }
