import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configuracao } from 'src/core/configuration/configuracao';
import { MailQueueConsumer, MAIL_QUEUE_NAME } from './mail-queue.consumer';
import { MailQueueService } from './mail-queue.service';
import { MailService } from './mail.service';
import { WelcomeMailProcess } from './processes/welcome-mail.process';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuracao],
    }),
    BullModule.registerQueue({
      name: MAIL_QUEUE_NAME,
    }),
  ],
  providers: [
    MailQueueService,
    MailQueueConsumer,
    MailService,
    WelcomeMailProcess,
  ],
  exports: [MailQueueService],
})
export class MailModule {}
