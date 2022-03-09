import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ColaboradoresModule } from './colaboradores/colaboradores.module';
import { BullConfigService } from './core/configuration/bull.service';
import { configuracao } from './core/configuration/configuracao';
import { MongooseConfigService } from './core/configuration/mongoose.service';
import { CustomLoggerModule } from './core/logger/custom-logger.module';

@Module({
  imports: [
    CustomLoggerModule,
    ConfigModule.forRoot({
      load: [configuracao],
    }),
    BullModule.forRootAsync({
      useClass: BullConfigService,
      imports: [ConfigModule],
    }),
    MongooseModule.forRootAsync({
      useClass: MongooseConfigService,
      imports: [ConfigModule],
    }),
    ColaboradoresModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
