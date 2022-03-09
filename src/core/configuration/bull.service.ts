import { SharedBullConfigurationFactory } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { QueueOptions } from 'bull';
import { TipoConfiguracao } from './configuracao';

@Injectable()
export class BullConfigService implements SharedBullConfigurationFactory {
  constructor(private readonly configService: ConfigService) {}

  createSharedConfiguration(): QueueOptions | Promise<QueueOptions> {
    return {
      redis: {
        host: this.configService.get(TipoConfiguracao.REDIS_HOST),
        port: +this.configService.get(TipoConfiguracao.REDIS_PORT),
      },
    };
  }
}
