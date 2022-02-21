import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { CriarColaboradorDto } from './criar-colaborador.dto';

describe('CriarColaboradorDto', () => {
  describe.each([
    [{ nome: 'Klebin', email: 'klebersson.com' }, 1],
    [{ nome: 22, email: 'mail@mail.com' }, 1],
  ])(
    'Validar os objeto: %s com quantidade de erros: %s',
    (objeto, totalErrosEsperados) => {
      it('deve ser inválido', async () => {
        const sut = plainToInstance(CriarColaboradorDto, objeto);
        const erros = await validate(sut);

        expect(erros).toHaveLength(totalErrosEsperados);
      });
    },
  );
});
