import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

import errorHandler from '../error-handler';
import generatePayload from './generate-payload';

const sendMessage = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const url = process.env.SLACK_CONTACT_WEBHOOK ?? '';
  if (!url) {
    errorHandler(req, res, 500, 'Internal server error');
    return;
  }

  try {
    await axios.post(url, generatePayload(req.body));
    res.json({ success: true });
  } catch {
    errorHandler(req, res, 500, 'Internal server error');
  }
};

export default sendMessage;
