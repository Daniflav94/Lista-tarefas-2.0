import { Component, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Repeticao } from 'src/app/models/repeticao';
import { Tarefa } from 'src/app/models/tarefa';
import { NotificationService } from 'src/app/services/notification.service';
import { TarefasService } from 'src/app/services/tarefas.service';

@Component({
  selector: 'app-dialog-tarefa',
  templateUrl: './dialog-tarefa.component.html',
  styleUrls: ['./dialog-tarefa.component.scss']
})
export class DialogTarefaComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public tarefa: Tarefa,
    private tarefasService: TarefasService,
    private notificacao: NotificationService,
    private route: ActivatedRoute,
  ) {
  }

  editar(form: NgForm): void {
      const tarefaEditada = this.tarefa
      this.tarefasService.editarTarefa(tarefaEditada).subscribe(resposta => {
        this.notificacao.mostrarMensagem("Tarefa editada!")
        setTimeout(function () {
        location.reload();
      }, 2000)
      })
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

  limparCampo(campo: string){
    if(campo == 'data'){
      this.tarefa.data = undefined
    }else if(campo == 'repeticao'){
      this.tarefa.repeticao = ''
    }
  }

  deletar(tarefa: Tarefa){
    tarefa.repeticao = undefined
    this.tarefasService.editarTarefa(tarefa).subscribe(resposta => {
      this.tarefasService.deletarTarefa(tarefa._id).subscribe(resposta => {
        this.notificacao.mostrarMensagem("Tarefa deletada!")
        setTimeout(function () {
          location.reload();
        }, 2000)
      })
    })
  }

}
