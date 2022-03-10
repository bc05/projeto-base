import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { EmailProcessTypes } from 'src/comum/mail/mail.consumer';
import { IDataWelcomeMail } from 'src/comum/mail/mail.interface';
import { MailService } from 'src/comum/mail/mail.service';

export interface IMemberCreatedListenerData {
  name: string;
  email: string;
}

export enum MemberListenerActions {
  CREATED = 'member.created',
}

@Injectable()
export class MemberListener {
  constructor(private readonly mailService: MailService) {}

  @OnEvent(MemberListenerActions.CREATED)
  handleMemberCreatedEvent(data: IMemberCreatedListenerData) {
    this.mailService.addMailToQueue<IDataWelcomeMail>(
      EmailProcessTypes.WELCOME,
      {
        nome: data.name,
        email: data.email,
      },
    );
  }
}
