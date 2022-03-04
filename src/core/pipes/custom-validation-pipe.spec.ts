import { Allow, IsEmail, IsNotEmpty } from 'class-validator';
import { validarObjeto } from '../../comum';
import { tratamentoErrosValidacao } from '..';

class TesteDto {
  @IsNotEmpty({ message: 'É obrigatório' })
  @IsEmail({}, { message: 'Deve ser um email' })
  @Allow()
  email: string;
}

describe('CustomValidationPipe', () => {
  describe('tratamentoErrosValidacao', () => {
    it('deve retornar os erros tratados', async () => {
      const objetoSimples = {
        email: '',
      };

      const erros = await validarObjeto(TesteDto, objetoSimples);
      const errosTratados = tratamentoErrosValidacao(erros);

      expect(errosTratados).toContainEqual({
        mensagem: 'É obrigatório',
        campo: 'email',
      });

      expect(errosTratados).toContainEqual({
        mensagem: 'Deve ser um email',
        campo: 'email',
      });
    });
  });
});
