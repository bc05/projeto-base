import { Expose } from 'class-transformer';

export class ListarColaboradoresDto {
  @Expose()
  nome: string;

  @Expose()
  email: string;
}
