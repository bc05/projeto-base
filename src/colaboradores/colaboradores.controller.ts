/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, Controller, HttpStatus } from '@nestjs/common';
import { RespostaSimplesDto } from '../comum/dtos/resposta.dto';
import { mensagemResposta, TipoOperacaoCRUD } from '../comum/mensagens';

import { CriarColaboradorDto } from './criar-colaborador.dto';

@Controller('colaboradores') // pegar do schema?
export class ColaboradoresController {
  criar(@Body() criarColaboradorDto: CriarColaboradorDto) {
    return new RespostaSimplesDto({
      mensagem: mensagemResposta('Colaborador', TipoOperacaoCRUD.CRIAR),
      status: HttpStatus.CREATED,
    });
  }
}
