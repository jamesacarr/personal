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

const getRecaptchaToken = async (action: string): Promise<string | null> => {
  if (typeof window === 'undefined') {
    return Promise.resolve(null);
  }

  const siteKey = process.env.RECAPTCHA_SITE_KEY ?? '';
  if (!siteKey) {
    return Promise.resolve(null);
  }

  // eslint-disable-next-line no-undef
  const recaptchaWindow = window as Window & typeof globalThis & RecaptchaWindow;

  return new Promise((resolve, reject) => {
    if (!recaptchaWindow.grecaptcha) {
      reject(new Error('reCAPTCHA not initialised'));
    }

    recaptchaWindow.grecaptcha.ready(async () => {
      const result = await recaptchaWindow.grecaptcha.execute(siteKey, { action });
      resolve(result);
    });
  });
};

export default getRecaptchaToken;
