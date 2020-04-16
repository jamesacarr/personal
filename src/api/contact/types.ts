import { NextApiRequest, NextApiResponse } from 'next';

export interface ContactRequestBody {
  name: string;
  email: string;
  message: string;
  token: string;
}

export interface ContactRequest extends NextApiRequest {
  body: ContactRequestBody;
}

export type ContactResponseBody = {
  success: true;
};

export type ContactResponse = NextApiResponse<ContactResponseBody>;
