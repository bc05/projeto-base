import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { EmailProcessTypes } from 'src/comum/mail/mail-queue.consumer';
import { MailQueueService } from 'src/comum/mail/mail-queue.service';
import { IDataWelcomeMail } from 'src/comum/mail/mail.interface';

export interface IMemberCreatedListenerData {
  name: string;
  email: string;
}

export enum MemberListenerActions {
  CREATED = 'member.created',
}

@Injectable()
export class MemberListener {
  constructor(private readonly mailService: MailQueueService) {}

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
