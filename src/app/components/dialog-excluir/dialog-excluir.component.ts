import { Component } from '@angular/core';
import { NotificationService } from 'src/app/services/notification.service';
import { TarefasService } from 'src/app/services/tarefas.service';

@Component({
  selector: 'app-dialog-excluir',
  templateUrl: './dialog-excluir.component.html',
  styleUrls: ['./dialog-excluir.component.scss']
})
export class DialogExcluirComponent {

  constructor(
    private tarefasService: TarefasService,
    private notificacao: NotificationService,
  ){}

  excluir() {
    this.tarefasService.listarTarefas().subscribe(lista => {
      lista.forEach(tarefa => {
        if(tarefa.concluida){
          this.tarefasService.deletarTarefa(tarefa._id).subscribe()
        }
      })
      this.notificacao.mostrarMensagem("Tarefas concluídas apagadas!")
      setTimeout(function () {
        location.reload();
      }, 2000)
    })
  }

}
