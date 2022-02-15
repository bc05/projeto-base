import { parse } from 'ini';

import { lerArquivo } from './utils/arquivos';

export interface IConfiguracao {
  [TipoConfiguracao.PORT]: number;
  [TipoConfiguracao.MONGODB_URI]: string;
}

export enum TipoConfiguracao {
  PORT = 'port',
  MONGODB_URI = 'mongodb_uri',
}

export const configuracao = (): IConfiguracao => {
  const arquivoVariaveis = parse(lerArquivo([__dirname, 'variaveis.ini']));

  return {
    [TipoConfiguracao.PORT]: arquivoVariaveis[TipoConfiguracao.PORT],
    [TipoConfiguracao.MONGODB_URI]:
      arquivoVariaveis[TipoConfiguracao.MONGODB_URI],
  };
};
