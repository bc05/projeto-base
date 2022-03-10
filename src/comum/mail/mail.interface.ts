export interface ISendMailOptions<T> {
  to: string[];
  subject: string;
  templateUrl: string;
  data: T;
}

export interface IDataWelcomeMail {
  nome: string;
  email: string;
}
