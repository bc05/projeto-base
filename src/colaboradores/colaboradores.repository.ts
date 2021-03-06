import { Model } from 'mongoose';

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import {
  IRepositoryContar,
  IRepositoryCriar,
  IRepositoryListar,
} from '../comum';
import { Colaborador, ColaboradorDocument } from './colaborador.schema';
import { IContrarPorFiltros } from './contratos/contar-filtros.interface';
import { CriarColaboradorDto } from './dtos/criar-colaborador.dto';

interface IColaboradoresRepository
  extends IRepositoryCriar<CriarColaboradorDto, ColaboradorDocument>,
    IRepositoryContar<IContrarPorFiltros>,
    IRepositoryListar<any, ColaboradorDocument> {}

@Injectable()
export class ColaboradoresRepository implements IColaboradoresRepository {
  constructor(
    @InjectModel(Colaborador.name)
    private colaboradorModel: Model<ColaboradorDocument>,
  ) {}

  async contarPorFiltros(filtros: IContrarPorFiltros): Promise<number> {
    return this.colaboradorModel.countDocuments(filtros).exec();
  }

  async criar(dados: CriarColaboradorDto): Promise<ColaboradorDocument> {
    return this.colaboradorModel.create(dados);
  }

  async listar(filtros?: any): Promise<ColaboradorDocument[]> {
    return this.colaboradorModel.find();
  }
}
