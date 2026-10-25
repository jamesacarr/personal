// @vitest-environment node
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

import { describe, expect, it } from 'vitest';

import OpenGraphImage, {
  COLOURS,
  contentType,
  FONT_PATH,
  size,
} from './opengraph-image';

const PNG_SIGNATURE = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];

const cssColour = (token: string) => {
  const css = readFileSync(
    path.join(process.cwd(), 'src/app/global.css'),
    'utf8',
  );
  return css.match(new RegExp(`--${token}:\\s*(#[0-9a-fA-F]{3,8})`))?.[1];
};

describe('opengraph-image', () => {
  it('declares a 1200x630 PNG', () => {
    expect(size).toEqual({ height: 630, width: 1200 });
    expect(contentType).toEqual('image/png');
  });

  it('reads a Raleway WOFF file that exists in @fontsource/raleway', () => {
    expect(existsSync(FONT_PATH)).toBe(true);
  });

  it('renders a 1200x630 PNG', async () => {
    const response = OpenGraphImage();
    const bytes = new Uint8Array(await response.arrayBuffer());
    const view = new DataView(bytes.buffer);

    expect([...bytes.slice(0, 8)]).toEqual(PNG_SIGNATURE);
    expect(view.getUint32(16)).toEqual(1200);
    expect(view.getUint32(20)).toEqual(630);
  });

  it.each([
    ['background', 'colour-neutral000'],
    ['text', 'colour-neutral900'],
    ['highlight', 'colour-yellow500'],
    ['muted', 'colour-neutral600'],
  ] as const)('matches the %s colour to --%s in global.css', (key, token) => {
    const colour = cssColour(token);
    expect(colour).toBeDefined();
    expect(COLOURS[key]).toEqual(colour);
  });
});
