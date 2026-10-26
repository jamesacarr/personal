// Switch to Content-Security-Policy-Report-Only to trial a policy change on a
// preview deployment first. Next.js reads the nonce from either header name.
export const CSP_HEADER_NAME = 'Content-Security-Policy';

// `script-src` must stay the first directive whose name starts with
// "script-src": Next.js takes the nonce for its own scripts from that one.
// Browsers ignore 'unsafe-inline' when a nonce is present, so in development
// style elements drop the nonce to let the dev overlay inject styles.
// react-hot-toast server-renders a style attribute, and nonces can't apply to
// attributes, hence `style-src-attr 'unsafe-inline'`.
export const buildCsp = (nonce: string, isDev: boolean) =>
  [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'${isDev ? " 'unsafe-eval'" : ''}`,
    isDev
      ? "style-src-elem 'self' 'unsafe-inline'"
      : `style-src-elem 'self' 'nonce-${nonce}'`,
    "style-src-attr 'unsafe-inline'",
    "img-src 'self'",
    "font-src 'self'",
    "connect-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    'upgrade-insecure-requests',
  ].join('; ');
