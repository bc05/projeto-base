import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';
import { construirRespostaObjetoDto, RespostaDto } from './comum';
import { SaudeDto } from './saude.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  get(): RespostaDto<SaudeDto> {
    const versao = this.appService.obterVersao();

    return construirRespostaObjetoDto<SaudeDto>(SaudeDto, {
      status: 'ok',
      versao,
    });
  }
}
