import { Component, Output, EventEmitter, SimpleChanges, OnChanges, OnInit } from '@angular/core';
import { Lista } from 'src/app/models/lista';
import { Tarefa } from 'src/app/models/tarefa';
import { ListaService } from 'src/app/services/lista.service';
import { NotificationService } from 'src/app/services/notification.service';
import { TarefasService } from 'src/app/services/tarefas.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit{

  constructor(
    private tarefasService: TarefasService,
    private listaService: ListaService,
    private notification: NotificationService
  ){
  }

  ngOnInit(): void {
    this.listarTarefas()
    this.listarListas()
  }

  tarefasDoDia: Tarefa[] = [];
  tarefas: Tarefa[] = [];
  importantes: Tarefa[] = [];
  lista: Lista = {
    _id: 0,
    nome: ''
  }
  listas: Lista[] = []

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

  listarListas() {
    this.listaService.listar().subscribe(lista => {
      this.listas = lista
    })
  }

  novaLista(){
    if(this.lista.nome != ''){
      this.listaService.salvar(this.lista).subscribe(resposta => {
        this.listarListas()
      })
    }else{
      this.notification.mostrarMensagem("Nome da lista não pode estar em branco!")
    }

  }
}
