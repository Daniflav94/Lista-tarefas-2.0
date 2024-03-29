import { Component } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogExcluirComponent } from 'src/app/components/dialog-excluir/dialog-excluir.component';
import { DialogTarefaComponent } from 'src/app/components/dialog-tarefa/dialog-tarefa.component';
import { Tarefa } from 'src/app/models/tarefa';
import { Usuario } from 'src/app/models/usuario';
import { TarefasService } from 'src/app/services/tarefas.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-meu-dia',
  templateUrl: './meu-dia.component.html',
  styleUrls: ['./meu-dia.component.scss'],
})
export class MeuDiaComponent {
  constructor(
    private tarefasService: TarefasService,
    private usuarioService: UsuarioService,
    public dialog: MatDialog,
    private dateAdapter: DateAdapter<Date>
  ) {}

  ngOnInit(): void {
    this.listarTarefas();
    this.formatarData();
    this.carregarUsuario();
  }

  usuario!: Usuario;
  tarefasDoDia: Tarefa[] = [];
  tarefa: Tarefa = {
    _id: 0,
    nome: '',
    favorito: false,
    concluida: false,
    criadaEm: new Date(),
    repeticao: undefined,
    data: undefined,
    usuario: this.usuario,
  };
  dataHoje = new Date();
  dataFormatada: any;
  expandir: boolean = false;
  tarefasConcluidas: Tarefa[] = [];
  temas: string[] = [
    '/assets/img/alice-donovan-rouse-pZ61ZA8QgcY-unsplash.jpg',
    '/assets/img/david-marcu-78A265wPiO4-unsplash.jpg',
    'assets/img/boxed-water-is-better-5Lw1U5BIumE-unsplash.jpg',
    'assets/img/sean-oulashin-KMn4VEeEPR8-unsplash.jpg',
    '/assets/img/pexels-irina-iriser-1122628.jpg',
    '/assets/img/timothy-eberly-yuiJO6bvHi4-unsplash.jpg',
    'assets/img/jordan-whitt-qGQNmBE7mYw-unsplash.jpg',
    'assets/img/erico-marcelino-91QHQ3GGh9I-unsplash.jpg',
    'assets/img/darya-jum-uEtgnJFwujA-unsplash.jpg',
    'assets/img/aayush-gupta-ljhCEaHYWJ8-unsplash.jpg',
    'assets/img/ferhat-deniz-fors-cWdefpoj3PU-unsplash.jpg',
    'assets/img/ricardo-resende-3PhGJ9jkaQM-unsplash.jpg',
    'assets/img/alice-yamamura-s1HNMntIv5w-unsplash.jpg',
    'assets/img/guilherme-stecanella-SaVlzqe9068-unsplash.jpg',
    'assets/img/marek-piwnicki-_3qLnlJlyZw-unsplash.jpg',
    'assets/img/daiga-ellaby-ClWvcrkBhMY-unsplash.jpg',
  ];

  carregarUsuario() {
    let email = localStorage.getItem('email');
    if (email) {
      this.usuarioService.filtrarPorEmail(email).subscribe((user) => {
        this.usuario = user;
      });
    }
  }

  mudarTema(tema: string) {
    let email = localStorage.getItem('email');
    if (email) {
      this.usuarioService.filtrarPorEmail(email).subscribe((user) => {
        this.usuario = user;
        this.usuario.temaMeuDia = tema;
        this.usuarioService.editarUsuario(this.usuario).subscribe();
      });
    }
  }

  formatarData() {
    const mes = this.dataHoje.getMonth() + 1;
    let mesEscrito;
    const semana = [
      'Domingo',
      'Segunda-Feira',
      'Terça-Feira',
      'Quarta-Feira',
      'Quinta-Feira',
      'Sexta-Feira',
      'Sábado',
    ];

    switch (mes) {
      case 1:
        mesEscrito = 'Janeiro';
        break;
      case 2:
        mesEscrito = 'Fevereiro';
        break;
      case 3:
        mesEscrito = 'Março';
        break;
      case 4:
        mesEscrito = 'Abril';
        break;
      case 5:
        mesEscrito = 'Maio';
        break;
      case 6:
        mesEscrito = 'Junho';
        break;
      case 7:
        mesEscrito = 'Julho';
        break;
      case 8:
        mesEscrito = 'Agosto';
        break;
      case 9:
        mesEscrito = 'Setembro';
        break;
      case 10:
        mesEscrito = 'Outubro';
        break;
      case 11:
        mesEscrito = 'Novembro';
        break;
      case 12:
        mesEscrito = 'Dezembro';
        break;
    }

    this.dataFormatada =
      semana[this.dataHoje.getDay()] +
      ', ' +
      this.dataHoje.getDate() +
      ' de ' +
      mesEscrito;
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
    this.tarefasService.listarTarefas().subscribe((lista) => {
      lista.forEach((tarefa) => {
        if (tarefa.lista == null) {
          if (tarefa.meuDia) {
            this.tarefasDoDia.push(tarefa);
            if (tarefa.concluida) {
              this.tarefasConcluidas.push(tarefa);
            }
          }
        }
      });
    });
  }

  criarTarefa() {
    let email = localStorage.getItem('email');
    if (email) {
      this.usuarioService.filtrarPorEmail(email).subscribe((user) => {
        this.tarefa.usuario = user
        this.tarefa.data = this.dataHoje;
        this.tarefa.meuDia = true;
        this.tarefasService.salvarTarefa(this.tarefa).subscribe((resposta) => {
          this.tarefasDoDia = []
          this.listarTarefas()
          this.tarefa = {
            _id: 0,
            nome: '',
            favorito: false,
            concluida: false,
            criadaEm: new Date(),
            repeticao: undefined,
            data: undefined,
            usuario: this.usuario
          };
        });
      });
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
      this.tarefasService.editarTarefa(tarefa).subscribe();
      let index = this.tarefasConcluidas.indexOf(tarefa);
      this.tarefasConcluidas.splice(index, 1);
    } else {
      tarefa.concluida = true;
      tarefa.dataConclusao = new Date();
      this.tarefasService.editarTarefa(tarefa).subscribe();
      this.tarefasConcluidas.push(tarefa);
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
      data: lista,
    });
  }
}
