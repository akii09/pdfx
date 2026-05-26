import posthog from 'posthog-js';
import { useEffect, useState } from 'react';
import { cn } from '../lib/utils';
import { type PromoPayload, parsePromoPayload } from './header-promo.utils';

/**
 * Optional, remotely-toggled slot in the docs header. Renders nothing unless
 * the `header-promo` feature flag is enabled AND its JSON payload passes the
 * strict validator in `header-promo.utils`.
 *
 * No copy, URLs, or product references live in this file — everything is
 * provided at runtime via the feature-flag payload and can be disabled
 * instantly from the PostHog dashboard without a deploy.
 */
const FLAG_KEY = 'header-promo';

export function HeaderPromo({ className }: { className?: string }) {
  const payload = useHeaderPromoPayload();
  if (!payload) return null;

  return (
    <a
      href={payload.href}
      target="_blank"
      rel="noopener noreferrer"
      title={payload.tooltip ?? payload.label}
      onClick={() => {
        posthog.capture('header_promo_click', { label: payload.label, href: payload.href });
      }}
      className={cn(
        'group relative inline-flex items-center gap-1.5 overflow-hidden rounded-md',
        'border border-primary/30 bg-gradient-to-r from-primary/[0.08] to-primary/[0.02]',
        'px-2.5 py-1.5 text-xs font-medium text-foreground',
        'transition-all duration-150 hover:border-primary/60 hover:from-primary/15 hover:to-primary/5',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        className
      )}
    >
      {/* Shimmer sweep — purely decorative */}
      <span aria-hidden className="pointer-events-none absolute inset-0 header-promo-shimmer" />

      <span className="relative">{payload.label}</span>

      {payload.badge && (
        <span
          className={cn(
            'relative inline-flex items-center rounded-sm px-1 py-px',
            'text-[9px] font-semibold uppercase tracking-wider',
            'bg-primary text-primary-foreground'
          )}
        >
          {payload.badge}
        </span>
      )}
    </a>
  );
}

function useHeaderPromoPayload(): PromoPayload | null {
  const [payload, setPayload] = useState<PromoPayload | null>(null);

  useEffect(() => {
    function refresh() {
      if (!posthog.isFeatureEnabled(FLAG_KEY)) {
        setPayload(null);
        return;
      }
      const raw = posthog.getFeatureFlagPayload(FLAG_KEY);
      setPayload(parsePromoPayload(raw));
    }

    refresh();
    const unsubscribe = posthog.onFeatureFlags(() => refresh());
    return () => {
      if (typeof unsubscribe === 'function') unsubscribe();
    };
  }, []);

  return payload;
}
