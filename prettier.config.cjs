/**
 * @type {import('@types/prettier').Options}
 */
const config = {
  arrowParens: 'avoid',
  endOfLine: 'auto',
  printWidth: 120,
  singleQuote: true,
  overrides: [
    {
      files: '*.yml',
      options: {
        singleQuote: false,
      },
    },
  ],
};

module.exports = config;
