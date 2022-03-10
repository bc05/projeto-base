import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { MailProcessesTypes } from 'src/comum/mail/mail-processes-types.enum';
import { MailQueueProducer } from 'src/comum/mail/mail-queue.producer';
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
  constructor(private readonly mailQueueProducer: MailQueueProducer) {}

  @OnEvent(MemberListenerActions.CREATED)
  handleMemberCreatedEvent(data: IMemberCreatedListenerData) {
    this.mailQueueProducer.addMailToQueue<IDataWelcomeMail>(
      MailProcessesTypes.WELCOME,
      {
        name: data.name,
        email: data.email,
      },
    );
  }
}
