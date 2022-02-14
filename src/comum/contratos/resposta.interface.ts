export interface IResposta<T> {
  mensagem?: string;
  status?: number;
  data: T;
}

export interface IRespostaPaginada<T> extends IResposta<T> {
  total: number;
  pagina: number;
}
