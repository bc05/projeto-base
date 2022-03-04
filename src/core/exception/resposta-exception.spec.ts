import { construirRespostaException } from './resposta-exception';

describe('RespostaException', () => {
  describe('construirRespostaException', () => {
    it('deve retornar o objeto de resposta apenas com a mensagem', () => {
      const mensagem = 'Já existe um colaborador com o email cadastrado';
      const status = 409;

      const resultado = {
        mensagens: [
          {
            mensagem,
          },
        ],
        status,
      };

      const resposta = construirRespostaException(mensagem, status);

      expect(resposta).toEqual(resultado);
    });

    it('deve retornar o objeto de resposta com todas as mensagens de validação', () => {
      const mensagens = [
        {
          mensagem: 'Email inválido',
          campo: 'email',
        },
        {
          mensagem: 'O campo nome é obrigatório',
          campo: 'nome',
        },
      ];

      const status = 422;

      const resultado = {
        mensagens,
        status,
      };

      const resposta = construirRespostaException(mensagens, status);

      expect(resposta).toEqual(resultado);
    });
  });
});
