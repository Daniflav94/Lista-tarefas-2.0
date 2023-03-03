import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MeuDiaComponent } from './meu-dia/meu-dia.component';

const routes: Routes = [
  {
    path: '',
    component: MeuDiaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MeuDiaRoutingModule { }
