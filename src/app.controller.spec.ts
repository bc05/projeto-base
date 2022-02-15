import { AppController } from './app.controller';
import { ISaude } from './app.interface';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    appService = new AppService();
    appController = new AppController(appService);
  });

  describe('get', () => {
    it('Deve realizar a chamada da service', () => {
      jest.spyOn(appService, 'obterVersao').mockImplementation(() => '');

      appController.get();

      expect(appService.obterVersao).toHaveBeenCalled();
    });

    it('Deve retornar um objeto com os dados de status e versão', () => {
      const resultado: ISaude = {
        status: 'ok',
        versao: '1.0.0',
      };

      jest
        .spyOn(appService, 'obterVersao')
        .mockImplementation(() => resultado.versao);

      expect(appController.get()).toMatchObject(resultado);
    });
  });
});
