const biome =
  'biome check --write --no-errors-on-unmatched --files-ignore-unknown=true';
const typecheck = () => 'pnpm typecheck';

const config = {
  '*.json': [biome],
  '*.{js,jsx,ts,tsx}': [biome, typecheck],
};

export default config;
