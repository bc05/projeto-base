import { ColaboradoresController } from './colaboradores.controller';

describe('ColaboradoresController', () => {
  let controller: ColaboradoresController;

  beforeEach(() => {
    controller = new ColaboradoresController();
  });

  it('deve estar definido', () => {
    expect(controller).toBeDefined();
  });

  describe('criar colaboradores', () => {
    it('deve estar definido o método', () => {
      expect(controller.criar).toBeDefined();
    });

    it('deve retornar resposta de sucesso', () => {
      const dados = {
        nome: 'Teste',
        email: 'teste@mail.com',
      };

      const esperado = {
        mensagem: 'Colaborador criado com sucesso!',
        status: 201,
      };

      expect(controller.criar(dados)).toMatchObject(esperado);
    });
  });
});
