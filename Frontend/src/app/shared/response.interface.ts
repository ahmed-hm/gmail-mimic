export class Response<T = any> {
  payload?: CustomResponsePayload<T>;
  message: string = 'Success';
  statusCode: number = 200;

  constructor(partial: Partial<Response<T>>) {
    Object.assign(this, partial);
  }
}

export interface CustomResponsePayload<T = any> {
  data: T;
  page?: number;
  pages?: number;
  limit?: number;
  total?: number;
}
