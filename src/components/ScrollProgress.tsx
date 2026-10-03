import { motion, useScroll, useReducedMotion } from 'framer-motion'

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) return null

  return (
    <motion.div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '2px',
        backgroundColor: 'var(--dusty-mauve)',
        scaleX: scrollYProgress,
        transformOrigin: '0%',
        zIndex: 10000,
        opacity: 0.7
      }}
    />
  )
}
