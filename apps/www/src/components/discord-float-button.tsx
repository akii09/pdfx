import { AnimatePresence, motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { cn } from '../lib/utils';

const STORAGE_KEY = 'pdfx-discord-dismissed';
const PULSE_SESSION_KEY = 'pdfx-discord-pulsed';
const DISCORD_URL = 'https://discord.gg/MuRtnU5B';

function DiscordIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.947 2.418-2.157 2.418z" />
    </svg>
  );
}

export function DiscordFloatButton() {
  const [dismissed, setDismissed] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) === '1';
    } catch {
      return false;
    }
  });
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [hasPulsed, setHasPulsed] = useState(() => {
    try {
      return sessionStorage.getItem(PULSE_SESSION_KEY) === '1';
    } catch {
      return false;
    }
  });
  const clickTimer = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(() => {
    if (dismissed || hasPulsed) return;
    const t = setTimeout(() => {
      setHasPulsed(true);
      try {
        sessionStorage.setItem(PULSE_SESSION_KEY, '1');
      } catch {}
    }, 3000);
    return () => clearTimeout(t);
  }, [dismissed, hasPulsed]);

  useEffect(() => {
    return () => {
      if (clickTimer.current) clearTimeout(clickTimer.current);
    };
  }, []);

  const handleClick = useCallback(() => {
    window.open(DISCORD_URL, '_blank', 'noopener,noreferrer');
    setClicked(true);
    clickTimer.current = setTimeout(() => setClicked(false), 3000);
  }, []);

  const handleDismiss = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setDismissed(true);
    try {
      localStorage.setItem(STORAGE_KEY, '1');
    } catch {}
  }, []);

  if (dismissed) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 1 }}
        className="fixed bottom-6 right-6 z-50 hidden md:block"
      >
        <div
          className="relative group"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {/* Dismiss button — visible on hover */}
          <button
            type="button"
            onClick={handleDismiss}
            className="absolute -top-2 -right-2 z-10 rounded-full border border-border bg-card p-1 text-muted-foreground shadow-md opacity-0 transition-opacity group-hover:opacity-100 hover:bg-muted hover:text-foreground"
            aria-label="Dismiss Discord button"
          >
            <X className="h-3 w-3" />
          </button>

          <button
            type="button"
            onClick={handleClick}
            className={cn(
              'relative flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground shadow-lg transition-all duration-300 hover:shadow-xl hover:border-[#5865F2]/50',
              !hasPulsed && 'animate-[pulse-once_2s_ease-in-out_1.5s_1]'
            )}
          >
            {clicked ? (
              <>
                <Check className="h-4.5 w-4.5 text-emerald-500" />
                <span className="text-emerald-500 whitespace-nowrap">See you there!</span>
              </>
            ) : (
              <>
                <DiscordIcon className="h-4.5 w-4.5 text-[#5865F2]" />
                <span className="whitespace-nowrap">Join Community</span>
                <AnimatePresence>
                  {hovered && (
                    <motion.span
                      initial={{ width: 0, opacity: 0 }}
                      animate={{ width: 'auto', opacity: 1 }}
                      exit={{ width: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden whitespace-nowrap text-muted-foreground"
                    >
                      — Get updates & contribute →
                    </motion.span>
                  )}
                </AnimatePresence>
              </>
            )}
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
