import { defineConfig } from 'astro/config';

// Plain static build. `npm run build` writes the site to dist/,
// then Pagefind adds the search index to dist/pagefind/.
export default defineConfig({
  site: 'https://www.growthengine.co',
});
