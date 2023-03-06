import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogTarefaComponent } from 'src/app/components/dialog-tarefa/dialog-tarefa.component';
import { Tarefa } from 'src/app/models/tarefa';
import { NotificationService } from 'src/app/services/notification.service';
import { TarefasService } from 'src/app/services/tarefas.service';

@Component({
  selector: 'app-importante',
  templateUrl: './importante.component.html',
  styleUrls: ['./importante.component.scss']
})
export class ImportanteComponent {

  constructor(
    private tarefasService: TarefasService,
    public dialog: MatDialog,
    private notificacao: NotificationService
  ) {
  }

  ngOnInit(): void {
    this.listarTarefas()
  }

  tarefasImportantes: Tarefa[] = []
  tarefa: Tarefa = {
    _id: 0,
    nome: '',
    favorito: false,
    concluida: false,
    criadaEm: new Date(),
    repeticao: undefined,
    data: undefined,
  };
  expandir: boolean = false
  tarefasConcluidas: Tarefa[] = []

  listarTarefas() {
    const hoje = new Date();
    const amanha = new Date(hoje.getTime());
    const ontem = new Date(hoje.getTime())
    ontem.setDate(hoje.getDate() - 1)
    amanha.setDate(hoje.getDate() + 1);

    this.tarefasService.listarTarefas().subscribe(lista => {
      lista.forEach(tarefa => {
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
      })
    });
  }

  listarConcluidas(){
    this.tarefasService.listarTarefas().subscribe((lista) => {
      lista.forEach((tarefa) => {
        if(tarefa.favorito){
          if(tarefa.concluida){
            this.tarefasConcluidas.push(tarefa)
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
