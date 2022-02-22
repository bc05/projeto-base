import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import {
  mensagemInvalido,
  mensagemObrigatorio,
} from '../../comum/mensagens-validacao';

export class CriarColaboradorDto {
  @IsString({
    message: mensagemInvalido('nome'),
  })
  @IsNotEmpty({
    message: mensagemObrigatorio('nome'),
  })
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
  email: string;
}
