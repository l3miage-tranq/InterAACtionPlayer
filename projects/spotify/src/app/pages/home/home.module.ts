import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

// Modules and Component
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home-component/home.component';
import { NewReleaseItemComponent } from './new-release-item/new-release-item.component';
import { SharedTranslate } from '../shared/translate/sharedTranslate.module';

// Services
import { NewReleasesService } from './services/new-releases.service';
import { PipesModule} from '../../pipes/pipes.module';


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
