import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { CommandPalette } from '../command-palette';
// import { DiscordFloatButton } from '../discord-float-button';
import { GitHubStarBanner } from '../github-star-banner';
import { PageTransition } from '../page-transition';
import { ReadingProgress } from '../reading-progress';
import { Footer } from './footer';
import { Header } from './header';
import { Sidebar } from './sidebar';

export default function Layout() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    if (!pathname && !search) return;
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname, search]);

  // Theme Builder is a full-viewport tool — no sidebar, no footer, no
  // reading-progress bar, and no container constraints.
  const isThemeBuilder = pathname.startsWith('/theme-builder');

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {!isThemeBuilder && <ReadingProgress />}

      {/* Skip-to-content link for keyboard/screen reader users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[200] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground focus:text-sm focus:font-medium"
      >
        Skip to main content
      </a>

      <GitHubStarBanner />
      <Header />
      <CommandPalette />

      <div className={cn('flex-1 flex', !isThemeBuilder && 'container mx-auto px-4 lg:px-8')}>
        <Sidebar />
        <main id="main-content" className={cn('flex-1 min-w-0', !isThemeBuilder && 'lg:pl-8')}>
          <PageTransition>
            <Outlet />
          </PageTransition>
        </main>
      </div>

      {/* Footer is hidden on the Theme Builder — it's a full-viewport tool */}
      {!isThemeBuilder && <Footer />}

      {/* <DiscordFloatButton /> */}
    </div>
  );
}
