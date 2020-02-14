import { INTERNAL_SERVER_ERROR } from 'http-status-codes';
import { NextApiRequest, NextApiResponse } from 'next';

import errorHandler from '../error-handler';
import validateReCAPTCHA from '../validate-recaptcha';
import validateBody from './validate-body';
import validateMethod from './validate-method';
import sendMessage from './send-message';

type Handler = (req: NextApiRequest, res: NextApiResponse) => void | Promise<void>;

const contactHandler: Handler = async (req, res) => {
  try {
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
  } catch {
    errorHandler(res, INTERNAL_SERVER_ERROR);
  }
};

export default contactHandler;
