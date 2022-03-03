import { Expose } from 'class-transformer';

export class FiltrosListarColaboradoresDto {
  @Expose()
  nome?: string;

  @Expose()
  email?: string;
}
