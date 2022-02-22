import { ClassConstructor, Expose, plainToClass } from 'class-transformer';

import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

import { IResposta, IRespostaSimples } from '../contratos/resposta.interface';

export class RespostaSimplesDto implements IRespostaSimples {
  @ApiProperty({
    description: 'Mensagem de retorno',
    example: 'Registro inserido com sucesso',
  })
  @Expose()
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
}

export class FabricaRepostaDto {
  public static construir<T>(
    classe: ClassConstructor<T>,
    resultado: T | T[],
    dadosResposta?: Omit<IResposta<T>, 'resultado'>,
  ): RespostaDto<T> {
    const resultadoSerializado = FabricaRepostaDto.serializarResultado(
      classe,
      resultado,
    );

    return plainToClass(RespostaDto, {
      ...dadosResposta,
      resultado: resultadoSerializado,
    });
  }

  private static serializarResultado<T>(
    classe: ClassConstructor<T>,
    resultado: T | T[],
  ): T | T[] {
    if (Array.isArray(resultado)) {
      return resultado.map((item) =>
        plainToClass(classe, item, { excludeExtraneousValues: true }),
      );
    }

    return plainToClass(classe, resultado, { excludeExtraneousValues: true });
  }
}
