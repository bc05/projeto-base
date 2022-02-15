import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';

import { AppService } from './app.service';
import { RespostaSaudeDto, SaudeDto } from './saude.dto';
import { RespostaDto } from './comum/dtos/resposta.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOkResponse({
    type: () => RespostaSaudeDto,
  })
  @Get()
  get(): RespostaDto<SaudeDto> {
    const versao = this.appService.obterVersao();

    return new RespostaDto<SaudeDto>({
      resultado: { status: 'ok', versao },
    });
  }
}
