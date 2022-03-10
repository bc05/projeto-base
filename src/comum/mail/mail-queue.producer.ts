import { InjectQueue } from '@nestjs/bull';
import { Injectable, Logger } from '@nestjs/common';
import { Queue } from 'bull';
import { MailProcessesTypes } from './mail-processes-types.enum';
import { MAIL_QUEUE_NAME } from './mail-queue.consumer';

@Injectable()
export class MailQueueProducer {
  private readonly logger = new Logger('MailConsumer');

  constructor(
    @InjectQueue(MAIL_QUEUE_NAME) private readonly mailQueue: Queue,
  ) {}

  addMailToQueue<T>(queueName: MailProcessesTypes, data: T) {
    this.logger.log(`Add email in queue: ${queueName}`);
    this.mailQueue.add(queueName, data);
  }
}
