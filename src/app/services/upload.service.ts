import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { catchError, EMPTY, from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private storage: AngularFireStorage) { }

  public uploadFoto(foto: File): Observable<any> {
    const promise = this.storage.upload(`fotos/${Date.now()}`, foto)
    return from(promise).pipe(
      catchError(error => {
        console.error
        return EMPTY
      })
    )
  }

}
