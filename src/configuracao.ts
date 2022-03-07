import { parse } from 'ini';
import { lerArquivo } from './comum';

export interface IConfiguracao {
  [TipoConfiguracao.API_PORT]: number;
  [TipoConfiguracao.MONGO_URI]: string;
}

export enum TipoConfiguracao {
  API_PORT = 'API_PORT',
  MONGO_USERNAME = 'MONGO_USERNAME',
  MONGO_PASSWORD = 'MONGO_PASSWORD',
  MONGO_HOST = 'MONGO_HOST',
  MONGO_PORT = 'MONGO_PORT',
  MONGO_DATABASE = 'MONGO_DATABASE',
  MONGO_URI = 'MONGO_URI',
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
  };
};
