import { readFileSync } from 'fs';
import { parse } from 'ini';
import { join } from 'path';

export interface IConfiguracao {
  [TipoConfiguracao.PORT]: number;
  [TipoConfiguracao.MONGODB_URI]: string;
}

export enum TipoConfiguracao {
  PORT = 'port',
  MONGODB_URI = 'mongodb_uri',
}

export const configuracao = (): IConfiguracao => {
  const caminhoArquivo = join(__dirname, 'variaveis.ini');
  const arquivoVariaveis = parse(readFileSync(caminhoArquivo, 'utf-8'));

  return {
    [TipoConfiguracao.PORT]: arquivoVariaveis[TipoConfiguracao.PORT],
    [TipoConfiguracao.MONGODB_URI]:
      arquivoVariaveis[TipoConfiguracao.MONGODB_URI],
  };
};
