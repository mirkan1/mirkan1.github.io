import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './css/index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const root = document.getElementById('root');
const app = <BrowserRouter><App /></BrowserRouter>;

if (root.hasChildNodes()) {
  ReactDOM.hydrate(app, root);
} else {
  ReactDOM.render(app, root);
}

// Old app-shell caches must not replace the new page-specific HTML.
serviceWorker.unregister();
