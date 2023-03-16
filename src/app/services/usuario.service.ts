import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, EMPTY } from 'rxjs';
import { Usuario } from '../models/usuario';
import { NotificationService } from './notification.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { DecodedToken } from 'src/app/models/decoded-token';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private readonly API = 'api/usuario'

  constructor(
    private httpCliente: HttpClient,
    private notification: NotificationService
  ) { }

  filtrarPorEmail(email: string) {
    return this.httpCliente.get<Usuario>(`${this.API}/email/${email}`).pipe(
      catchError(error => {
        this.notification.mostrarMensagem("Email não consta no banco de dados!")
        console.error(error)
        return EMPTY
      })
    )
  }

    salvarUsuario(usuario: Usuario) {
      return this.httpCliente.post<Usuario>(this.API, usuario).pipe(
        catchError(error => {
          this.notification.mostrarMensagem("Erro ao criar usuário!")
          console.error(error)
          return EMPTY
        })
      )
    }

    editarUsuario(usuario: Partial<Usuario>) {
      const user = {
        foto: usuario.foto,
        temaHome: usuario.temaHome,
        temaImportante: usuario.temaImportante,
        temaMeuDia: usuario.temaMeuDia,
        nome: usuario.nome,
        email: usuario.email,
        perfil: usuario.perfil,
        senha: usuario.senha
      }
      return this.httpCliente.put<Usuario>(`${this.API}/${usuario._id}`, user).pipe(
        catchError(error => {
          this.notification.mostrarMensagem("Erro ao editar usuário!")
          console.error(error)
          return EMPTY
        })
      )
    }


}
