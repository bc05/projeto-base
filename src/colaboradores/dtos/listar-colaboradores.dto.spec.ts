import { ListarColaboradoresDto } from './listar-colaboradores.dto';
import { plainToInstance } from 'class-transformer';
describe('ListarColaboradoresDto', () => {
  describe.each([
    [
      {
        nome: 'Antônio Nunes',
        email: 'antonio.nunes@colaborador.com',
        ramal: '255',
      },
      {
        nome: 'Antônio Nunes',
        email: 'antonio.nunes@colaborador.com',
      },
    ],
    [
      {
        id: 2,
        nome: 'Antônio Nunes',
        email: 'antonio.nunes@colaborador.com',
        endereco: 'rua 55',
        setor: 'Financeiro',
        ativo: true,
      },
      {
        nome: 'Antônio Nunes',
        email: 'antonio.nunes@colaborador.com',
      },
    ],
  ])('Valida saída comparando objetos', (objetoEntrada, objetoSaida) => {
    it('Deve retornar um colaborador', () => {
      const colaboradoresDto = plainToInstance(
        ListarColaboradoresDto,
        objetoEntrada,
        { excludeExtraneousValues: true },
      );

      expect(colaboradoresDto).toEqual(objetoSaida);
    });
  });
});
