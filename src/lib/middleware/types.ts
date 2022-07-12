import type { NextApiHandler } from 'next';

export type Middleware<Response = void> = <T>(handler: NextApiHandler<T>) => NextApiHandler<T | Response>;

export interface ErrorResponseBody {
  detail: string;
  status: number;
  title: string;
  type: string;
  instance?: string;
}
