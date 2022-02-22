import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class SaudeDto {
  @ApiProperty({
    description: 'Versão do sistema',
    example: '1.0.0',
  })
  @Expose()
  versao: string;

  @ApiProperty({
    description: 'Status do sistema',
    example: 'ok',
  })
  @Expose()
  status: string;
}
