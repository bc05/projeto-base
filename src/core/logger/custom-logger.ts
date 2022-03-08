import { ConsoleLogger, Injectable } from '@nestjs/common';
import { GraylogTCPAdapter } from './graylog-tcp-adapter';
import { ILogErrorMessage } from './logger-adapter.interface';

@Injectable()
export class CustomLogger extends ConsoleLogger {
  constructor(private loggerAdapter: GraylogTCPAdapter) {
    super();
  }

  error(message: ILogErrorMessage) {
    this.loggerAdapter.error(message);
    super.error(message.message);
  }
}
