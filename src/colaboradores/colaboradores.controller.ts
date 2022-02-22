import { ListarColaboradoresDto } from './dtos/listar-colaboradores.dto';
import { Body, Controller, Get, HttpStatus, Post } from '@nestjs/common';

import {
  construirRespostaColecaoDto,
  construirRespostaSimplesDto,
} from '../comum/dtos/resposta.dto';
import { mensagemResposta, TipoOperacaoCRUD } from '../comum/mensagens';
import { nomeColaboradoresSchema } from './colaborador.schema';
import { ColaboradoresService } from './colaboradores.service';
import { CriarColaboradorDto } from './dtos/criar-colaborador.dto';

@Controller(nomeColaboradoresSchema)
export class ColaboradoresController {
  constructor(private service: ColaboradoresService) {}

  @Post()
  async criar(@Body() criarColaboradorDto: CriarColaboradorDto) {
    await this.service.criar(criarColaboradorDto);

    return construirRespostaSimplesDto({
      mensagem: mensagemResposta('Colaborador', TipoOperacaoCRUD.CRIAR),
      status: HttpStatus.CREATED,
    });
  }

  @Get()
  async listar() {
    const resultado = await this.service.listar();

    return construirRespostaColecaoDto(ListarColaboradoresDto, resultado);
  }
}
