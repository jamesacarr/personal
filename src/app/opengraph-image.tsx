import { readFile } from 'node:fs/promises';
import path from 'node:path';

import { ImageResponse } from 'next/og';

import { SITE_NAME, SITE_URL } from './site';

export const alt = `${SITE_NAME} - full-stack web developer`;

export const size = { height: 630, width: 1200 };

export const contentType = 'image/png';

// Satori can't read CSS variables, so these mirror tokens in global.css.
export const COLOURS = {
  // --colour-neutral000
  background: '#1f2933',
  // --colour-yellow500
  highlight: '#f7c948',
  // --colour-neutral600
  muted: '#9aa5b1',
  // --colour-neutral900
  text: '#f5f7fa',
};

// WOFF sibling of the WOFF2 the site loads in layout.tsx. Satori reads
// TTF, OTF and WOFF, not WOFF2.
export const FONT_PATH = path.join(
  process.cwd(),
  'node_modules/@fontsource/raleway/files/raleway-latin-400-normal.woff',
);

const raleway = await readFile(FONT_PATH);

const OpenGraphImage = () =>
  new ImageResponse(
    <div
      style={{
        alignItems: 'center',
        backgroundColor: COLOURS.background,
        color: COLOURS.text,
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'Raleway',
        height: '100%',
        justifyContent: 'center',
        lineHeight: 1.4,
        width: '100%',
      }}
    >
      <div style={{ display: 'flex', fontSize: 72 }}>
        Hello, I&apos;m&nbsp;
        <span style={{ color: COLOURS.highlight }}>{SITE_NAME}</span>.
      </div>
      <div style={{ display: 'flex', fontSize: 72 }}>
        I&apos;m a full-stack web developer.
      </div>
      <div
        style={{
          bottom: 48,
          color: COLOURS.muted,
          display: 'flex',
          fontSize: 32,
          position: 'absolute',
        }}
      >
        {new URL(SITE_URL).host}
      </div>
    </div>,
    {
      ...size,
      fonts: [{ data: raleway, name: 'Raleway', style: 'normal', weight: 400 }],
    },
  );

export default OpenGraphImage;
