import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { MailProcessesTypes } from '../mail-processes-types.enum';
import { MAIL_QUEUE_NAME } from '../mail-queue.consumer';
import { IDataWelcomeMail } from '../mail.interface';
import { MailService } from '../mail.service';

@Processor({ name: MAIL_QUEUE_NAME })
export class WelcomeMailProcess {
  private readonly logger = new Logger('MailConsumer');

  constructor(private mailService: MailService) {}

  @Process(MailProcessesTypes.WELCOME)
  async sendWelcomeMail(job: Job<IDataWelcomeMail>) {
    this.logger.log(
      `Initialize process from queue name: ${MailProcessesTypes.WELCOME}`,
    );

    const info = await this.mailService.sendMail<IDataWelcomeMail>({
      to: job.data.email,
      subject: `Welcome ${job.data.name} `,
      template: 'welcome',
      data: job.data,
    });

    this.logger.log(`E-mail sent ${info.accepted}`);
  }
}
