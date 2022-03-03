export const mensagemInvalido = (recurso): string =>
  `O campo ${recurso} é inválido.`;

export const mensagemObrigatorio = (recurso: string): string =>
  `O campo ${recurso} é obrigatório.`;

export const mensagemOpcoesValidas = (
  recurso: string,
  opcoes: string[],
): string =>
  `O campo ${recurso} deve ser uma das opções: ${opcoes.join(', ')}.`;

export const mensagemTamanhoTextoMinimo = (
  recurso: string,
  tamanho: number,
): string => `O campo ${recurso} deve ter no mínimo ${tamanho} caracteres.`;

export const mensagemTamanhoTextoMaximo = (
  recurso: string,
  tamanho: number,
): string => `O campo ${recurso} deve ter no máximo ${tamanho} caracteres.`;

export const mensagemTipoTexto = (recurso: string): string =>
  `O campo ${recurso} deve ser do tipo texto.`;

export const mensagemTipoNumero = (recurso: string): string =>
  `O campo ${recurso} deve ser do tipo numérico.`;
