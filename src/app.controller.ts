import { Controller, Get, SerializeOptions } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';

import { AppService } from './app.service';
import { RespostaSaudeDto } from './saude.dto';
import { FabricaRepostaDto, RespostaDto } from './comum/dtos/resposta.dto';
import { Expose, plainToClass } from 'class-transformer';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOkResponse({
    type: () => RespostaSaudeDto,
  })
  @Get()
  @SerializeOptions({
    excludeExtraneousValues: true,
  })
  get() {
    const versao = this.appService.obterVersao();

    // volta da controler
    const colaboradores = [
      {
        nome: 'aaaaa',
        email: 'aaaaaaabbbb',
        senha: 'ljkmnaiwy7uyhbwayutfdygvtyreavh65',
        telefone: 'aaaaaaaa',
      },
      {
        nome: 'bbbbb',
        email: 'aaaaaaabbbb',
        senha: 'ljkmnaiwy7uyhbwayutfdygvtyreavh65',
        telefone: 'aaaaaaaa',
      },
      {
        nome: 'ccccc',
        email: 'aaaaaaabbbb',
        senha: 'ljkmnaiwy7uyhbwayutfdygvtyreavh65',
        telefone: 'aaaaaaaa',
      },
    ];

    // const respostaSerializada = plainToInstance(
    //   SaudeDto,
    //   {
    //     status: 'ok',
    //     versao,
    //   },
    //   { excludeExtraneousValues: true },
    // );

    // return new RespostaDto<ColaboradorDto[]>({
    //   resultado: colaboradoresSerializado,
    // });

    return FabricaRepostaDto.construir<ColaboradorDto>(
      ColaboradorDto,
      colaboradores,
    );
  }
}

class ColaboradorDto {
  @Expose()
  nome: string;

  @Expose()
  email: string;
}

class ListarColaboradoresDto extends RespostaDto<ColaboradorDto[]> {
  resultado: ColaboradorDto[];
}
