import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

import { IResposta, IRespostaSimples } from '../contratos/resposta.interface';

export class RespostaSimplesDto implements IRespostaSimples {
  @ApiProperty({
    description: 'Mensagem de retorno',
    example: 'Registro inserido com sucesso',
  })
  mensagem: string;

  @ApiProperty({
    description: 'Status da resposta',
    example: HttpStatus.OK,
  })
  status: number;

  constructor(objeto: IRespostaSimples) {
    Object.assign(this, objeto);
  }
}

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
