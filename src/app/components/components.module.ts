import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from './sidenav/sidenav.component';
import { MaterialModule } from '../material/material/material.module';
import { RouterModule } from '@angular/router';
import { DialogTarefaComponent } from './dialog-tarefa/dialog-tarefa.component';
import { FormsModule } from '@angular/forms';
import { PipesModule } from '../pipes/pipes.module';
import { DialogExcluirComponent } from './dialog-excluir/dialog-excluir.component';



@NgModule({
  declarations: [
    SidenavComponent,
    DialogTarefaComponent,
    DialogExcluirComponent
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
