import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TipoConfiguracao } from 'src/configuracao';
import * as Winston from 'winston';
import * as WinstonGraylog2 from 'winston-graylog2';
import { ILogErrorMessage, ILoggerAdapter } from './logger-adapter.interface';

@Injectable()
export class GraylogTCPAdapter implements ILoggerAdapter {
  private winstonLogger: Winston.Logger;

  constructor(private configService: ConfigService) {
    const options: WinstonGraylog2.TransportOptions = {
      graylog: {
        servers: [
          {
            host: this.configService.get(TipoConfiguracao.GRAYLOG_HOST),
            port: this.configService.get(TipoConfiguracao.GRAYLOG_PORT),
          },
        ],
        hostname: this.configService.get(TipoConfiguracao.GRAYLOG_HOSTNAME),
        facility: this.configService.get(TipoConfiguracao.GRAYLOG_FACILITY),
        bufferSize: this.configService.get(
          TipoConfiguracao.GRAYLOG_BUFFER_SIZE,
        ),
      },
    };

    this.winstonLogger = Winston.createLogger({
      format: Winston.format.combine(
        Winston.format.errors({ stack: true }),
        Winston.format.metadata(),
      ),
      transports: [new WinstonGraylog2(options)],
    });
  }

  error(message: ILogErrorMessage): void {
    this.winstonLogger.error(message);
  }
}
