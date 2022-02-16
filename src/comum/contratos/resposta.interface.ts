import { HttpStatus } from '@nestjs/common';

export interface IRespostaSimples {
  mensagem: string;
  status: HttpStatus;
}
export interface IResposta<T> {
  mensagem?: string;
  status?: HttpStatus;
  resultado?: T;
}

export interface IRespostaPaginada<T> extends IResposta<T> {
  total: number;
  pagina: number;
}
