import { AnimatePresence, motion } from 'framer-motion';
import { Command, Terminal } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function MCPBadge() {
  const [phase, setPhase] = useState<'booting' | 'ready'>('booting');
  const navigate = useNavigate();

  useEffect(() => {
    // Show boot sequence for 4.5 seconds to capture attention
    const t = setTimeout(() => setPhase('ready'), 4500);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <motion.button
        type="button"
        onClick={() => navigate('/mcp')}
        initial={{ opacity: 0, y: 30, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.5 }}
        whileHover={{ scale: 1.05, y: -4 }}
        whileTap={{ scale: 0.95 }}
        className="group relative flex items-center gap-3 cursor-pointer select-none focus:outline-none"
        aria-label="Open MCP & Skills docs"
      >
        {/* Soft shadow instead of colored glow */}
        <div className="absolute -inset-2 rounded-full bg-foreground/5 blur-xl pointer-events-none transition-opacity group-hover:opacity-100 opacity-50" />

        {/* Main Card */}
        <div className="relative z-10 flex items-center gap-3 rounded-full border border-border/50 bg-background/80 shadow-xl backdrop-blur-xl px-4 py-2.5 transition-colors hover:bg-muted/50 group-hover:border-border/80">
          {/* Icon Indicator */}
          <div className="relative flex items-center justify-center p-1.5 rounded-full bg-muted">
            {phase === 'booting' ? (
              <Terminal className="w-4 h-4 text-muted-foreground" />
            ) : (
              <Command className="w-4 h-4 text-foreground" />
            )}
            <span
              className={`absolute -right-0.5 -top-0.5 w-2 h-2 rounded-full border border-background transition-colors duration-500 ${phase === 'ready' ? 'bg-foreground animate-pulse' : 'bg-muted-foreground'}`}
            />
          </div>

          <div className="flex flex-col items-start min-w-[125px]">
            {/* Title / Animation text */}
            <div className="relative h-[20px] flex items-center overflow-hidden w-full">
              <AnimatePresence mode="popLayout">
                {phase === 'booting' ? (
                  <motion.div
                    key="booting"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center gap-1.5 text-[13px] font-mono tracking-tight text-muted-foreground"
                  >
                    <span className="opacity-70">$</span>
                    <span className="relative flex items-center">
                      <motion.span
                        animate={{ backgroundPosition: ['200% 0', '-200% 0'] }}
                        transition={{
                          duration: 2.5,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: 'linear',
                        }}
                        className="bg-gradient-to-r from-muted-foreground/50 via-foreground to-muted-foreground/50 bg-[length:200%_auto] bg-clip-text text-transparent"
                      >
                        mcp connect
                      </motion.span>
                    </span>
                    <motion.span
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{
                        duration: 0.8,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: 'linear',
                      }}
                      className="w-1.5 h-3.5 bg-foreground/80 -ml-0.5"
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key="ready"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, type: 'spring' }}
                    className="flex items-center gap-1.5"
                  >
                    <span className="text-[14px] font-bold tracking-tight text-foreground drop-shadow-sm">
                      Agent Ready
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Subtext */}
            <AnimatePresence mode="wait">
              {phase === 'ready' && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-[10px] font-medium text-muted-foreground tracking-wider uppercase mt-[-2px]"
                >
                  MCP Server Active
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.button>
    </div>
  );
}
