import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { construirRespostaException } from '..';
import { MensagemErroValidacao } from '../pipes';
import { CorpoHttpException } from './corpo-http-exception.interface';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const { message, statusCode } =
      exception.getResponse() as CorpoHttpException<
        string | MensagemErroValidacao[]
      >;

    const contexto = host.switchToHttp();
    const respostaHttp = contexto.getResponse<Response>();

    respostaHttp
      .status(statusCode)
      .json(construirRespostaException(message, statusCode));
  }
}
