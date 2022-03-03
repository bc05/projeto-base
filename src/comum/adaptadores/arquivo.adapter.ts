import { readFileSync } from 'fs';
import { join } from 'path';

export function lerArquivo(
  caminho: string[],
  formato: BufferEncoding = 'utf8',
): string {
  return readFileSync(join(...caminho), formato);
}
