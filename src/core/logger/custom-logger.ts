import { ConsoleLogger, Injectable } from '@nestjs/common';
import { GraylogTCPAdapter } from './graylog-tcp-adapter';
import { ILogErrorMessage } from './logger-adapter.interface';

@Injectable()
export class CustomLogger extends ConsoleLogger {
  constructor(private loggerAdapter: GraylogTCPAdapter) {
    super();
  }

  error(message: ILogErrorMessage | string) {
    this.loggerAdapter.error(message);
    super.error(this.getMessage(message));
  }

  private getMessage(message: ILogErrorMessage | string) {
    return typeof message === 'string' ? message : message.message;
  }
}
