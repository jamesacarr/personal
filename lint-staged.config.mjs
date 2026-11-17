const biome =
  'biome check --write --no-errors-on-unmatched --files-ignore-unknown=true';
const typecheck = () => 'turbo run typecheck';

const config = {
  '*.{css,json}': [biome],
  '*.{js,jsx,ts,tsx}': [biome, typecheck],
};

export default config;
