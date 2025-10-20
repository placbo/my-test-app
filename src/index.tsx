import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './variables.css';
import './index.css';
import { routes } from './router';
import * as Sentry from '@sentry/react';

Sentry.init({
  dsn: 'https://f9de89bc2712f87ff7e283aeac4f443b@o4509570733834240.ingest.de.sentry.io/4509570735931472',
  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true
});

const router = createBrowserRouter(routes);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
