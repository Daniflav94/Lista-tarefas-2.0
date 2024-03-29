import { Lista } from "./lista";
import { Usuario } from "./usuario";

export interface Tarefa {
  _id: number;
  nome: string;
  favorito: boolean;
  concluida: boolean;
  data?: Date;
  meuDia?: boolean;
  repeticao?: string;
  anotacao?: string;
  criadaEm: Date;
  amanha?: boolean;
  ontem?: boolean;
  dataConclusao?: Date;
  lista?: Lista;
  status?: string;
  usuario: Usuario;
}
