import { INTERNAL_SERVER_ERROR, NOT_FOUND } from 'http-status-codes';

import { ErrorResponse } from './types';

type ErrorMessageArray = {
  [code: number]: string;
};

const ERROR_MESSAGES: ErrorMessageArray = {
  [NOT_FOUND]: 'Not Found',
  [INTERNAL_SERVER_ERROR]: 'Internal Server Error',
};

const messageForCode = (code: number): string => {
  return ERROR_MESSAGES[code] || ERROR_MESSAGES[INTERNAL_SERVER_ERROR];
};

const errorHandler = (response: ErrorResponse, code: number, customMessage?: string): void => {
  const message = customMessage ? customMessage : messageForCode(code);
  response.status(code).json({ success: false, error: { code, message } });
};

export default errorHandler;
