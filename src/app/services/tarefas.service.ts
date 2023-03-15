import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tarefa } from '../models/tarefa';
import { first, tap, EMPTY } from 'rxjs';
import { NotificationService } from './notification.service';
import { catchError, map } from 'rxjs/operators'
import { UsuarioService } from './usuario.service';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root',
})
export class TarefasService {

  private readonly API = '/api/tarefas';

  constructor(
    private httpClient: HttpClient,
    private notificationService: NotificationService,
    private usuarioService: UsuarioService
  ) {}


  listarTarefas() {
    let email = localStorage.getItem("email") as string
    let listaTarefas: Tarefa[]

    return this.httpClient.get<Tarefa[]>(this.API).pipe( //pipe permite manipulação dos dados
    )
  }


  listarPorId(id: number){
    return this.httpClient.get<Tarefa>(`${this.API}/${id}`)
  }

  salvarTarefa(tarefa: Tarefa){
    return this.httpClient.post<Tarefa>(this.API, tarefa).pipe(
      catchError(error => {
        this.notificationService.mostrarMensagem("Erro ao salvar tarefa")
        console.error(error)
        return EMPTY
      })
    )
  }

  editarTarefa(tarefa: Partial<Tarefa>) {
    return this.httpClient.put<Tarefa>(`${this.API}/${tarefa._id}`, tarefa).pipe(
      catchError(error => {
        console.error(error)
        this.notificationService.mostrarMensagem("Erro ao editar tarefa")
        return EMPTY
      })
    )
  }

  deletarTarefa(id: number){
    return this.httpClient.delete(`${this.API}/${id}`).pipe(
      catchError(error => {
        console.error(error)
        this.notificationService.mostrarMensagem("Erro ao deletar tarefa")
        return EMPTY
      })
    )
  }


}
