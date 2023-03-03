import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'datas'
})
export class DataPipe implements PipeTransform {

  transform(value: Date): any {
    const hoje = new Date();
    const amanha = new Date(hoje.getTime());
    const ontem = new Date(hoje.getTime())
    const data = new Date(value)
    ontem.setDate(hoje.getDate() - 1)
    amanha.setDate(hoje.getDate() + 1);

    if(data.toLocaleDateString() == hoje.toLocaleDateString()){
      return "Hoje"
    } else if(data.toLocaleDateString() == amanha.toLocaleDateString()){
      return "Amanhã"
    } else if(data.toLocaleDateString() == ontem.toLocaleDateString()){
      return "Ontem"
    } else{
      return data.toLocaleDateString()
    }

  }

}
