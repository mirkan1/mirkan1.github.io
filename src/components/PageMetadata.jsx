import React from 'react';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';
import { getPage, site } from '../site';

export default function PageMetadata() {
  const { pathname } = useLocation();
  const page = getPage(pathname);
  const title = page ? page.title : `Page not found | ${site.name}`;
  const description = page ? page.description : 'The requested page does not exist.';
  const canonical = page ? `${site.url}${page.path}` : null;
  const profile = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${site.url}/#person`,
    name: site.name,
    url: `${site.url}/`,
    sameAs: site.profiles
  };

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={page && page.index ? 'index, follow' : 'noindex, follow'} />
      {canonical && <link rel="canonical" href={canonical} />}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={`${site.name} - Portfolio`} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {canonical && <meta property="og:url" content={canonical} />}
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {page && page.path === '/' && (
        <script type="application/ld+json">
          {JSON.stringify(profile).replace(/</g, '\\u003c')}
        </script>
      )}
    </Helmet>
  );
}
