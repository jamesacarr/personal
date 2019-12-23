import { NextApiResponse } from 'next';

const errorHandler = (res: NextApiResponse, code: number, message: string): void => {
  console.log('Error:', code, message);
  res.status(code).json({ error: { code, message } });
};

export default errorHandler;
