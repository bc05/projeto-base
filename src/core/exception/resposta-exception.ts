import { HttpStatus } from '@nestjs/common';
import { MensagemErroValidacao } from '../pipes';

export interface IMensagemRespostaException {
  mensagem: string;
  campo?: string;
}

interface IRespostaException {
  status: number;
  mensagens: IMensagemRespostaException[];
}

export function construirRespostaException(
  mensagens: string | MensagemErroValidacao[],
  status: number | HttpStatus,
): IRespostaException {
  if (typeof mensagens === 'string') {
    return {
      mensagens: [
        {
          mensagem: mensagens,
        },
      ],
      status,
    };
  }

  return {
    mensagens,
    status,
  };
}
