import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, EMPTY, map } from 'rxjs';
import { Lista } from '../models/lista';
import { Usuario } from '../models/usuario';
import { NotificationService } from './notification.service';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root',
})
export class ListaService {
  private readonly API = '/api/lista';

  constructor(
    private httpClient: HttpClient,
    private notification: NotificationService,
    private usuarioService: UsuarioService
  ) {}

  listar() {
    let email = localStorage.getItem('email') as string;
    let listas: Lista[];

    return this.httpClient.get<Lista[]>(this.API).pipe(
      catchError((error) => {
        console.error(error);
        this.notification.mostrarMensagem('Erro ao listar');
        return EMPTY;
      })
    );
  }

  getListaById(id: number) {
    return this.httpClient.get<Lista>(`${this.API}/${id}`).pipe(
      catchError((error) => {
        console.error(error);
        this.notification.mostrarMensagem('Erro ao buscar por lista');
        return EMPTY;
      })
    );
  }

  salvar(lista: Lista) {
    return this.httpClient.post<Lista>(this.API, lista).pipe(
      catchError((error) => {
        console.error(error);
        this.notification.mostrarMensagem('Erro ao salvar lista');
        return EMPTY;
      })
    );
  }

  editar(lista: Lista) {
    return this.httpClient.put<Lista>(`${this.API}/${lista._id}`, lista).pipe(
      catchError((error) => {
        console.error(error);
        this.notification.mostrarMensagem('Erro ao editar lista');
        return EMPTY;
      })
    );
  }

  deletar(lista: Lista) {
    return this.httpClient.delete(`${this.API}/${lista._id}`).pipe(
      catchError((error) => {
        console.error(error);
        this.notification.mostrarMensagem('Erro ao deletar lista');
        return EMPTY;
      })
    );
  }
}
