// Escapes "<" so a value containing "</script>" can't end the script block early.
export const serialiseJsonLd = (data: object): string =>
  JSON.stringify(data).replace(/</g, '\\u003c');
