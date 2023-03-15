import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { NotificationService } from 'src/app/services/notification.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent {

  public formLogin: FormGroup

  constructor(
    fb: FormBuilder,
    private usuarioService: UsuarioService,
    private notification: NotificationService,
    private Router: Router
    ) {
    this.formLogin = fb.group({
      nome: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      senha: ["", [Validators.required]]
    })
  }

  cadastrar() {
    if(this.formLogin.valid){
      const usuario: Usuario = this.formLogin.value
      localStorage.setItem("email", this.formLogin.value.email)
      this.usuarioService.salvarUsuario(usuario).subscribe(resposta => {
        this.notification.mostrarMensagem("Cadastrado com sucesso!")
        this.Router.navigate(["/login"])
      })
    }else {
      this.notification.mostrarMensagem("Dados inválidos!")
    }
  }

}
