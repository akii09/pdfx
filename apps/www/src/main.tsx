import './lib/prism-setup';
import posthog from 'posthog-js';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './app/App';
import { ErrorBoundary } from './components/error-boundary';
import { ThemeProvider } from './components/theme-provider';
import './index.css';

posthog.init('phc_zMnenjjttpwQD7tKQKzgpiSvwpv3KcLG96kR2tYvG6JZ', {
  api_host: 'https://us.i.posthog.com',
  capture_pageview: 'history_change',
  capture_pageleave: true,
});

const rootEl = document.getElementById('root');
if (!rootEl) {
  throw new Error('Root element not found. Ensure index.html contains <div id="root"></div>.');
}

ReactDOM.createRoot(rootEl).render(
  <React.StrictMode>
    <ErrorBoundary>
      <ThemeProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
