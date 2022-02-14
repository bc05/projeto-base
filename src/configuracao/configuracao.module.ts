import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { configuracao } from './configuracao';

import { MongooseConfigService } from './mongoose.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuracao],
    }),
    MongooseModule.forRootAsync({
      useClass: MongooseConfigService,
      imports: [ConfigModule],
      inject: [ConfigService],
    }),
  ],
  providers: [MongooseConfigService],
})
export class ConfiguracaoModule {}
