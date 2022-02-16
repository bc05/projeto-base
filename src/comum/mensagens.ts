export enum TipoOperacaoCRUD {
  CRIAR = 'criado',
  ALTERAR = 'alterado',
  EXCLUIR = 'removido',
}

export function mensagemResposta(recurso: string, operacao: TipoOperacaoCRUD) {
  return `${recurso} ${operacao} com sucesso!`;
}
