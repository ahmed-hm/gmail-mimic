export interface IEmail {
  _id?: string;
  replyTo?: string;
  from: string;
  to: string;
  subject: string;
  body: string;
  createdAt: Date;
  reply?: IEmail;
}
