import type { NextApiHandler } from 'next';

export type Middleware<Response = void> = <T>(handler: NextApiHandler<T>) => NextApiHandler<T | Response>;
