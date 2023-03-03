import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private snackBar: MatSnackBar) { }

  mostrarMensagem(mensagem: string){
    this.snackBar.open(mensagem, 'fechar', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: "top",
      panelClass: 'warning'
    })
  }
}
