import { ConflictException, Injectable } from '@nestjs/common';
import { ColaboradorDocument } from './colaborador.schema';
import { ColaboradoresRepository } from './colaboradores.repository';

import { CriarColaboradorDto } from './dtos/criar-colaborador.dto';

@Injectable()
export class ColaboradoresService {
  constructor(private repository: ColaboradoresRepository) {}

  async criar(dados: CriarColaboradorDto): Promise<boolean> {
    const existeColaboradorComEmail = await this.repository.contarPorFiltros({
      email: dados.email,
    });

    if (existeColaboradorComEmail) {
      throw new ConflictException('e-mail já cadastrado.');
    }

    const novoColaborador = await this.repository.criar(dados);

    return !!novoColaborador.id;
  }

  async listar(): Promise<ColaboradorDocument[]> {
    return this.repository.listar();
  }
}
