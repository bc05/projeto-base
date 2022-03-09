import { ConflictException, Injectable } from '@nestjs/common';
import { MailService } from 'src/comum/mail/mail.service';
import { ColaboradorDocument } from './colaborador.schema';
import { ColaboradoresRepository } from './colaboradores.repository';
import { CriarColaboradorDto } from './dtos/criar-colaborador.dto';
import { FiltrosListarColaboradoresDto } from './dtos/filtros-listar-colaboradores.dto';

@Injectable()
export class ColaboradoresService {
  constructor(
    private repository: ColaboradoresRepository,
    // private readonly eventEmitter: EventEmitter2,
    private readonly mailService: MailService,
  ) {}

  async criar(dados: CriarColaboradorDto): Promise<boolean> {
    const existeColaboradorComEmail = await this.repository.contarPorFiltros({
      email: dados.email,
    });

    if (existeColaboradorComEmail) {
      throw new ConflictException('e-mail já cadastrado.');
    }

    // const novoColaborador = await this.repository.criar(dados);

    // this.eventEmitter.emit(MemberCreatedListenerActions.CREATED, {
    //   name: novoColaborador.nome,
    // } as IMemberCreatedListenerPayload);

    this.mailService.addWelcomeMailToQueue({
      name: dados.nome,
      mail: dados.email,
    });

    // return !!novoColaborador.id;
    return true;
  }

  async listar(
    filtrosListarColaboradoresDto?: FiltrosListarColaboradoresDto,
  ): Promise<ColaboradorDocument[]> {
    return this.repository.listar();
  }
}
