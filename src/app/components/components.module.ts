import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from './sidenav/sidenav.component';
import { MaterialModule } from '../material/material/material.module';
import { RouterModule } from '@angular/router';
import { DialogTarefaComponent } from './dialog-tarefa/dialog-tarefa.component';
import { FormsModule } from '@angular/forms';
import { PipesModule } from '../pipes/pipes.module';



@NgModule({
  declarations: [
    SidenavComponent,
    DialogTarefaComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    FormsModule,
    PipesModule
  ],
  exports: [
    SidenavComponent
  ]
})
export class ComponentsModule { }
