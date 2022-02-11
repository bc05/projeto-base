import { readFileSync } from 'fs';
import { parse } from 'ini';
import { join } from 'path';

export interface IConfiguracao {
  [Configuracao.PORT]: number;
}

export enum Configuracao {
  PORT = 'port',
}

export default (): IConfiguracao => {
  const caminhoArquivo = join(__dirname, '..', 'variaveis.ini');
  const arquivoVariaveis = parse(readFileSync(caminhoArquivo, 'utf-8'));

  return {
    [Configuracao.PORT]: arquivoVariaveis[Configuracao.PORT],
  };
};
