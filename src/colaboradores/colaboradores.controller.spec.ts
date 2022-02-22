import { Test } from '@nestjs/testing';
import { ColaboradoresController } from './colaboradores.controller';

import { ColaboradoresService } from './colaboradores.service';

describe('ColaboradoresController', () => {
  let mockColaboradoresService: ColaboradoresService;
  let sut: ColaboradoresController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [ColaboradoresController],
      providers: [
        {
          provide: ColaboradoresService,
          useValue: {
            criar: jest.fn(async () => true),
            listar: jest.fn(async () => true),
          },
        },
      ],
    }).compile();

    sut = module.get<ColaboradoresController>(ColaboradoresController);
    mockColaboradoresService =
      module.get<ColaboradoresService>(ColaboradoresService);
  });

  it('deve estar definido', () => {
    expect(sut).toBeDefined();
  });

  describe('criar', () => {
    it('deve estar definido o método', () => {
      expect(sut.criar).toBeDefined();
    });

    it('deve retornar resposta de sucesso', async () => {
      const dados = {
        nome: 'Teste',
        email: 'teste@mail.com',
      };

      const esperado = {
        mensagem: 'Colaborador criado com sucesso!',
        status: 201,
      };

      const resposta = await sut.criar(dados);
      expect(resposta).toMatchObject(esperado);
    });
  });

  describe('listar', () => {
    it('deve retornar uma lista de colaboradores', async () => {
      const esperado = {
        resultado: [
          { nome: 'Luciano Andrade', email: 'luciano.andrade@colaborador.com' },
        ],
      };

      jest
        .spyOn(mockColaboradoresService, 'listar')
        .mockResolvedValueOnce(esperado.resultado);
      const resposta = await sut.listar();

      expect(resposta).toMatchObject(esperado);
    });

    it('deve fazer a chamada da service', async () => {
      jest.spyOn(mockColaboradoresService, 'listar');

      await sut.listar();

      expect(mockColaboradoresService.listar).toHaveBeenCalled();
    });
  });
});
