import { converterObjetoEmClasse } from '../../comum';
import { FiltrosListarColaboradoresDto } from './filtros-listar-colaboradores.dto';

describe('FiltrosListarColaboradoresDto', () => {
  describe.each([[{ nome: 'testando', senha: 'senha' }, { nome: 'testando' }]])(
    'Valida saída comparando objetos',
    (entrada, saida) => {
      it('deve sanitizar a entrada retornando apenas os valores esperados', () => {
        const filtrosListarColaboradoresDto = converterObjetoEmClasse(
          FiltrosListarColaboradoresDto,
          entrada,
        );

        expect(filtrosListarColaboradoresDto).toEqual(saida);
      });
    },
  );
});
