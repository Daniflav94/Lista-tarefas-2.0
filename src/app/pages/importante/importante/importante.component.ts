import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogExcluirComponent } from 'src/app/components/dialog-excluir/dialog-excluir.component';
import { DialogTarefaComponent } from 'src/app/components/dialog-tarefa/dialog-tarefa.component';
import { Tarefa } from 'src/app/models/tarefa';
import { Usuario } from 'src/app/models/usuario';
import { NotificationService } from 'src/app/services/notification.service';
import { TarefasService } from 'src/app/services/tarefas.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-importante',
  templateUrl: './importante.component.html',
  styleUrls: ['./importante.component.scss']
})
export class ImportanteComponent {

  constructor(
    private tarefasService: TarefasService,
    private usuarioService: UsuarioService,
    public dialog: MatDialog,
    private notificacao: NotificationService
  ) {
  }

  ngOnInit(): void {
    this.listarTarefas()
    this.listarConcluidas()
    this.carregarUsuario()
  }

  usuario!: Usuario
  tarefasImportantes: Tarefa[] = []
  tarefa: Tarefa = {
    _id: 0,
    nome: '',
    favorito: false,
    concluida: false,
    criadaEm: new Date(),
    repeticao: undefined,
    data: undefined,
    usuario: this.usuario
  };
  expandir: boolean = false
  tarefasConcluidas: Tarefa[] = []
  temas: string[] = ["/assets/img/alice-donovan-rouse-pZ61ZA8QgcY-unsplash.jpg", "/assets/img/david-marcu-78A265wPiO4-unsplash.jpg", "assets/img/boxed-water-is-better-5Lw1U5BIumE-unsplash.jpg", "assets/img/sean-oulashin-KMn4VEeEPR8-unsplash.jpg", "/assets/img/pexels-irina-iriser-1122628.jpg", "/assets/img/timothy-eberly-yuiJO6bvHi4-unsplash.jpg", "assets/img/jordan-whitt-qGQNmBE7mYw-unsplash.jpg", "assets/img/erico-marcelino-91QHQ3GGh9I-unsplash.jpg", "assets/img/darya-jum-uEtgnJFwujA-unsplash.jpg", "assets/img/aayush-gupta-ljhCEaHYWJ8-unsplash.jpg", "assets/img/ferhat-deniz-fors-cWdefpoj3PU-unsplash.jpg", "assets/img/ricardo-resende-3PhGJ9jkaQM-unsplash.jpg", "assets/img/alice-yamamura-s1HNMntIv5w-unsplash.jpg", "assets/img/guilherme-stecanella-SaVlzqe9068-unsplash.jpg", "assets/img/marek-piwnicki-_3qLnlJlyZw-unsplash.jpg", "assets/img/daiga-ellaby-ClWvcrkBhMY-unsplash.jpg"]

  carregarUsuario() {
    let email = localStorage.getItem("email")
    if(email){
      this.usuarioService.filtrarPorEmail(email).subscribe(user => {
        this.usuario = user
      })
    }
  }

  mudarTema(tema: string) {
    let email = localStorage.getItem("email")
    if(email){
      this.usuarioService.filtrarPorEmail(email).subscribe(user => {
        this.usuario = user
        this.usuario.temaImportante = tema
        this.usuarioService.editarUsuario(this.usuario).subscribe()
      })
    }
  }

  listarTarefas() {
    const hoje = new Date();
    const amanha = new Date(hoje.getTime());
    const ontem = new Date(hoje.getTime())
    ontem.setDate(hoje.getDate() - 1)
    amanha.setDate(hoje.getDate() + 1);

    this.tarefasService.listarTarefas().subscribe(lista => {
      lista.forEach(tarefa => {

        if(tarefa.lista == null){
          if(tarefa.favorito){
            this.tarefasImportantes.push(tarefa)
          }
          const data = new Date(tarefa.data as Date).toLocaleDateString()
          const getData = new Date(tarefa.data as Date).getTime()

          if(data == hoje.toLocaleDateString()){
            tarefa.meuDia = true
            this.tarefasService.editarTarefa(tarefa).subscribe()
          }else if(data != hoje.toLocaleDateString()){
            tarefa.meuDia  = false;
            this.tarefasService.editarTarefa(tarefa).subscribe()
          }

          if(data == amanha.toLocaleDateString()){
            tarefa.amanha = true
            this.tarefasService.editarTarefa(tarefa).subscribe()
          }else if(data != amanha.toLocaleDateString()){
            tarefa.amanha = false
            this.tarefasService.editarTarefa(tarefa).subscribe()
          }

          if(data == ontem.toLocaleDateString() || getData < ontem.getTime()){
            tarefa.ontem = true
            this.tarefasService.editarTarefa(tarefa).subscribe()
          }
        }
      })
    });
  }

  listarConcluidas(){
    this.tarefasService.listarTarefas().subscribe((lista) => {
      lista.forEach((tarefa) => {
        if(tarefa.lista == null){
          if(tarefa.favorito){
            if(tarefa.concluida){
              this.tarefasConcluidas.push(tarefa)
            }
          }
        }
      });
    });
  }

  escolherData(data: string) {
    const hoje = new Date();
    const amanha = new Date(hoje.getTime());
    amanha.setDate(hoje.getDate() + 1);

    if (data == 'hoje') {
      this.tarefa.data = hoje;
    } else if (data == 'amanha') {
      this.tarefa.data = amanha;
    }
  }

  escolherRepeticao(repeticao: string) {
    if (repeticao == 'diariamente') {
      this.tarefa.repeticao = 'DIARIAMENTE';
    } else if (repeticao == 'semanalmente') {
      this.tarefa.repeticao = 'SEMANALMENTE';
    } else if (repeticao == 'mensalmente') {
      this.tarefa.repeticao = 'MENSALMENTE';
    }
  }

  criarTarefa() {
    if (this.tarefa.nome != '') {
      this.tarefa.favorito = true
      this.tarefasService.salvarTarefa(this.tarefa).subscribe((resposta) => {
        this.listarTarefas();
        this.tarefa = {
          _id: 0,
          nome: '',
          favorito: false,
          concluida: false,
          dataConclusao: undefined,
          criadaEm: new Date(),
          repeticao: undefined,
          data: undefined,
          usuario: this.usuario
        };
      });
    } else {
      this.notificacao.mostrarMensagem('Preencha o campo do nome da tarefa!');
    }
  }

  desfavoritar(tarefa: Tarefa){
    tarefa.favorito = false
    this.tarefasService.editarTarefa(tarefa).subscribe()
    let index = this.tarefasImportantes.indexOf(tarefa)
    this.tarefasImportantes.splice(index, 1)

  }

  openDialog(tarefa: Tarefa) {
    this.dialog.open(DialogTarefaComponent, {
      width: '350px',
      height: 'auto',
      data: tarefa,
    });
  }

  openDialogExcluir(lista: string) {
    this.dialog.open(DialogExcluirComponent, {
      width: '370px',
      height: 'auto',
      data: lista
    });
  }

  marcarComoConcluida(tarefa: Tarefa) {
    if (tarefa.concluida) {
      tarefa.concluida = false;
      tarefa.dataConclusao = undefined;
      this.tarefasService.editarTarefa(tarefa).subscribe();
      let index = this.tarefasConcluidas.indexOf(tarefa)
      this.tarefasConcluidas.splice(index, 1)
    } else {
      tarefa.concluida = true;
      tarefa.dataConclusao = new Date();
      this.tarefasService.editarTarefa(tarefa).subscribe();
      this.tarefasConcluidas.push(tarefa)
    }
  }

  mostrarConcluidas() {
    this.expandir = !this.expandir;
  }


}
