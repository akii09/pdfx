import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from '../components/layout/Layout';

const HomePage = lazy(() => import('../pages/home'));
const DocsPage = lazy(() => import('../pages/docs'));
const NotFoundPage = lazy(() => import('../pages/404'));
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
const ListPage = lazy(() => import('../pages/components/list'));
const CardPage = lazy(() => import('../pages/components/card'));
const FormPage = lazy(() => import('../pages/components/form'));
const SignaturePage = lazy(() => import('../pages/components/signature'));
const PageHeaderPage = lazy(() => import('../pages/components/page-header'));
const PageFooterPage = lazy(() => import('../pages/components/page-footer'));
const BadgePage = lazy(() => import('../pages/components/badge'));
const KeyValuePage = lazy(() => import('../pages/components/key-value'));
const InstallationPage = lazy(() => import('../pages/installation'));

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
        <Route
          path="installation"
          element={
            <Suspense fallback={<PageLoader />}>
              <InstallationPage />
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
          <Route
            path="list"
            element={
              <Suspense fallback={<PageLoader />}>
                <ListPage />
              </Suspense>
            }
          />
          <Route
            path="card"
            element={
              <Suspense fallback={<PageLoader />}>
                <CardPage />
              </Suspense>
            }
          />
          <Route
            path="form"
            element={
              <Suspense fallback={<PageLoader />}>
                <FormPage />
              </Suspense>
            }
          />
          <Route
            path="signature"
            element={
              <Suspense fallback={<PageLoader />}>
                <SignaturePage />
              </Suspense>
            }
          />
          <Route
            path="page-header"
            element={
              <Suspense fallback={<PageLoader />}>
                <PageHeaderPage />
              </Suspense>
            }
          />
          <Route
            path="page-footer"
            element={
              <Suspense fallback={<PageLoader />}>
                <PageFooterPage />
              </Suspense>
            }
          />
          <Route
            path="badge"
            element={
              <Suspense fallback={<PageLoader />}>
                <BadgePage />
              </Suspense>
            }
          />
          <Route
            path="key-value"
            element={
              <Suspense fallback={<PageLoader />}>
                <KeyValuePage />
              </Suspense>
            }
          />
        </Route>
        <Route
          path="*"
          element={
            <Suspense fallback={<PageLoader />}>
              <NotFoundPage />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}
