import { Document } from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type ColaboradorDocumento = Colaborador & Document;

@Schema()
export class Colaborador {
  @Prop({ required: true })
  nome: string;

  @Prop({ required: true })
  email: string;
}

export const ColaboradorSchema = SchemaFactory.createForClass(Colaborador);
