import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Response } from 'express';
import { MensagemErroValidacao } from '../pipes/custom-validation-pipe';

interface CorpoUnprocessableEntityException {
  statusCode: number;
  message: MensagemErroValidacao[];
  error: string;
}

@Catch(UnprocessableEntityException)
export class UnprocessableEntityExceptionFilter implements ExceptionFilter {
  catch(exception: UnprocessableEntityException, host: ArgumentsHost) {
    const { message: mensagens, statusCode: status } =
      exception.getResponse() as CorpoUnprocessableEntityException;
    const contexto = host.switchToHttp();

    const respostaHttp = contexto.getResponse<Response>();

    respostaHttp.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
      mensagens,
      status,
    });
  }
}
