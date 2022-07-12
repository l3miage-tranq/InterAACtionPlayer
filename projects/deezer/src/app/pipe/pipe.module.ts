import { NgModule } from '@angular/core';

/**
 * Import Pipe
 */
import { DeezerPipe } from './deezer.pipe';

@NgModule({
  imports: [],
  declarations: [
    DeezerPipe,
  ],
  exports: [
    DeezerPipe,
  ]
})
export class PipeModule { }
