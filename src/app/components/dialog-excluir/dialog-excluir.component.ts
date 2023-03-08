import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationService } from 'src/app/services/notification.service';
import { TarefasService } from 'src/app/services/tarefas.service';

@Component({
  selector: 'app-dialog-excluir',
  templateUrl: './dialog-excluir.component.html',
  styleUrls: ['./dialog-excluir.component.scss']
})
export class DialogExcluirComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) private list: string,

    private tarefasService: TarefasService,
    private notificacao: NotificationService,
  ){}

  excluir() {
    this.tarefasService.listarTarefas().subscribe(lista => {
      lista.forEach(tarefa => {
        if(this.list == 'home'){
          if(tarefa.concluida){
            this.tarefasService.deletarTarefa(tarefa._id).subscribe()
          }
        }else if(this.list == 'importante'){
          if(tarefa.favorito && tarefa.concluida){
            this.tarefasService.deletarTarefa(tarefa._id).subscribe()
          }
        }else if(this.list == 'meuDia'){
          if(tarefa.meuDia && tarefa.concluida){
            this.tarefasService.deletarTarefa(tarefa._id).subscribe()
          }
        }

      })
      this.notificacao.mostrarMensagem("Tarefas concluídas apagadas!")
      setTimeout(function () {
        location.reload();
      }, 2000)
    })
  }

}
