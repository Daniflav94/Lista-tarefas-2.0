import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Credenciais } from 'src/app/models/credenciais';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public formLogin: FormGroup

  constructor(
    fb: FormBuilder,
    private authService: AuthService,
    private notification: NotificationService,
    private Router: Router
    ) {
    this.formLogin = fb.group({
      email: ["", [Validators.required, Validators.email]],
      senha: ["", [Validators.required]]
    })
  }

  entrar() {
    if(this.formLogin.valid){
      const credenciais: Credenciais = this.formLogin.value
      localStorage.setItem("email", this.formLogin.value.email)
      this.authService.autenticar(credenciais).subscribe(resposta => {
        this.notification.mostrarMensagem("Bem vindo(a)!")
        this.Router.navigate(["/home"])
      })
    }else {
      this.notification.mostrarMensagem("Dados inválidos!")
    }
  }
}
