import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImportanteComponent } from './importante/importante.component';

const routes: Routes = [{ path: '', component: ImportanteComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImportanteRoutingModule { }
