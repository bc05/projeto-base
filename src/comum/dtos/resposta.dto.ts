import { ApiProperty } from '@nestjs/swagger';

import { IResposta } from '../contratos/resposta.interface';

export class RespostaDto<T> implements IResposta<T> {
  @ApiProperty({
    description: 'Mensagem de retorno',
    example: 'Registro inserido com sucesso',
    required: false,
  })
  mensagem?: string;

  @ApiProperty({
    description: 'Status da resposta',
    example: 200,
    required: false,
  })
  status?: number;

  resultado: T;

  constructor(objeto: IResposta<T>) {
    Object.assign(this, objeto);
  }
}
