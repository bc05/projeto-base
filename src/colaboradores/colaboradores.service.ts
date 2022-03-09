import { ConflictException, Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ColaboradorDocument } from './colaborador.schema';
import { ColaboradoresRepository } from './colaboradores.repository';
import { CriarColaboradorDto } from './dtos/criar-colaborador.dto';
import { FiltrosListarColaboradoresDto } from './dtos/filtros-listar-colaboradores.dto';
import {
  IMemberCreatedListenerPayload,
  MemberCreatedListenerActions,
} from './listeners/member-created.listener';

@Injectable()
export class ColaboradoresService {
  constructor(
    private repository: ColaboradoresRepository,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async criar(dados: CriarColaboradorDto): Promise<boolean> {
    const existeColaboradorComEmail = await this.repository.contarPorFiltros({
      email: dados.email,
    });

    if (existeColaboradorComEmail) {
      throw new ConflictException('e-mail já cadastrado.');
    }

    const novoColaborador = await this.repository.criar(dados);

    this.eventEmitter.emit(MemberCreatedListenerActions.CREATED, {
      name: novoColaborador.nome,
    } as IMemberCreatedListenerPayload);

    return !!novoColaborador.id;
  }

  async listar(
    filtrosListarColaboradoresDto?: FiltrosListarColaboradoresDto,
  ): Promise<ColaboradorDocument[]> {
    return this.repository.listar();
  }
}
