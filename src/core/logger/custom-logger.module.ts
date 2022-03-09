import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configuracao } from '../configuration/configuracao';
import { CustomLogger } from './custom-logger';
import { GraylogTCPAdapter } from './graylog-tcp-adapter';

export const LOGGER_ADAPTER = Symbol('LOGGER_ADAPTER');

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuracao],
    }),
  ],
  providers: [GraylogTCPAdapter, CustomLogger],
  exports: [CustomLogger],
})
export class CustomLoggerModule {}
