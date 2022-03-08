import { parse } from 'ini';
import { lerArquivo } from './comum';

export interface IConfiguracao {
  [TipoConfiguracao.API_PORT]: number;

  [TipoConfiguracao.MONGO_URI]: string;

  [TipoConfiguracao.GRAYLOG_FACILITY]: string;
  [TipoConfiguracao.GRAYLOG_HOSTNAME]: string;
  [TipoConfiguracao.GRAYLOG_HOST]: string;
  [TipoConfiguracao.GRAYLOG_PORT]: string;
  [TipoConfiguracao.GRAYLOG_BUFFER_SIZE]: string;
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
}

export const configuracao = (): IConfiguracao => {
  const arquivoVariaveis = parse(lerArquivo([__dirname, 'variaveis.ini']));

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
  };
};
