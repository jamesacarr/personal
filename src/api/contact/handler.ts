import { NextApiRequest, NextApiResponse } from 'next';

import validateReCAPTCHA from '../validate-recaptcha';
import validateBody from './validate-body';
import validateMethod from './validate-method';
import sendMessage from './send-message';

type Handler = (req: NextApiRequest, res: NextApiResponse) => void | Promise<void>;

const contactHandler: Handler = async (req, res) => {
  if (!validateMethod(req, res)) {
    return;
  }

  if (!validateBody(req, res)) {
    return;
  }

  const validToken = await validateReCAPTCHA(req, res);
  if (!validToken) {
    return;
  }

  await sendMessage(req, res);
};

export default contactHandler;
