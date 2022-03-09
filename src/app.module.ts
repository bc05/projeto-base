import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ColaboradoresModule } from './colaboradores/colaboradores.module';
import { configuracao } from './core/configuration/configuracao';
import { MongooseConfigService } from './core/configuration/mongoose.service';
import { CustomLoggerModule } from './core/logger/custom-logger.module';

@Module({
  imports: [
    CustomLoggerModule,
    ConfigModule.forRoot({
      load: [configuracao],
    }),
    MongooseModule.forRootAsync({
      useClass: MongooseConfigService,
      imports: [ConfigModule],
    }),
    EventEmitterModule.forRoot(),
    ColaboradoresModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
