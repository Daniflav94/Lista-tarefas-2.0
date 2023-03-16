export interface Usuario {
  _id: number;
  nome: string;
  email: string;
  senha: string;
  foto?: string;
  perfil: string;
  temaHome: string;
  temaMeuDia: string;
  temaImportante: string;
}

