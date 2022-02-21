import { Model } from 'mongoose';
import {
  IRepositoryContar,
  IRepositoryCriar,
} from 'src/comum/contratos/repository.interface';

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Colaborador, ColaboradorDocumento } from './colaborador.schema';
import { IContrarPorFiltros } from './contar-filtros.interface';
import { CriarColaboradorDto } from './criar-colaborador.dto';

interface IColaboradoresRepository
  extends IRepositoryCriar<CriarColaboradorDto, ColaboradorDocumento>,
    IRepositoryContar<IContrarPorFiltros> {}

@Injectable()
export class ColaboradoresRepository implements IColaboradoresRepository {
  constructor(
    @InjectModel(Colaborador.name)
    private colaboradorModel: Model<ColaboradorDocumento>,
  ) {}

  async contarPorFiltros(filtros: IContrarPorFiltros): Promise<number> {
    return this.colaboradorModel.countDocuments(filtros).exec();
  }

  async criar(dados: CriarColaboradorDto): Promise<ColaboradorDocumento> {
    return this.colaboradorModel.create(dados);
  }
}
