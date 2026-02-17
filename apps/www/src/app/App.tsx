import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from '../components/layout/Layout';

const HomePage = lazy(() => import('../pages/home'));
const DocsPage = lazy(() => import('../pages/docs'));
const ComponentsIndexPage = lazy(() => import('../pages/components/index'));
const HeadingPage = lazy(() => import('../pages/components/heading'));
const TextPage = lazy(() => import('../pages/components/text'));
const LinkPage = lazy(() => import('../pages/components/link'));
const DividerPage = lazy(() => import('../pages/components/divider'));
const PageBreakPage = lazy(() => import('../pages/components/page-break'));
const StackPage = lazy(() => import('../pages/components/stack'));
const SectionPage = lazy(() => import('../pages/components/section'));
const TablePage = lazy(() => import('../pages/components/table'));
const DataTablePage = lazy(() => import('../pages/components/data-table'));

function PageLoader() {
  return (
    <div className="flex items-center justify-center py-24">
      <div className="animate-spin h-8 w-8 border-4 border-border border-t-foreground rounded-full" />
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={
            <Suspense fallback={<PageLoader />}>
              <HomePage />
            </Suspense>
          }
        />
        <Route
          path="docs"
          element={
            <Suspense fallback={<PageLoader />}>
              <DocsPage />
            </Suspense>
          }
        />
        <Route path="components">
          <Route
            index
            element={
              <Suspense fallback={<PageLoader />}>
                <ComponentsIndexPage />
              </Suspense>
            }
          />
          <Route
            path="heading"
            element={
              <Suspense fallback={<PageLoader />}>
                <HeadingPage />
              </Suspense>
            }
          />
          <Route
            path="text"
            element={
              <Suspense fallback={<PageLoader />}>
                <TextPage />
              </Suspense>
            }
          />
          <Route
            path="link"
            element={
              <Suspense fallback={<PageLoader />}>
                <LinkPage />
              </Suspense>
            }
          />
          <Route
            path="divider"
            element={
              <Suspense fallback={<PageLoader />}>
                <DividerPage />
              </Suspense>
            }
          />
          <Route
            path="page-break"
            element={
              <Suspense fallback={<PageLoader />}>
                <PageBreakPage />
              </Suspense>
            }
          />
          <Route
            path="stack"
            element={
              <Suspense fallback={<PageLoader />}>
                <StackPage />
              </Suspense>
            }
          />
          <Route
            path="section"
            element={
              <Suspense fallback={<PageLoader />}>
                <SectionPage />
              </Suspense>
            }
          />
          <Route
            path="table"
            element={
              <Suspense fallback={<PageLoader />}>
                <TablePage />
              </Suspense>
            }
          />
          <Route
            path="data-table"
            element={
              <Suspense fallback={<PageLoader />}>
                <DataTablePage />
              </Suspense>
            }
          />
        </Route>
      </Route>
    </Routes>
  );
}
