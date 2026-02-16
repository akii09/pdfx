import { Outlet } from 'react-router-dom';
import { CommandPalette } from '../command-palette';
import { PageTransition } from '../page-transition';
import { Footer } from './footer';
import { Header } from './header';
import { Sidebar } from './sidebar';

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Skip-to-content link for keyboard/screen reader users (M9) */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[200] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground focus:text-sm focus:font-medium"
      >
        Skip to main content
      </a>

      <Header />
      <CommandPalette />

      <div className="flex-1 flex container mx-auto px-4 lg:px-8">
        <Sidebar />
        <main id="main-content" className="flex-1 min-w-0 lg:pl-8">
          <PageTransition>
            <Outlet />
          </PageTransition>
        </main>
      </div>

      <Footer />
    </div>
  );
}
