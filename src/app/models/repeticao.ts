export enum Repeticao {
  DIARIAMENTE = "Diariamente",
  SEMANALMENTE = "Semanalmente",
  MENSALMENTE = "Mensalmente"
}

export const RepeticaoMapping: Record<Repeticao, string> = {
  [Repeticao.DIARIAMENTE]: "Diariamente",
  [Repeticao.SEMANALMENTE]: "Semanalmente",
  [Repeticao.MENSALMENTE]: "Mensalmente",
}
