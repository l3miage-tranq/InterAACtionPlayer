import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchComponent } from './search-component/search.component';
import {RouterTestingModule} from "@angular/router/testing";

const routes: Routes = [
  {
    path: '',
    component: SearchComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), RouterTestingModule],
  exports: [RouterModule]
})
export class SearchRoutingModule { }
