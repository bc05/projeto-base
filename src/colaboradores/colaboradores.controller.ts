import { Body, Controller, Get, HttpStatus, Post, Query } from '@nestjs/common';
import {
  construirRespostaColecaoDto,
  construirRespostaSimplesDto,
  mensagemResposta,
  TipoOperacaoCRUD,
} from '../comum';
import { nomeColaboradoresSchema } from './colaborador.schema';
import { ColaboradoresService } from './colaboradores.service';
import { CriarColaboradorDto } from './dtos/criar-colaborador.dto';
import { FiltrosListarColaboradoresDto } from './dtos/filtros-listar-colaboradores.dto';
import { ListarColaboradoresDto } from './dtos/listar-colaboradores.dto';

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
  async listar(
    @Query() filtrosListarColaboradoresDto?: FiltrosListarColaboradoresDto,
  ) {
    const resultado = await this.service.listar(filtrosListarColaboradoresDto);

    return construirRespostaColecaoDto(ListarColaboradoresDto, resultado);
  }
}
