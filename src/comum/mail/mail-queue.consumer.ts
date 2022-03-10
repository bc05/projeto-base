import {
  OnQueueActive,
  OnQueueCompleted,
  OnQueueError,
  OnQueueFailed,
  Processor,
} from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';

export const MAIL_QUEUE_NAME = 'mail';

@Processor({ name: MAIL_QUEUE_NAME })
export class MailQueueConsumer {
  private readonly logger = new Logger('MailConsumer');

  @OnQueueActive()
  onActive() {
    this.logger.log(`Queue ${MAIL_QUEUE_NAME} active`);
  }

  @OnQueueError()
  onError(job: Job) {
    console.debug(job);
    this.logger.error('queue error');
  }

  @OnQueueFailed()
  onFail(job: Job) {
    console.debug(job);
    this.logger.error('queue fail');
  }

  @OnQueueCompleted()
  onCompleted() {
    this.logger.log(`Completed process from queue name: ${MAIL_QUEUE_NAME}`);
  }
}
