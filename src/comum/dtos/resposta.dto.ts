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
  @Expose()
  status: number;
}

export class RespostaDto<T> implements IResposta<T> {
  @ApiProperty({
    description: 'Mensagem de retorno',
    example: 'Registro inserido com sucesso',
    required: false,
  })
  @Expose()
  mensagem?: string;

  @ApiProperty({
    description: 'Status da resposta',
    example: 200,
    required: false,
  })
  @Expose()
  status?: number;

  @Expose()
  resultado: T;
}

export function serializarResultado<T>(
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

export function construirRespostaSimplesDto(
  dadosResposta: IRespostaSimples,
): RespostaSimplesDto {
  return plainToClass(RespostaSimplesDto, dadosResposta, {
    excludeExtraneousValues: true,
  });
}

export function construirRespostaObjetoDto<T>(
  classe: ClassConstructor<T>,
  resultado: T,
  dadosResposta?: Omit<IResposta<T>, 'resultado'>,
): RespostaDto<T> {
  const resultadoSerializado = serializarResultado(classe, resultado);

  return plainToClass(
    RespostaDto,
    {
      ...dadosResposta,
      resultado: resultadoSerializado,
    },
    {
      excludeExtraneousValues: true,
    },
  );
}

export function construirRespostaColecaoDto<T>(
  classe: ClassConstructor<T>,
  resultado: T[],
  dadosResposta?: Omit<IResposta<T>, 'resultado'>,
): RespostaDto<T[]> {
  const resultadoSerializado = serializarResultado(classe, resultado);

  return plainToClass(
    RespostaDto,
    {
      ...dadosResposta,
      resultado: resultadoSerializado,
    },
    {
      excludeExtraneousValues: true,
    },
  );
}
