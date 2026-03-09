import { Navigate, type RouteObject, createBrowserRouter } from 'react-router-dom';
import { EditorPage } from './pages/EditorPage';
import { SetupPage } from './pages/SetupPage';

/**
 * Route definitions for PDFx Builder
 */
const routes: RouteObject[] = [
  {
    path: '/setup',
    element: <SetupPage />,
  },
  {
    path: '/editor',
    element: <EditorPage />,
  },
  {
    path: '/',
    element: <Navigate to="/setup" replace />,
  },
  {
    path: '*',
    element: <Navigate to="/setup" replace />,
  },
];

/**
 * Browser router instance
 */
export const router = createBrowserRouter(routes, {
  basename: '/', // Change if deploying to subdirectory
});
