import axios, { AxiosResponse } from 'axios';
import { stringify } from 'qs';

import { ContactRequestBody } from './types';
import { InternalServerError, UnauthorizedError } from '../lib/errors';

const AKISMET_TEST = process.env.AKISMENT_ENVIRONMENT !== 'production';
const AKISMET_API_KEY = process.env.AKISMET_API_KEY ?? '';
const AKISMET_URL = `https://${AKISMET_API_KEY}.rest.akismet.com/1.1/comment-check`;

/**
 * Akismet Data Properties
 * -----------------------
 *
 * blog: string;
 * user_ip: string;
 * user_agent: string;
 * referrer?: string;
 * permalink?: string;
 * comment_type?: 'comment' | 'forum-post' | 'reply' | 'blog-post' | 'contact-form' | 'signup' | 'message';
 * comment_author?: string;
 * comment_author_email?: string;
 * comment_author_url?: string;
 * comment_content?: string;
 * comment_date_gmt?: string;
 * comment_post_modified_gmt?: string;
 * blog_lang?: string;
 * blog_charset?: string;
 * user_role?: string;
 * is_test?: boolean;
 * recheck_reason?: string;
 */

type ValidateSpam = (params: { ip: string; userAgent: string } & ContactRequestBody) => Promise<void>;

const validateSpam: ValidateSpam = async ({ name, email, message, ip, userAgent }) => {
  if (!AKISMET_API_KEY) {
    throw new InternalServerError();
  }

  const verification = await axios.request<string, AxiosResponse<boolean | string>>({
    url: AKISMET_URL,
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    data: stringify({
      blog: 'jamescarr.dev',
      user_ip: ip,
      user_agent: userAgent,
      comment_type: 'contact-form',
      comment_author: name,
      comment_author_email: email,
      comment_content: message,
      blog_lang: 'en',
      blog_charset: 'UTF-8',
      is_test: AKISMET_TEST,
    }),
  });

  if (verification.data !== false) {
    throw new UnauthorizedError();
  }
};

export default validateSpam;
