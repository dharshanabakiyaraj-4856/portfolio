import { motion, useReducedMotion, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'

type PaperIntensity = 'strong' | 'elegant' | 'subtle'

type CrumpledPaperRevealProps = {
  children: ReactNode
  intensity?: PaperIntensity
  className?: string
}

const paperVariants: Record<PaperIntensity, Variants> = {
  strong: {
    hidden: { opacity: 0, scale: 0.88, y: 24, rotateX: -13, rotateY: 8, rotateZ: -2.5, transformPerspective: 1100, transformOrigin: '50% 0%' },
    visible: { opacity: 1, scale: 1, y: 0, rotateX: 0, rotateY: 0, rotateZ: 0, transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] } },
  },
  elegant: {
    hidden: { opacity: 0, scale: 0.93, y: 18, rotateX: -8, rotateY: 5, rotateZ: -1.5, transformPerspective: 1100, transformOrigin: '50% 0%' },
    visible: { opacity: 1, scale: 1, y: 0, rotateX: 0, rotateY: 0, rotateZ: 0, transition: { duration: 1.35, ease: [0.22, 1, 0.36, 1] } },
  },
  subtle: {
    hidden: { opacity: 0, scale: 0.97, y: 12, rotateX: -4, rotateY: 2, rotateZ: -0.75, transformPerspective: 1000, transformOrigin: '50% 0%' },
    visible: { opacity: 1, scale: 1, y: 0, rotateX: 0, rotateY: 0, rotateZ: 0, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } },
  },
}

const reducedPaperVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.01 } },
}

export function CrumpledPaperReveal({ children, intensity = 'elegant', className = '' }: CrumpledPaperRevealProps) {
  const prefersReducedMotion = useReducedMotion()
  const variants = prefersReducedMotion ? reducedPaperVariants : paperVariants[intensity]

  return <motion.div className={`crumpled-paper crumpled-paper-${intensity} ${className}`.trim()} variants={variants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
    {children}
  </motion.div>
}
