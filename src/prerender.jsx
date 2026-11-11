import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ServerStyleSheet } from 'styled-components';
import App from './App';

export { pages, site } from './site';

export function renderPage(path) {
  const sheet = new ServerStyleSheet();
  try {
    const body = renderToString(sheet.collectStyles(
      <StaticRouter location={path}>
        <App />
      </StaticRouter>
    ));
    const helmet = Helmet.renderStatic();
    const head = helmet.title.toString() + helmet.meta.toString() +
      helmet.link.toString() + helmet.script.toString() + sheet.getStyleTags();
    return { body, head };
  } finally {
    sheet.seal();
  }
}
