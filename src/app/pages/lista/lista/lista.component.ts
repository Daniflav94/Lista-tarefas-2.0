import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogExcluirComponent } from 'src/app/components/dialog-excluir/dialog-excluir.component';
import { DialogTarefaComponent } from 'src/app/components/dialog-tarefa/dialog-tarefa.component';
import { Lista } from 'src/app/models/lista';
import { Tarefa } from 'src/app/models/tarefa';
import { Usuario } from 'src/app/models/usuario';
import { ListaService } from 'src/app/services/lista.service';
import { NotificationService } from 'src/app/services/notification.service';
import { TarefasService } from 'src/app/services/tarefas.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaComponent {

  constructor(
    private tarefasService: TarefasService,
    private usuarioService: UsuarioService,
    private listaService: ListaService,
    public dialog: MatDialog,
    private notificacao: NotificationService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.listarTarefas();
    this.listarConcluidas();
    this.inicializarLista();
    this.carregarUsuario();
  }

  usuario!: Usuario
  tarefas: Tarefa[] = [];
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
  expandir: boolean = false;
  tarefasConcluidas: Tarefa[] = []
  lista: Lista = {
    _id: 0,
    nome: '',
    usuario: this.usuario,
    tema: ''
  }
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
    this.lista.tema = tema
    this.listaService.editar(this.lista).subscribe()
  }

  inicializarLista() {
    const idLista = this.route.snapshot.params["id"]
    this.listaService.getListaById(idLista).subscribe(resposta => {
      this.lista = resposta
    })
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

  listarTarefas() {
    const idLista = this.route.snapshot.params["id"]
    const hoje = new Date();
    const amanha = new Date(hoje.getTime());
    const ontem = new Date(hoje.getTime());
    ontem.setDate(hoje.getDate() - 1);
    amanha.setDate(hoje.getDate() + 1);

    this.tarefasService.listarTarefas().subscribe((lista) => {
      lista.forEach((tarefa) => {
        const data = new Date(tarefa.data as Date).toLocaleDateString();
        const getData = new Date(tarefa.data as Date).getTime();

        if(tarefa.lista?._id == idLista){

          this.tarefas.push(tarefa)

          if (data == hoje.toLocaleDateString()) {
            tarefa.meuDia = true;
            this.tarefasService.editarTarefa(tarefa).subscribe();
          } else if (data != hoje.toLocaleDateString()) {
            tarefa.meuDia = false;
            this.tarefasService.editarTarefa(tarefa).subscribe();
          }

          if (data == amanha.toLocaleDateString()) {
            tarefa.amanha = true;
            this.tarefasService.editarTarefa(tarefa).subscribe();
          } else if (data != amanha.toLocaleDateString()) {
            tarefa.amanha = false;
            this.tarefasService.editarTarefa(tarefa).subscribe();
          }

          if (data == ontem.toLocaleDateString() || getData < ontem.getTime()) {
            tarefa.ontem = true;
            this.tarefasService.editarTarefa(tarefa).subscribe();
          }
        }

      });
    });
  }

  listarConcluidas(){
    const idLista = this.route.snapshot.params["id"]
    this.tarefasService.listarTarefas().subscribe((lista) => {
      lista.forEach((tarefa) => {
        if(tarefa.lista?._id == idLista){
          if(tarefa.concluida){
            this.tarefasConcluidas.push(tarefa)
          }
        }
      });
    });
  }

  criarTarefa() {
    let email = localStorage.getItem("email")
    if(email){
      this.usuarioService.filtrarPorEmail(email).subscribe(user => {
        if (this.tarefa.nome != '') {
          this.tarefa.lista = this.lista
          this.tarefa.usuario = user
          this.tarefasService.salvarTarefa(this.tarefa).subscribe((resposta) => {
            this.tarefas = []
            this.listarTarefas()
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
      })
    }
  }

  favoritar(tarefa: Tarefa) {
    tarefa.favorito = true;
    this.tarefasService.editarTarefa(tarefa).subscribe();
  }

  desfavoritar(tarefa: Tarefa) {
    tarefa.favorito = false;
    this.tarefasService.editarTarefa(tarefa).subscribe();
  }

  marcarComoConcluida(tarefa: Tarefa) {
    if (tarefa.concluida) {
      tarefa.concluida = false;
      tarefa.dataConclusao = undefined;
      let index = this.tarefasConcluidas.indexOf(tarefa)
      this.tarefasConcluidas.splice(index, 1)
      this.tarefasService.editarTarefa(tarefa).subscribe(resposta => {
        this.listarTarefas();
      });
    } else {
      tarefa.concluida = true;
      tarefa.dataConclusao = new Date();
      this.tarefasConcluidas.push(tarefa)
      this.tarefasService.editarTarefa(tarefa).subscribe();
    }
  }

  mostrarConcluidas() {
    this.expandir = !this.expandir;
  }

  openDialog(tarefa: Tarefa) {
    this.dialog.open(DialogTarefaComponent, {
      width: '350px',
      height: 'auto',
      data: tarefa,
    });
  }

  openDialogExcluir() {
    this.dialog.open(DialogExcluirComponent, {
      width: '370px',
      height: 'auto',
    });
  }

}
