import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { construirRespostaException } from './resposta-exception';

@Catch(Error)
export class GenericExceptionFilter implements ExceptionFilter {
  catch(_exception: Error, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const httpResponse = context.getResponse<Response>();

    httpResponse
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json(
        construirRespostaException(
          'Ocorreu um erro inesperado.',
          HttpStatus.INTERNAL_SERVER_ERROR,
        ),
      );
  }
}
