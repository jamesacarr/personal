import { useEffect, useState } from 'react';

interface RecaptchaWindow {
  grecaptcha: ReCaptchaInstance;
}

interface ReCaptchaInstance {
  ready: (cb: () => any) => any;
  execute: (siteKey: string, options: ReCaptchaExecuteOptions) => Promise<string>;
}

interface ReCaptchaExecuteOptions {
  action: string;
}

const useRecaptcha = (): { token: string } => {
  const [token, setToken] = useState('');

  useEffect(() => {
    const siteKey = process.env.RECAPTCHA_SITE_KEY ?? '';
    if (!siteKey) {
      return;
    }

    // eslint-disable-next-line no-undef
    const recaptchaWindow = window as Window & typeof globalThis & RecaptchaWindow;

    if (recaptchaWindow?.grecaptcha) {
      recaptchaWindow.grecaptcha.ready(async () => {
        const result = await recaptchaWindow.grecaptcha.execute(siteKey, { action: 'homepage' });
        setToken(result);
      });
    }
  }, []);

  return { token };
};

export default useRecaptcha;
