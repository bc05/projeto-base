import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MailModule } from 'src/comum/mail/mail.module';
import { Colaborador, ColaboradorSchema } from './colaborador.schema';
import { ColaboradoresController } from './colaboradores.controller';
import { ColaboradoresRepository } from './colaboradores.repository';
import { ColaboradoresService } from './colaboradores.service';
import { MemberListener } from './listeners/member.listener';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Colaborador.name, schema: ColaboradorSchema },
    ]),
    MailModule,
  ],
  controllers: [ColaboradoresController],
  providers: [ColaboradoresService, ColaboradoresRepository, MemberListener],
})
export class ColaboradoresModule {}
