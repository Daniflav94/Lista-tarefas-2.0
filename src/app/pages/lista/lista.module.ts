import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListaRoutingModule } from './lista-routing.module';
import { ListaComponent } from './lista/lista.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { MaterialModule } from 'src/app/material/material/material.module';
import { FormsModule } from '@angular/forms';
import { PipesModule } from 'src/app/pipes/pipes.module';


@NgModule({
  declarations: [
    ListaComponent,

  ],
  imports: [
    CommonModule,
    ListaRoutingModule,
    ComponentsModule,
    MaterialModule,
    FormsModule,
    PipesModule
  ]
})
export class ListaModule { }
