import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';

import { ISaude } from './app.interface';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOkResponse()
  @Get()
  get(): ISaude {
    const versao = this.appService.obterVersao();

    return {
      status: 'ok',
      versao,
    };
  }
}
