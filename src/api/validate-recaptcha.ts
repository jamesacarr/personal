import axios from 'axios';
import { UNAUTHORIZED } from 'http-status-codes';

import { APIRequest, ErrorResponse } from './types';
import errorHandler from './error-handler';

type RecaptchaValidator = (request: APIRequest, response: ErrorResponse) => Promise<boolean>;

type RecaptchaResponse = {
  success: boolean;
  score: number;
  action: string;
  challenge_ts: string;
  hostname: string;
};

const validateReCAPTCHA: RecaptchaValidator = async (request, response) => {
  const verification = await axios.request<RecaptchaResponse>({
    url: 'https://www.google.com/recaptcha/api/siteverify',
    method: 'POST',
    params: {
      secret: process.env.RECAPTCHA_SECRET_KEY,
      response: request.body.token,
    },
  });

  if (!verification.data.success) {
    errorHandler(response, UNAUTHORIZED, 'Invalid ReCAPTCHA token');
    return false;
  }

  if (verification.data.score && verification.data.score < 0.6) {
    errorHandler(response, UNAUTHORIZED, 'Low ReCAPTCHA score');
    return false;
  }

  return true;
};

export default validateReCAPTCHA;
