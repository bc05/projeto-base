import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { IConfiguracao, TipoConfiguracao } from './configuracao';
import { CustomValidationPipe, HttpExceptionFilter } from './core';
import { CustomLogger } from './core/logger/custom-logger';

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

  const customLogger = app.get(CustomLogger);

  app.useLogger(customLogger);

  app.useGlobalPipes(new CustomValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter(customLogger));

  iniciarSwagger(app);

  await app.listen(
    configService.get<IConfiguracao[TipoConfiguracao.API_PORT]>(
      TipoConfiguracao.API_PORT,
    ),
  );
}
bootstrap();
