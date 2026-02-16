import { Route, Routes } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import ComponentPage from '../pages/components/heading';
import DocsPage from '../pages/docs';
import HomePage from '../pages/home';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="docs" element={<DocsPage />} />
        <Route path="components">
          <Route path="heading" element={<ComponentPage />} />
        </Route>
      </Route>
    </Routes>
  );
}
