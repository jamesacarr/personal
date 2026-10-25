import type { MetadataRoute } from 'next';

import { SITE_URL } from './site';

// No lastModified: new Date() would change on every build and tell crawlers
// the page changed when it didn't.
const sitemap = (): MetadataRoute.Sitemap => [{ url: SITE_URL }];

export default sitemap;
