import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Credenciais } from '../models/credenciais';
import { NotificationService } from './notification.service';
import { catchError } from 'rxjs/operators'
import { first, tap, EMPTY } from 'rxjs';
import { Token } from '../models/token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly API = 'api/auth/login';

  constructor(
    private httpClient: HttpClient,
    private notification: NotificationService
  ) { }

  autenticar(credenciais: Credenciais) {
    return this.httpClient.post<Token>(this.API, credenciais).pipe(
      tap(token => {
        localStorage.setItem("token", token.accessToken)
      }),
      catchError(error => {
        this.notification.mostrarMensagem("Erro ao autenticar!")
        console.error(error)
        return EMPTY
      })
    )
  }
}
