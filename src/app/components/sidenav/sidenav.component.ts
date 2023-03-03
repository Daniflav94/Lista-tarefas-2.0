import { Component, Output, EventEmitter, SimpleChanges, OnChanges, OnInit } from '@angular/core';
import { Tarefa } from 'src/app/models/tarefa';
import { TarefasService } from 'src/app/services/tarefas.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit{

  constructor(
    private tarefasService: TarefasService,
  ){
  }

  ngOnInit(): void {
    this.listarTarefas()
  }

  tarefasDoDia: Tarefa[] = [];
  tarefas: Tarefa[] = [];
  importantes: Tarefa[] = [];

  listarTarefas() {
    this.tarefasService.listarTarefas().subscribe(lista => {
      this.tarefas = lista
      lista.forEach(tarefa => {
        if(tarefa.meuDia == true){
          this.tarefasDoDia.push(tarefa)
        }
        if(tarefa.favorito == true){
          this.importantes.push(tarefa)
        }

      })
    });
  }
}
