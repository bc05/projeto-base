import { Allow } from 'class-validator';

export class FiltrosListarColaboradoresDto {
  @Allow()
  nome?: string;

  @Allow()
  email?: string;
}
