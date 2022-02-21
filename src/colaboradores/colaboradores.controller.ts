/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { RespostaSimplesDto } from '../comum/dtos/resposta.dto';
import { mensagemResposta, TipoOperacaoCRUD } from '../comum/mensagens';
import { ColaboradoresService } from './colaboradores.service';

import { CriarColaboradorDto } from './criar-colaborador.dto';

@Controller('colaboradores') // pegar do schema?
export class ColaboradoresController {
  constructor(private service: ColaboradoresService) {}

  @Post()
  async criar(@Body() criarColaboradorDto: CriarColaboradorDto) {
    await this.service.criar(criarColaboradorDto);
    return new RespostaSimplesDto({
      mensagem: mensagemResposta('Colaborador', TipoOperacaoCRUD.CRIAR),
      status: HttpStatus.CREATED,
    });
  }
}
