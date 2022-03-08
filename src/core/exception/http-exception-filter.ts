import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { construirRespostaException } from '..';
import { CustomLogger } from '../logger/custom-logger';
import { MensagemErroValidacao } from '../pipes';
import { HttpExceptionData } from './http-exception-data.interface';

@Catch(HttpException, Error)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: CustomLogger) {}

  catch(exception: HttpException | Error, host: ArgumentsHost) {
    const { message, statusCode, error } = this.getHttpExceptionData(exception);

    const context = host.switchToHttp();
    const httpResponse = context.getResponse<Response>();
    const httpRequest = context.getRequest<Request>();

    this.logger.error({
      message: error || message.toString(),
      status: statusCode,
      request: {
        headers: httpRequest.headers,
        body: httpRequest.body,
        url: httpRequest.url,
      },
    });

    httpResponse
      .status(statusCode)
      .json(construirRespostaException(message, statusCode));
  }

  private getHttpExceptionData(
    exception: HttpException | Error,
  ): HttpExceptionData<string | MensagemErroValidacao[]> {
    if ('getResponse' in exception) {
      return exception.getResponse() as HttpExceptionData<
        string | MensagemErroValidacao[]
      >;
    }

    return {
      message: 'Ocorreu um erro inesperado.',
      statusCode: 500,
      error: exception.message,
    };
  }
}
