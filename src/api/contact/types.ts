import { ResponseBody } from '../types';

export interface ContactRequestBody {
  name: string;
  email: string;
  message: string;
  token: string;
}

export type ContactResponseBody = ResponseBody<void>;
