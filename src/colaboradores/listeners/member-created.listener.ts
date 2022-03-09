import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

export interface IMemberCreatedListenerPayload {
  name: string;
}

export enum MemberCreatedListenerActions {
  CREATED = 'member.created',
}

@Injectable()
export class MemberCreatedListener {
  @OnEvent(MemberCreatedListenerActions.CREATED)
  handleMemberCreatedEvent(payload: IMemberCreatedListenerPayload) {
    console.log(`member ${payload.name} created sucessfull`);
  }
}
