export interface ISendMailOptions<T> {
  to: string | string[];
  subject: string;
  template: string;
  data: T;
}

export interface IDataWelcomeMail {
  name: string;
  email: string;
}
