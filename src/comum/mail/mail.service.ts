import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

@Injectable()
export class MailService {
  constructor(@InjectQueue('mail') private mailQueue: Queue) {}

  async addWelcomeMailToQueue(data: any) {
    console.log('add task send welcome mail to queue');
    await this.mailQueue.add('welcome', data, {
      delay: 5000,
      removeOnComplete: true,
      backoff: 1,
    });
  }
}
