import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogTarefaComponent } from 'src/app/components/dialog-tarefa/dialog-tarefa.component';
import { Tarefa } from 'src/app/models/tarefa';
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
          if(tarefa.concluida){
            this.tarefasConcluidas.push(tarefa)
          }
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
