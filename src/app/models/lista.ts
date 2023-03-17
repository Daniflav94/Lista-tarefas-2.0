import { Usuario } from "./usuario";

export interface Lista {
  _id: number;
  nome: string;
  usuario: Usuario;
  tema: string;
}
