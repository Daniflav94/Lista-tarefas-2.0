import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MeuDiaRoutingModule } from './meu-dia-routing.module';
import { MeuDiaComponent } from './meu-dia/meu-dia.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { MaterialModule } from 'src/app/material/material/material.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    MeuDiaComponent
  ],
  imports: [
    CommonModule,
    MeuDiaRoutingModule,
    ComponentsModule,
    PipesModule,
    MaterialModule,
    FormsModule
  ]
})
export class MeuDiaModule { }
