import { parse } from 'ini';
import { lerArquivo } from '../../comum';

export interface IConfiguracao {
  [TipoConfiguracao.API_PORT]: number;

  [TipoConfiguracao.MONGO_URI]: string;

  [TipoConfiguracao.GRAYLOG_FACILITY]: string;
  [TipoConfiguracao.GRAYLOG_HOSTNAME]: string;
  [TipoConfiguracao.GRAYLOG_HOST]: string;
  [TipoConfiguracao.GRAYLOG_PORT]: string;
  [TipoConfiguracao.GRAYLOG_BUFFER_SIZE]: string;

  [TipoConfiguracao.REDIS_HOST]: string;
  [TipoConfiguracao.REDIS_PORT]: number;

  [TipoConfiguracao.MAIL_SMTP_HOST]: string;
  [TipoConfiguracao.MAIL_SMTP_PORT]: number;
  [TipoConfiguracao.MAIL_SMTP_USER]: string;
  [TipoConfiguracao.MAIL_SMTP_PASSWORD]: string;
  [TipoConfiguracao.MAIL_SMTP_FROM_NAME]: string;
  [TipoConfiguracao.MAIL_SMTP_FROM_ADDRESS]: string;
}

export enum TipoConfiguracao {
  API_PORT = 'API_PORT',

  MONGO_USERNAME = 'MONGO_USERNAME',
  MONGO_PASSWORD = 'MONGO_PASSWORD',
  MONGO_HOST = 'MONGO_HOST',
  MONGO_PORT = 'MONGO_PORT',
  MONGO_DATABASE = 'MONGO_DATABASE',
  MONGO_URI = 'MONGO_URI',

  GRAYLOG_FACILITY = 'GRAYLOG_FACILITY',
  GRAYLOG_HOSTNAME = 'GRAYLOG_HOSTNAME',
  GRAYLOG_HOST = 'GRAYLOG_HOST',
  GRAYLOG_PORT = 'GRAYLOG_PORT',
  GRAYLOG_BUFFER_SIZE = 'GRAYLOG_BUFFER_SIZE',

  REDIS_PORT = 'REDIS_PORT',
  REDIS_HOST = 'REDIS_HOST',

  MAIL_SMTP_HOST = 'MAIL_SMTP_HOST',
  MAIL_SMTP_PORT = 'MAIL_SMTP_PORT',
  MAIL_SMTP_USER = 'MAIL_SMTP_USER',
  MAIL_SMTP_PASSWORD = 'MAIL_SMTP_PASSWORD',
  MAIL_SMTP_FROM_NAME = 'MAIL_SMTP_FROM_NAME',
  MAIL_SMTP_FROM_ADDRESS = 'MAIL_SMTP_FROM_ADDRESS',
}

export const configuracao = (): IConfiguracao => {
  const arquivoVariaveis = parse(
    lerArquivo([__dirname, '..', '..', 'variaveis.ini']),
  );

  const mongoUri = `mongodb://${
    arquivoVariaveis[TipoConfiguracao.MONGO_USERNAME]
  }:${arquivoVariaveis[TipoConfiguracao.MONGO_PASSWORD]}@${
    arquivoVariaveis[TipoConfiguracao.MONGO_HOST]
  }:${arquivoVariaveis[TipoConfiguracao.MONGO_PORT]}/${
    arquivoVariaveis[TipoConfiguracao.MONGO_DATABASE]
  }?authSource=admin
  `;

  return {
    [TipoConfiguracao.API_PORT]: arquivoVariaveis[TipoConfiguracao.API_PORT],
    [TipoConfiguracao.MONGO_URI]: mongoUri,
    [TipoConfiguracao.GRAYLOG_FACILITY]:
      arquivoVariaveis[TipoConfiguracao.GRAYLOG_FACILITY],
    [TipoConfiguracao.GRAYLOG_HOSTNAME]:
      arquivoVariaveis[TipoConfiguracao.GRAYLOG_HOSTNAME],
    [TipoConfiguracao.GRAYLOG_HOST]:
      arquivoVariaveis[TipoConfiguracao.GRAYLOG_HOST],
    [TipoConfiguracao.GRAYLOG_PORT]:
      arquivoVariaveis[TipoConfiguracao.GRAYLOG_PORT],
    [TipoConfiguracao.GRAYLOG_BUFFER_SIZE]:
      arquivoVariaveis[TipoConfiguracao.GRAYLOG_BUFFER_SIZE],
    [TipoConfiguracao.REDIS_HOST]:
      arquivoVariaveis[TipoConfiguracao.REDIS_HOST],
    [TipoConfiguracao.REDIS_PORT]:
      arquivoVariaveis[TipoConfiguracao.REDIS_PORT],
    [TipoConfiguracao.MAIL_SMTP_HOST]:
      arquivoVariaveis[TipoConfiguracao.MAIL_SMTP_HOST],
    [TipoConfiguracao.MAIL_SMTP_PORT]:
      arquivoVariaveis[TipoConfiguracao.MAIL_SMTP_PORT],
    [TipoConfiguracao.MAIL_SMTP_USER]:
      arquivoVariaveis[TipoConfiguracao.MAIL_SMTP_USER],
    [TipoConfiguracao.MAIL_SMTP_PASSWORD]:
      arquivoVariaveis[TipoConfiguracao.MAIL_SMTP_PASSWORD],
    [TipoConfiguracao.MAIL_SMTP_FROM_NAME]:
      arquivoVariaveis[TipoConfiguracao.MAIL_SMTP_FROM_NAME],
    [TipoConfiguracao.MAIL_SMTP_FROM_ADDRESS]:
      arquivoVariaveis[TipoConfiguracao.MAIL_SMTP_FROM_ADDRESS],
  };
};
