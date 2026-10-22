import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

import { describe, expect, it } from 'vitest';

import manifest from './manifest';

const backgroundColour = () => {
  const css = readFileSync(
    path.join(process.cwd(), 'src/app/global.css'),
    'utf8',
  );
  return css.match(/--colour-neutral000:\s*(#[0-9a-fA-F]{3,8})/)?.[1];
};

describe('manifest', () => {
  it('sets name and short name', () => {
    const { name, short_name } = manifest();
    expect(name).toEqual('James Carr');
    expect(short_name).toEqual('James Carr');
  });

  it('lists the android chrome icons', () => {
    const sources = manifest().icons?.map(icon => icon.src);
    expect(sources).toEqual([
      '/icons/android-chrome-192x192.png',
      '/icons/android-chrome-512x512.png',
    ]);
  });

  it('points every icon at a file in public', () => {
    for (const { src } of manifest().icons ?? []) {
      expect(existsSync(path.join(process.cwd(), 'public', src))).toBe(true);
    }
  });

  it('matches theme and background colours to the site background', () => {
    const colour = backgroundColour();
    expect(colour).toBeDefined();
    const { background_color, theme_color } = manifest();
    expect(background_color).toEqual(colour);
    expect(theme_color).toEqual(colour);
  });
});
