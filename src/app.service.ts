import { Injectable } from '@nestjs/common';

import { lerArquivo } from './comum/utils/arquivos';

@Injectable()
export class AppService {
  obterVersao(): string {
    try {
      const { version } = JSON.parse(
        lerArquivo([__dirname, '..', 'package.json']),
      );
      return version;
    } catch (_) {
      return 'Não foi possível obter a versão do aplicativo';
    }
  }
}
