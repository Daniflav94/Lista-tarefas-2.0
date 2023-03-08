import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogExcluirComponent } from 'src/app/components/dialog-excluir/dialog-excluir.component';
import { DialogTarefaComponent } from 'src/app/components/dialog-tarefa/dialog-tarefa.component';
import { Lista } from 'src/app/models/lista';
import { Tarefa } from 'src/app/models/tarefa';
import { ListaService } from 'src/app/services/lista.service';
import { NotificationService } from 'src/app/services/notification.service';
import { TarefasService } from 'src/app/services/tarefas.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaComponent {

  constructor(
    private tarefasService: TarefasService,
    private listaService: ListaService,
    public dialog: MatDialog,
    private notificacao: NotificationService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.listarTarefas();
    this.listarConcluidas();
    this.inicializarLista();
  }

  tarefas: Tarefa[] = [];
  tarefa: Tarefa = {
    _id: 0,
    nome: '',
    favorito: false,
    concluida: false,
    criadaEm: new Date(),
    repeticao: undefined,
    data: undefined,
  };
  expandir: boolean = false;
  tarefasConcluidas: Tarefa[] = []
  lista: Lista = {
    _id: 0,
    nome: ''
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
    this.inicializarLista()
    if (this.tarefa.nome != '') {
      this.tarefa.lista = this.lista
      console.log(this.lista)
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
          data: undefined
        };
      });
    } else {
      this.notificacao.mostrarMensagem('Preencha o campo do nome da tarefa!');
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
