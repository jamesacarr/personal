import { NextApiRequest } from 'next';

const getIPAddress = (request: NextApiRequest): string => {
  const ipHeader = request.headers['x-forwarded-for'] ?? request.connection.remoteAddress ?? '';
  const ipString = Array.isArray(ipHeader) ? ipHeader[0] : ipHeader;
  return ipString.split(',')[0];
};

export default getIPAddress;
