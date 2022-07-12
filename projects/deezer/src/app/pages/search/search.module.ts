/**
 * Import Modules
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SearchRoutingModule } from './search-routing.module';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

/**
 * Import Components
 */
import { SearchComponent } from './search-component/search.component';

@NgModule({
  declarations: [
    SearchComponent,
  ],
  imports: [
    CommonModule,
    SearchRoutingModule,
    HttpClientModule,
    FormsModule,
    TranslateModule,
  ],
  providers: []
})
export class SearchModule { }
