import { Document } from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type ColaboradorDocument = Colaborador & Document;

export const nomeColaboradoresSchema = 'colaboradores';

@Schema({
  collection: nomeColaboradoresSchema,
})
export class Colaborador {
  @Prop({ required: true })
  nome: string;

  @Prop({ required: true })
  email: string;
}

export const ColaboradorSchema = SchemaFactory.createForClass(Colaborador);
