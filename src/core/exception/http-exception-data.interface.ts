export interface HttpExceptionData<T> {
  statusCode: number;
  message: T;
  error: string;
}
