import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Colaborador, ColaboradorSchema } from './colaborador.schema';
import { ColaboradoresController } from './colaboradores.controller';
import { ColaboradoresRepository } from './colaboradores.repository';
import { ColaboradoresService } from './colaboradores.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Colaborador.name, schema: ColaboradorSchema },
    ]),
  ],
  controllers: [ColaboradoresController],
  providers: [ColaboradoresService, ColaboradoresRepository],
})
export class ColaboradoresModule {}
