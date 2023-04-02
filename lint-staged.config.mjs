const typecheck = () => 'yarn typecheck';

const config = {
  '*.{js,jsx,ts,tsx}': ['yarn format', 'yarn lint', typecheck],
  '*.{json,md,mdx,yml}': ['yarn format'],
};

export default config;
