import { ApiProperty } from '@nestjs/swagger';

import { IResposta } from './comum/contratos/resposta.interface';
import { RespostaDto } from './comum/dtos/resposta.dto';
import { ISaude } from './saude.interface';

export class SaudeDto {
  @ApiProperty({
    description: 'Versão do sistema',
    example: '1.0.0',
  })
  versao: string;

  @ApiProperty({
    description: 'Status do sistema',
    example: 'ok',
  })
  status: string;
}

export class RespostaSaudeDto extends RespostaDto<SaudeDto> {
  @ApiProperty({
    type: SaudeDto,
  })
  resultado: SaudeDto;

  constructor(objeto: IResposta<ISaude>) {
    super(objeto);
  }
}
