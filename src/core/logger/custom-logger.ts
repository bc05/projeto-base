import { ConsoleLogger } from '@nestjs/common';
import { createLogger } from 'winston';
import * as WinstonGraylog2 from 'winston-graylog2';

export class CustomLogger extends ConsoleLogger {
  error(message: any, ...optionalParams: any[]) {
    const options: WinstonGraylog2.TransportOptions = {
      graylog: {
        servers: [
          {
            host: '127.0.0.1',
            port: 12201,
          },
        ],
        hostname: 'Local',
        facility: '[Projeto X]',
        bufferSize: 1400,
      },
    };

    const logger = createLogger({
      transports: [new WinstonGraylog2(options)],
    });

    logger.error({ message });

    super.error(message);
  }
}
