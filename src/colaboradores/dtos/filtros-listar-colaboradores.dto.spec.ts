import { sanitizarObjeto } from '../../comum';
import { FiltrosListarColaboradoresDto } from './filtros-listar-colaboradores.dto';

describe('FiltrosListarColaboradoresDto', () => {
  describe.each([
    [
      { nome: 'Klebin', email: 'ebi', senha: '1q2w3e4r5t' },
      { nome: 'Klebin', email: 'ebi' },
    ],
    [
      { nome: 'Cleudnéia', email: 'dnéia', cpf: '01234' },
      { nome: 'Cleudnéia', email: 'dnéia' },
    ],
  ])('Valida saída comparando objetos', (entrada, saida) => {
    it('deve sanitizar a entrada retornando apenas os valores esperados', async () => {
      const objetoSanitizado = await sanitizarObjeto(
        FiltrosListarColaboradoresDto,
        entrada,
      );

      expect(objetoSanitizado).toEqual(saida);
    });
  });
});
