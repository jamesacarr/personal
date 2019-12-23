import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

import errorHandler from './error-handler';

type Validator = (req: NextApiRequest, res: NextApiResponse) => Promise<boolean>;

const validateReCAPTCHA: Validator = async (req, res) => {
  try {
    const response = await axios.request({
      url: 'https://www.google.com/recaptcha/api/siteverify',
      method: 'POST',
      params: {
        secret: process.env.RECAPTCHA_SECRET_KEY,
        response: req.body.token,
      },
    });

    if (!response.data.success) {
      errorHandler(res, 401, 'Invalid ReCAPTCHA token');
      return false;
    }

    if (response.data.score && response.data.score < 0.5) {
      errorHandler(res, 401, 'Low ReCAPTCHA score');
      return false;
    }
  } catch {
    errorHandler(res, 500, 'Internal server error');
    return false;
  }

  return true;
};

export default validateReCAPTCHA;
