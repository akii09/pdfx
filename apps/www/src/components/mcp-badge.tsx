import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function MCPBadge() {
  const [phase, setPhase] = useState<'vibe' | 'strike' | 'smart'>('vibe');
  const navigate = useNavigate();

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('strike'), 2200);
    const t2 = setTimeout(() => setPhase('smart'), 2900);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <div className="fixed bottom-6 right-5 z-50">
      <motion.button
        type="button"
        onClick={() => navigate('/mcp')}
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.55, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ scale: 1.06, y: -2 }}
        whileTap={{ scale: 0.96 }}
        className="relative flex flex-col items-center cursor-pointer select-none focus:outline-none"
        aria-label="Open MCP & Skills docs"
      >
        {/* Ambient glow */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-500/30 via-fuchsia-500/20 to-pink-500/20 blur-xl opacity-70 pointer-events-none" />

        {/* Card */}
        <div className="relative z-10 rounded-2xl border border-white/20 bg-zinc-950/90 backdrop-blur-md px-4 pt-2.5 pb-3 shadow-[0_8px_32px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.08)] min-w-[136px] flex flex-col items-center gap-1">
          {/* FOR label */}
          {/* <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-zinc-500 leading-none">
            For
          </span> */}

          {/* Animated text block */}
          <div className="flex flex-col items-center gap-0.5">
            {/* Vibe Coders + strikethrough */}
            <div className="relative">
              <span className="text-[13px] font-bold tracking-tight text-zinc-300 leading-none">
                Vibe Coders
              </span>
              <AnimatePresence>
                {(phase === 'strike' || phase === 'smart') && (
                  <motion.div
                    className="absolute inset-y-0 my-auto left-0 h-[1.5px] bg-gradient-to-r from-violet-400 to-pink-400 rounded-full"
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                  />
                )}
              </AnimatePresence>
            </div>

            {/* Smart Coders */}
            <AnimatePresence>
              {phase === 'smart' && (
                <motion.span
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="text-[13px] font-bold tracking-tight leading-none bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent"
                >
                  Smart Coders ✦
                </motion.span>
              )}
            </AnimatePresence>
          </div>

          {/* Shimmer rule */}
          <div className="mt-0.5 h-[1px] w-full bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />

          {/* MCP chip */}
          <div className="flex items-center gap-1 mt-0.5">
            <span className="h-1 w-1 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[9px] font-mono font-medium text-zinc-500 tracking-widest uppercase">
              MCP + Skills
            </span>
          </div>
        </div>
      </motion.button>
    </div>
  );
}
