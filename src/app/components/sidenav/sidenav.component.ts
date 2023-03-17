import { Component, Output, EventEmitter, SimpleChanges, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Lista } from 'src/app/models/lista';
import { Tarefa } from 'src/app/models/tarefa';
import { Usuario } from 'src/app/models/usuario';
import { ListaService } from 'src/app/services/lista.service';
import { NotificationService } from 'src/app/services/notification.service';
import { TarefasService } from 'src/app/services/tarefas.service';
import { UploadService } from 'src/app/services/upload.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit{

  constructor(
    private tarefasService: TarefasService,
    private listaService: ListaService,
    private usuarioService: UsuarioService,
    private notification: NotificationService,
    private uploadService: UploadService,
    private router: Router
  ){
  }

  ngOnInit(): void {
    this.listarTarefas()
    this.listarListas()
    this.carregarUsuario()
  }

  usuario: Usuario = {
    _id: 0,
    nome: '',
    email: '',
    senha: '',
    foto: '',
    perfil: '',
    temaHome: "",
    temaImportante: "",
    temaMeuDia: ""
  }
  tarefasDoDia: Tarefa[] = [];
  tarefas: Tarefa[] = [];
  importantes: Tarefa[] = [];
  lista: Lista = {
    _id: 0,
    nome: '',
    usuario: this.usuario,
    tema: ''
  }
  listas: Lista[] = []
  isLoading: boolean = false
  foto: string = ''

  listarTarefas() {
    this.tarefasService.listarTarefas().subscribe(lista => {
      this.tarefas = lista
      if(lista != undefined){
        lista.forEach(tarefa => {
          if(tarefa.meuDia == true){
            this.tarefasDoDia.push(tarefa)
          }
          if(tarefa.favorito == true){
            this.importantes.push(tarefa)
          }
        })
      }
    });
  }

  listarListas() {
    this.listaService.listar().subscribe(lista => {
      this.listas = lista
    })
  }

  novaLista(){
    let email = localStorage.getItem("email")
    if(email){
      if(this.lista.nome != ''){
        this.usuarioService.filtrarPorEmail(email).subscribe(user => {
          this.lista.usuario = user
          this.listaService.salvar(this.lista).subscribe(resposta => {
            this.listarListas()
            this.lista = {
              _id: 0,
              nome: '',
              usuario: this.usuario,
              tema: ''
            }
          })
        })
      }else{
        this.notification.mostrarMensagem("Nome da lista não pode estar em branco!")
    }
    }
  }

  atualizar(idLista: number){
    //this.router.navigateByUrl('/lista/' + idLista)
    window.location.replace('/lista/' + idLista)

  }

  carregarUsuario() {
    let email = localStorage.getItem("email")
    if(email){
      this.usuarioService.filtrarPorEmail(email).subscribe(user => {
        this.usuario = user
      })
    }
  }

 uploadFoto(event: any) {
    this.isLoading = true
    const file: File = event.target.files[0]
    this.uploadService.uploadFoto(file).subscribe(resposta => {
      resposta.ref.getDownloadURL().then((foto: string) => {
        this.foto = foto
        this.isLoading = false
      })
    })
  }

  inserirFoto() {
    let email = localStorage.getItem("email")
    if(email){
      this.usuarioService.filtrarPorEmail(email).subscribe(user => {
        this.usuario = user
        this.usuario.foto = this.foto
        this.usuarioService.editarUsuario(this.usuario).subscribe()
      })
    }
  }

  public logout(): void {
      localStorage.clear()
      this.router.navigate(["/login"]);
  }
}
