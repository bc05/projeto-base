import { InjectQueue } from '@nestjs/bull';
import { Injectable, Logger } from '@nestjs/common';
import { Queue } from 'bull';
import { EmailProcessTypes, MAIL_QUEUE_NAME } from './mail.consumer';

@Injectable()
export class MailService {
  private readonly logger = new Logger('MailConsumer');

  constructor(
    @InjectQueue(MAIL_QUEUE_NAME) private readonly mailQueue: Queue,
  ) {}

  addMailToQueue<T>(queueName: EmailProcessTypes, data: T) {
    this.logger.log(`Add email in queue: ${queueName}`);
    this.mailQueue.add(queueName, data, {
      removeOnComplete: true,
    });
  }
}
