import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImportanteRoutingModule } from './importante-routing.module';
import { ImportanteComponent } from './importante/importante.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { MaterialModule } from 'src/app/material/material/material.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ImportanteComponent
  ],
  imports: [
    CommonModule,
    ImportanteRoutingModule,
    ComponentsModule,
    PipesModule,
    MaterialModule,
    FormsModule
  ]
})
export class ImportanteModule { }
