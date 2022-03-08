import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ColaboradoresModule } from './colaboradores/colaboradores.module';
import { configuracao } from './configuracao';
import { CustomLoggerModule } from './core/logger/custom-logger.module';
import { MongooseConfigService } from './mongoose.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuracao],
    }),
    CustomLoggerModule,
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
