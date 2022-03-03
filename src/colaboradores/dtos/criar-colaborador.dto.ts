import { Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { mensagemInvalido, mensagemObrigatorio } from '../../comum';

export class CriarColaboradorDto {
  @IsString({
    message: mensagemInvalido('nome'),
  })
  @IsNotEmpty({
    message: mensagemObrigatorio('nome'),
  })
  @Expose()
  nome: string;

  @IsNotEmpty({
    message: mensagemObrigatorio('e-mail'),
  })
  @IsEmail(
    {},
    {
      message: mensagemInvalido('e-mail'),
    },
  )
  @Expose()
  email: string;
}
