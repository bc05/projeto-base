import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { IConfiguracao, TipoConfiguracao } from './configuracao';

function iniciarSwagger(app: INestApplication): void {
  const configuracaoSwagger = new DocumentBuilder()
    .setTitle('Projeto Base')
    .setDescription('Projeto Base API descrição')
    .setVersion('1.0')
    .build();

  const documento = SwaggerModule.createDocument(app, configuracaoSwagger);
  SwaggerModule.setup('swagger', app, documento);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  iniciarSwagger(app);

  await app.listen(
    configService.get<IConfiguracao[TipoConfiguracao.PORT]>(
      TipoConfiguracao.PORT,
    ),
  );
}
bootstrap();
