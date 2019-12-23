import { NextApiRequest, NextApiResponse } from 'next';

const errorHandler = (req: NextApiRequest, res: NextApiResponse, code: number, message: string): void => {
  console.error('Error:', code, message);
  console.error(req.body);
  res.status(code).json({ error: { code, message } });
};

export default errorHandler;
