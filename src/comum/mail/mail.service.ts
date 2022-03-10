import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createTransport, Transporter } from 'nodemailer';
import { Address } from 'nodemailer/lib/mailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { TipoConfiguracao } from 'src/core/configuration/configuracao';
import { ISendMailOptions } from './mail.interface';

@Injectable()
export class MailService {
  private transporter: Transporter<SMTPTransport.SentMessageInfo>;
  private from: Address;

  constructor(private configService: ConfigService) {
    const config = {
      host: this.configService.get(TipoConfiguracao.MAIL_SMTP_HOST),
      port: this.configService.get(TipoConfiguracao.MAIL_SMTP_PORT),
      secure: false,
      auth: {
        user: this.configService.get(TipoConfiguracao.MAIL_SMTP_USER),
        pass: this.configService.get(TipoConfiguracao.MAIL_SMTP_PASSWORD),
      },
    };

    this.transporter = createTransport(config);
    this.from = {
      name: this.configService.get(TipoConfiguracao.MAIL_SMTP_FROM_NAME),
      address: this.configService.get(TipoConfiguracao.MAIL_SMTP_FROM_ADDRESS),
    };
  }

  async sendMail<T>(
    options: ISendMailOptions<T>,
  ): Promise<SMTPTransport.SentMessageInfo> {
    return this.transporter.sendMail({
      from: this.from,
      to: options.to,
      subject: options.subject,
      text: this.mountText(options.data),
      html: this.mountHtml(options.data),
    });
  }

  private mountText<T>(data: T): string {
    return 'texto aqui';
  }

  private mountHtml<T>(data: T): string {
    return '<b>html aqui</b>';
  }
}
