import { IncomingWebhookSendArguments } from '@slack/webhook';

import { ContactRequestBody } from './types';

const generatePayload = (body: ContactRequestBody): IncomingWebhookSendArguments => ({
  text: 'You have a new message from the contact form:',
  attachments: [
    {
      blocks: [
        {
          type: 'section',
          fields: [
            {
              type: 'mrkdwn',
              text: `*Name:*\n${body.name}`,
            },
            {
              type: 'mrkdwn',
              text: `*Email:*\n<mailto:${body.email}|${body.email}>`,
            },
          ],
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `*Message:*\n${body.message}`,
          },
        },
      ],
    },
  ],
});

export default generatePayload;
