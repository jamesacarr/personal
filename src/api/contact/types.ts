import { ResponseBody } from '../types';

export interface ContactRequestBody {
  name: string;
  email: string;
  message: string;
}

export type ContactResponseBody = ResponseBody<void>;
