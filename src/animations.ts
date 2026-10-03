import type { Variants } from 'framer-motion'

export const sectionViewport = { once: true, amount: 0.18 }

export const revealVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
}

export const paperUnfoldVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
}

export const heroPaperVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
}

export const reducedRevealVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.01 } },
}

export const staggerVariants: Variants = {
  hidden: {},
  visible: { transition: { delayChildren: 0.08, staggerChildren: 0.1 } },
}

export const reducedStaggerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0 } },
}