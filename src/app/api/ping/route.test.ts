// @vitest-environment node
import { describe, expect, it } from 'vitest';

import { GET } from './route';

describe('GET /api/ping', () => {
  it('responds 200 with an empty body', async () => {
    const response = GET();

    expect(response.status).toBe(200);
    expect(await response.text()).toBe('');
  });
});
