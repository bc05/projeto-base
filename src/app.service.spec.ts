import { AppService } from './app.service';
import { lerArquivo } from './utils/arquivos';

jest.mock('./utils/arquivos', () => ({
  lerArquivo: jest.fn(),
}));

const mockLerArquivo = lerArquivo as jest.MockedFunction<typeof lerArquivo>;

describe('Chamada Classe: AppService', () => {
  let appService: AppService;
  beforeEach(() => {
    appService = new AppService();
  });

  describe('Chamada método: obterVersao', () => {
    it('Deve retornar a versão do aplicativo', () => {
      const resultado = '9.6.4';

      mockLerArquivo.mockImplementation(() =>
        JSON.stringify({ version: resultado }),
      );

      expect(appService.obterVersao()).toBe(resultado);
    });

    it('Deve não ser possível obter a versão e retornar uma mensagem', () => {
      mockLerArquivo.mockImplementation(() => {
        throw new Error();
      });

      expect(appService.obterVersao()).toEqual(
        'Não foi possível obter a versão do aplicativo',
      );
    });
  });
});
