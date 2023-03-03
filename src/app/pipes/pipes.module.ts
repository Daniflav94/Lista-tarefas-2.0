import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataPipe } from './data.pipe';


@NgModule({
  declarations: [
    DataPipe,

  ],
  imports: [
    CommonModule
  ],
  exports: [
    DataPipe,
  ]
})
export class PipesModule { }
