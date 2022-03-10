import {
  OnQueueActive,
  OnQueueCompleted,
  OnQueueError,
  Process,
  Processor,
} from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { IDataWelcomeMail } from './mail.interface';

export const MAIL_QUEUE_NAME = 'mail';

export enum EmailProcessTypes {
  WELCOME = 'welcome',
}

@Processor({ name: MAIL_QUEUE_NAME })
export class MailQueueConsumer {
  private readonly logger = new Logger('MailConsumer');

  @OnQueueActive()
  onActive() {
    this.logger.log(`Queue ${EmailProcessTypes.WELCOME} active`);
  }

  @OnQueueError()
  onError() {
    this.logger.error('queue error');
  }

  @OnQueueCompleted()
  onCompleted() {
    this.logger.log(
      `Completed process from queue name: ${EmailProcessTypes.WELCOME}`,
    );
  }

  @Process(EmailProcessTypes.WELCOME)
  sendWelcomeMail(job: Job<IDataWelcomeMail>) {
    this.logger.log(
      `Initialize process from queue name: ${EmailProcessTypes.WELCOME}`,
    );

    // send mail here xD
    console.log(job.data.nome);
    return true;
  }
}
