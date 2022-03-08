import { IncomingHttpHeaders } from 'http';

export interface ILogErrorMessage {
  message: string;
  status: number;
  request: ILogHttpRequest;
}

export interface ILogHttpRequest {
  headers: IncomingHttpHeaders;
  body: any;
  url: string;
}

export interface ILoggerAdapter {
  error(message: ILogErrorMessage): void;
}
