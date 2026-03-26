import { motion, useScroll } from 'framer-motion';

export function ReadingProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-primary z-[60] origin-left pointer-events-none"
      style={{ scaleX: scrollYProgress }}
    />
  );
}
