import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home/home.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'meuDia',
    loadChildren: () =>
      import('./pages/meu-dia/meu-dia.module').then((m) => m.MeuDiaModule),
  },
  {
    path: 'importante',
    loadChildren: () =>
      import('./pages/importante/importante.module').then(m => m.ImportanteModule)
  },
  {
    path: 'lista',
    loadChildren: () =>
      import('./pages/lista/lista.module').then(m => m.ListaModule)
  },
  {
    path: 'login',
    component: LoginComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
