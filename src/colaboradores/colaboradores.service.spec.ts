import { getModelToken } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { Model } from 'mongoose';
import { Colaborador, ColaboradorDocument } from './colaborador.schema';
import { ColaboradoresController } from './colaboradores.controller';
import { ColaboradoresRepository } from './colaboradores.repository';
import { ColaboradoresService } from './colaboradores.service';

describe('ColaboradoresService', () => {
  let mockColaboradorModel: Model<ColaboradorDocument>;
  let mockColaboradorRepository: ColaboradoresRepository;
  let sut: ColaboradoresService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [ColaboradoresController],
      providers: [
        ColaboradoresService,
        {
          provide: getModelToken(Colaborador.name),
          useValue: Model,
        },
        ColaboradoresRepository,
      ],
    }).compile();

    mockColaboradorModel = module.get<Model<ColaboradorDocument>>(
      getModelToken(Colaborador.name),
    );
    mockColaboradorRepository = module.get<ColaboradoresRepository>(
      ColaboradoresRepository,
    );
    sut = module.get<ColaboradoresService>(ColaboradoresService);
  });

  const dados = {
    nome: 'Pessoa',
    email: 'pessoa@mail.com',
  };

  describe('criar', () => {
    it('deve retornar sucesso', async () => {
      const colaborador = {
        id: '123123',
        nome: 'noix',
        email: 'noix@mail.com',
      };
      jest
        .spyOn(mockColaboradorRepository, 'criar')
        .mockResolvedValueOnce(colaborador as ColaboradorDocument);

      jest
        .spyOn(mockColaboradorRepository, 'contarPorFiltros')
        .mockResolvedValueOnce(0);

      const resposta = await sut.criar(dados);

      expect(resposta).toBeTruthy();
    });

    it('deve retornar exceção de e-mail em uso', async () => {
      jest
        .spyOn(mockColaboradorRepository, 'contarPorFiltros')
        .mockResolvedValueOnce(1);

      await expect(() => sut.criar(dados)).rejects.toThrow(
        'e-mail já cadastrado.',
      );
    });

    it('deve fazer chamada do repository usando os parâmetros corretos', async () => {
      const colaborador = {
        id: '123123',
        nome: 'noix',
        email: 'noix@mail.com',
      };
      jest
        .spyOn(mockColaboradorRepository, 'criar')
        .mockResolvedValueOnce(colaborador as ColaboradorDocument);
      jest
        .spyOn(mockColaboradorRepository, 'contarPorFiltros')
        .mockResolvedValueOnce(0);

      jest.spyOn(mockColaboradorRepository, 'criar');

      await sut.criar(dados);

      expect(mockColaboradorRepository.criar).toHaveBeenCalledWith(dados);
    });
  });
});
