import {
  OnQueueActive,
  OnQueueCompleted,
  OnQueueError,
  Process,
  Processor,
} from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';

@Processor('mail')
export class MailConsumer {
  private readonly logger = new Logger('MailConsumer');

  @OnQueueActive()
  onActive() {
    this.logger.log('Queue active');
  }

  @OnQueueError()
  onError() {
    this.logger.error('queue error');
  }

  @OnQueueCompleted()
  onCompleted() {
    this.logger.log('Queue completed');
  }

  @Process('welcome')
  sendMail(job: Job) {
    this.logger.log('already to send mail :)', job.data);

    // throw new InternalServerErrorException('deu tudo errado');
    // throw Error('deu tudo errado');

    return true;
  }
}
