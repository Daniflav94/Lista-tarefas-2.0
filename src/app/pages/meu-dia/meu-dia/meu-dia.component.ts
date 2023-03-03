import { Component } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogTarefaComponent } from 'src/app/components/dialog-tarefa/dialog-tarefa.component';
import { Tarefa } from 'src/app/models/tarefa';
import { TarefasService } from 'src/app/services/tarefas.service';

@Component({
  selector: 'app-meu-dia',
  templateUrl: './meu-dia.component.html',
  styleUrls: ['./meu-dia.component.scss']
})
export class MeuDiaComponent {

  constructor(
    private tarefasService: TarefasService,
    public dialog: MatDialog,
    private dateAdapter: DateAdapter<Date>
  ) {
  }

  ngOnInit(): void {
    this.listarTarefas()
    this.formatarData()
  }

  tarefasDoDia: Tarefa[] = [];
  tarefa: Tarefa = {
    _id: 0,
    nome: '',
    favorito: false,
    concluida: false,
    criadaEm: new Date(),
    repeticao: undefined,
    data: undefined,
  };
  dataHoje = new Date();
  dataFormatada: any
  expandir: boolean = false;
  tarefasConcluidas: Tarefa[] = []

  formatarData(){
    const mes = this.dataHoje.getMonth() + 1
    let mesEscrito
    const semana = ["Domingo", "Segunda-Feira", "Terça-Feira", "Quarta-Feira", "Quinta-Feira", "Sexta-Feira", "Sábado"];

    switch(mes) {
      case 1:
        mesEscrito = "Janeiro";
        break;
      case 2:
        mesEscrito = "Fevereiro";
        break;
      case 3:
        mesEscrito = "Março";
        break;
      case 4:
        mesEscrito = "Abril";
        break;
      case 5:
        mesEscrito = "Maio";
        break;
      case 6:
        mesEscrito = "Junho";
        break;
      case 7:
        mesEscrito = "Julho";
        break;
      case 8:
        mesEscrito = "Agosto";
        break;
      case 9:
        mesEscrito = "Setembro";
        break;
      case 10:
        mesEscrito = "Outubro";
        break;
      case 11:
        mesEscrito = "Novembro";
        break;
      case 12:
        mesEscrito = "Dezembro";
        break;
    }

    this.dataFormatada = (semana[this.dataHoje.getDay()] + ", " + this.dataHoje.getDate() + " de " + mesEscrito)
  }


  escolherRepeticao(repeticao: string) {
    if (repeticao == 'diariamente') {
      this.tarefa.repeticao = "DIARIAMENTE";
    } else if (repeticao == 'semanalmente') {
      this.tarefa.repeticao = "SEMANALMENTE";
    } else if (repeticao == 'mensalmente') {
      this.tarefa.repeticao = "MENSALMENTE";
    }
  }

  listarTarefas() {
    this.tarefasService.listarTarefas().subscribe(lista => {
      lista.forEach(tarefa => {
        if(tarefa.meuDia == true){
          this.tarefasDoDia.push(tarefa)
          if(tarefa.concluida){
            this.tarefasConcluidas.push(tarefa)
          }
        }
      })
    });
  }

  criarTarefa() {
    this.tarefa.data = this.dataHoje
    this.tarefa.meuDia = true
    this.tarefasService.salvarTarefa(this.tarefa).subscribe(resposta => {
      this.tarefasDoDia.push(this.tarefa)
      this.tarefa = {
        _id: 0,
        nome: '',
        favorito: false,
        concluida: false,
        criadaEm: new Date(),
        repeticao: undefined,
        data: undefined,
      };
    })
  }

  favoritar(tarefa: Tarefa){
    tarefa.favorito = true
    this.tarefasService.editarTarefa(tarefa).subscribe()
  }

  desfavoritar(tarefa: Tarefa){
    tarefa.favorito = false
    this.tarefasService.editarTarefa(tarefa).subscribe()
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

  openDialog(tarefa: Tarefa) {
    this.dialog.open(DialogTarefaComponent, {
      width: '350px',
      height: 'auto',
      data: tarefa,
    });
  }
}

