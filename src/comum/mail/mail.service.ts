import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Handlebars from 'handlebars';
import { createTransport, Transporter } from 'nodemailer';
import { Address } from 'nodemailer/lib/mailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { TipoConfiguracao } from 'src/core/configuration/configuracao';
import { lerArquivo } from '../adaptadores';
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
    const text = await this.mountText(options.template, options.data);
    const html = await this.mountHtml(options.template, options.data);

    return this.transporter.sendMail({
      from: this.from,
      to: options.to,
      subject: options.subject,
      text,
      html,
    });
  }

  private async compileFile<T>(file: string, data: T): Promise<string> {
    const arquivo = await lerArquivo([__dirname, 'templates', `${file}`]);

    const templateHandlebars = Handlebars.compile(arquivo);
    return templateHandlebars(data);
  }

  private async mountText<T>(template: string, data: T): Promise<string> {
    return this.compileFile(`${template}.txt.hbs`, data);
  }

  private async mountHtml<T>(template: string, data: T): Promise<string> {
    return this.compileFile(`${template}.html.hbs`, data);
  }
}
