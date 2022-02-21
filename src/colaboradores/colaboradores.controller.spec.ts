import { Test } from '@nestjs/testing';
import { ColaboradoresController } from './colaboradores.controller';

import { ColaboradoresService } from './colaboradores.service';

describe('ColaboradoresController', () => {
  let sut: ColaboradoresController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [ColaboradoresController],
      providers: [
        {
          provide: ColaboradoresService,
          useValue: {
            criar: jest.fn(async () => true),
          },
        },
      ],
    }).compile();

    sut = module.get<ColaboradoresController>(ColaboradoresController);
  });

  it('deve estar definido', () => {
    expect(sut).toBeDefined();
  });

  describe('criar colaboradores', () => {
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
});
