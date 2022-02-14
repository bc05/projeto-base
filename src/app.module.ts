import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfiguracaoModule } from './configuracao/configuracao.module';

@Module({
  imports: [ConfiguracaoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
