import { beforeAll, afterAll, test, expect, jest } from '@jest/globals';
import { Helmet } from 'react-helmet';
import fs from 'fs';
import path from 'path';
import vm from 'vm';
import { renderPage, pages, site } from './prerender';

beforeAll(() => { Helmet.canUseDOM = false; });
afterAll(() => { Helmet.canUseDOM = true; });

function documentFor(route) {
  const { head, body } = renderPage(route);
  return new DOMParser().parseFromString(
    `<html><head>${head}</head><body>${body}</body></html>`, 'text/html'
  );
}

test.each(pages)('renders content and unique search metadata for $path', page => {
  const document = documentFor(page.path);
  expect(document.title).toBe(page.title);
  expect(document.querySelectorAll('title')).toHaveLength(1);
  expect(document.querySelector('meta[name="description"]').content).toBe(page.description);
  expect(document.querySelector('link[rel="canonical"]').href).toBe(`${site.url}${page.path}`);
  expect(document.querySelector('meta[property="og:url"]').content).toBe(`${site.url}${page.path}`);
  expect(document.querySelector('meta[name="robots"]').content).toBe(
    page.index ? 'index, follow' : 'noindex, follow'
  );
  expect(document.querySelectorAll('h1')).toHaveLength(1);
  expect(document.querySelector('main').textContent.length).toBeGreaterThan(30);
  expect(document.querySelector('a[href="/work/"]')).not.toBeNull();
  expect(document.querySelector('style[data-styled]')).not.toBeNull();
});

test('homepage exposes the same identity in visible content and structured data', () => {
  const document = documentFor('/');
  const profile = JSON.parse(document.querySelector('script[type="application/ld+json"]').textContent);
  expect(profile['@type']).toBe('Person');
  expect(profile.name).toBe(document.querySelector('h1').textContent);
  expect(profile.url).toBe(`${site.url}/`);
  expect(profile.sameAs).toEqual(site.profiles);
  expect(document.querySelector('main').textContent).toContain('Python');
});

test('prerendering includes page content without JavaScript and does not leak metadata between pages', () => {
  documentFor('/');
  const work = documentFor('/work/');
  expect(work.querySelector('main').textContent).toContain('Effortl3ssAI');
  expect(work.querySelector('a[download]').getAttribute('download')).toBe('Booster Pack Heroes.CT');
  expect(work.querySelector('script[type="application/ld+json"]')).toBeNull();
  expect(documentFor('/certifications/').querySelector('main').textContent).toContain('Python/Django');
});

test('unknown paths are not indexable or canonicalized to the homepage', () => {
  const document = documentFor('/not-a-page/');
  expect(document.querySelector('h1').textContent).toBe('Page not found');
  expect(document.querySelector('meta[name="robots"]').content).toBe('noindex, follow');
  expect(document.querySelector('link[rel="canonical"]')).toBeNull();
});

test('slashless links use the same canonical as the static directory URL', () => {
  expect(documentFor('/work').querySelector('link[rel="canonical"]').href).toBe(`${site.url}/work/`);
});

const legacyScript = fs.readFileSync(path.join(process.cwd(), 'public/legacy-redirect.js'), 'utf8');

test.each([
  ['/#/', '/'],
  ['/#/work', '/work/'],
  ['/?source=old#/work?topic=web3#details', '/work/?source=old&topic=web3#details'],
  ['/mirkan1portfolio/#/certifications', '/certifications/'],
  ['/mirkan1portfolio', '/'],
  ['/mirkan1portfolio/work?source=old#details', '/work/?source=old#details'],
  ['/#/missing', '/missing/']
])('redirects legacy URL %s to %s', (input, output) => {
  const url = new URL(input, site.url);
  const location = {
    origin: url.origin, pathname: url.pathname, hash: url.hash, search: url.search, replace: jest.fn()
  };
  vm.runInNewContext(legacyScript, { window: { location }, URL });
  expect(location.replace).toHaveBeenCalledWith(`${site.url}${output}`);
});

test.each(['/', '/work/', '/#person', '/missing/', '/work/#details'])(
  'does not redirect a normal page or anchor: %s', input => {
    const url = new URL(input, site.url);
    const location = {
      origin: url.origin, pathname: url.pathname, hash: url.hash, search: url.search, replace: jest.fn()
    };
    vm.runInNewContext(legacyScript, { window: { location }, URL });
    expect(location.replace).not.toHaveBeenCalled();
  }
);
