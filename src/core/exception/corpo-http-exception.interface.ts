export interface CorpoHttpException<T> {
  statusCode: number;
  message: T;
  error: string;
}
