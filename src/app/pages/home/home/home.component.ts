import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { DialogTarefaComponent } from 'src/app/components/dialog-tarefa/dialog-tarefa.component';
import { Tarefa } from 'src/app/models/tarefa';
import { TarefasService } from 'src/app/services/tarefas.service';
import { NotificationService } from 'src/app/services/notification.service';
import { DialogExcluirComponent } from 'src/app/components/dialog-excluir/dialog-excluir.component';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(
    private tarefasService: TarefasService,
    private usuarioService: UsuarioService,
    public dialog: MatDialog,
    private notificacao: NotificationService
  ) {}

  ngOnInit(): void {
    this.listarTarefas();
    this.listarConcluidas()
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
    usuario:
  };
  expandir: boolean = false;
  tarefasConcluidas: Tarefa[] = []

  carregarUsuario() {
    let email = localStorage.getItem("usuario")
    this.usuarioService.filtrarPorEmail
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
    const hoje = new Date();
    const amanha = new Date(hoje.getTime());
    const ontem = new Date(hoje.getTime());
    ontem.setDate(hoje.getDate() - 1);
    amanha.setDate(hoje.getDate() + 1);

    this.tarefasService.listarTarefas().subscribe((lista) => {
      lista.forEach((tarefa) => {
        const data = new Date(tarefa.data as Date).toLocaleDateString();
        const getData = new Date(tarefa.data as Date).getTime();

        if(tarefa.lista == null){

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
    this.tarefasService.listarTarefas().subscribe((lista) => {
      lista.forEach((tarefa) => {
        if(tarefa.lista == null){
          if(tarefa.concluida){
            this.tarefasConcluidas.push(tarefa)
          }
        }
      });
    });
  }

  criarTarefa() {
    if (this.tarefa.nome != '') {
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
          usuario:
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

  openDialogExcluir(lista: string) {
    this.dialog.open(DialogExcluirComponent, {
      width: '370px',
      height: 'auto',
      data: lista
    });
  }
}
