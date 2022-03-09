import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configuracao } from 'src/core/configuration/configuracao';
import { MailConsumer } from './mail.consumer';
import { MailService } from './mail.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuracao],
    }),
    BullModule.registerQueue({
      name: 'mail',
    }),
  ],
  providers: [MailService, MailConsumer],
  exports: [MailService],
})
export class MailModule {}
