import { readFile, writeFile } from 'node:fs/promises';

const sitemapPath = new URL('../public/sitemap.xml', import.meta.url);
const today = new Intl.DateTimeFormat('en-CA', {
  timeZone: 'Europe/Rome',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
}).format(new Date());

const sitemap = await readFile(sitemapPath, 'utf8');
const updatedSitemap = sitemap.replace(
  /<lastmod>\d{4}-\d{2}-\d{2}<\/lastmod>/,
  `<lastmod>${today}</lastmod>`,
);

if (updatedSitemap === sitemap) {
  if (!sitemap.includes(`<lastmod>${today}</lastmod>`)) {
    throw new Error('Could not find a valid <lastmod> value in public/sitemap.xml');
  }
} else {
  await writeFile(sitemapPath, updatedSitemap);
}

console.log(`Sitemap lastmod: ${today}`);
