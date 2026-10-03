import { useRef, useEffect, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

export function AboutAnimation({ children }: { children: React.ReactNode }) {
  const prefersReducedMotion = useReducedMotion()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.2 })
  const [phase, setPhase] = useState<'start' | 'fragments' | 'connection' | 'identity'>('start')

  useEffect(() => {
    if (prefersReducedMotion) return
    if (!isInView) { setPhase('start'); return }
    const t = [
      setTimeout(() => setPhase('fragments'), 50),
      setTimeout(() => setPhase('connection'), 300),
      setTimeout(() => setPhase('identity'), 700)
    ]
    return () => t.forEach(clearTimeout)
  }, [isInView, prefersReducedMotion])

  const isComplete = phase === 'identity' || prefersReducedMotion
  const frags = [ {x: 10, y: 10}, {x: 80, y: 30}, {x: 30, y: 50}, {x: 100, y: 15} ]

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      {!isComplete && (
        <svg viewBox="0 0 200 60" style={{ position: 'absolute', top: '-60px', left: 0, width: '100%', height: '60px', pointerEvents: 'none', zIndex: 10 }}>
          {frags.map((f, i) => (
             <motion.line key={i}
               x1={f.x} y1={f.y} x2={f.x + 10} y2={f.y} stroke="var(--warm-grey)" strokeWidth="1"
               initial={{ opacity: 0 }}
               animate={{ 
                 opacity: phase === 'fragments' ? 1 : 0,
                 y: phase === 'connection' ? 30 - f.y : 0,
                 x: phase === 'connection' ? 100 - f.x : 0
               }}
               transition={{ duration: 0.4, ease: "easeOut" }}
             />
          ))}
          <motion.line 
             x1="0" y1="30" x2="200" y2="30" stroke="var(--pale-mint)" strokeWidth="1"
             initial={{ pathLength: 0, opacity: 0 }}
             animate={{ pathLength: phase === 'connection' ? 1 : 0, opacity: phase === 'connection' ? 1 : 0 }}
             transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
          />
        </svg>
      )}
      <motion.div
        initial={{ opacity: 0, filter: 'blur(4px)' }}
        animate={{ opacity: phase === 'identity' || prefersReducedMotion ? 1 : 0, filter: phase === 'identity' || prefersReducedMotion ? 'blur(0px)' : 'blur(4px)' }}
        transition={{ duration: 0.6 }}
      >
        {children}
      </motion.div>
    </div>
  )
}

export function ProjectsAnimation({ children }: { children: React.ReactNode }) {
  const prefersReducedMotion = useReducedMotion()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.1 })
  const [phase, setPhase] = useState<'start' | 'input' | 'process' | 'output'>('start')

  useEffect(() => {
    if (prefersReducedMotion) return
    if (!isInView) { setPhase('start'); return }
    const t = [
      setTimeout(() => setPhase('input'), 50),
      setTimeout(() => setPhase('process'), 300),
      setTimeout(() => setPhase('output'), 700)
    ]
    return () => t.forEach(clearTimeout)
  }, [isInView, prefersReducedMotion])

  const isComplete = phase === 'output' || prefersReducedMotion

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      {!isComplete && (
        <svg viewBox="0 0 300 40" style={{ position: 'absolute', top: '-40px', left: 0, width: '100%', height: '40px', pointerEvents: 'none', zIndex: 10 }}>
          <motion.circle cx="50" cy="20" r="3" fill="var(--warm-grey)" initial={{ opacity: 0 }} animate={{ opacity: phase === 'input' ? 1 : 0 }} transition={{ duration: 0.3, ease: "easeOut" }} />
          <motion.circle cx="150" cy="20" r="4" fill="var(--pale-mint)" initial={{ opacity: 0, scale: 0 }} animate={{ opacity: phase === 'process' ? 1 : 0, scale: phase === 'process' ? 1 : 0 }} transition={{ duration: 0.3, ease: "easeOut" }} />
          <motion.path d="M 53 20 L 146 20 M 154 20 L 250 20" stroke="var(--warm-grey)" strokeWidth="1" strokeDasharray="2 2" initial={{ pathLength: 0 }} animate={{ pathLength: phase === 'process' ? 1 : 0 }} transition={{ duration: 0.4, ease: "easeOut" }} />
        </svg>
      )}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: phase === 'output' || prefersReducedMotion ? 1 : 0, y: phase === 'output' || prefersReducedMotion ? 0 : 15 }}
        transition={{ duration: 0.6 }}
      >
        {children}
      </motion.div>
    </div>
  )
}

export function TimelineAnimation({ children, direction = 'vertical' }: { children: React.ReactNode, direction?: 'vertical' | 'horizontal' }) {
  const prefersReducedMotion = useReducedMotion()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.1 })
  const [phase, setPhase] = useState<'start' | 'timeline' | 'growth' | 'milestones'>('start')

  useEffect(() => {
    if (prefersReducedMotion) return
    if (!isInView) { setPhase('start'); return }
    const t = [
      setTimeout(() => setPhase('timeline'), 50),
      setTimeout(() => setPhase('growth'), 300),
      setTimeout(() => setPhase('milestones'), 700)
    ]
    return () => t.forEach(clearTimeout)
  }, [isInView, prefersReducedMotion])

  const isComplete = phase === 'milestones' || prefersReducedMotion
  const isV = direction === 'vertical'

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      {!isComplete && (
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: 'absolute', top: 0, left: isV ? '-20px' : 0, width: isV ? '2px' : '100%', height: isV ? '100%' : '2px', pointerEvents: 'none', zIndex: 10 }}>
           <motion.line 
             x1="0" y1="0" x2={isV ? 0 : 100} y2={isV ? 100 : 0} 
             stroke="var(--pale-mint)" strokeWidth="2" 
             initial={{ pathLength: 0 }} 
             animate={{ pathLength: phase === 'growth' ? 1 : 0 }} 
             transition={{ duration: 0.4, ease: "easeOut" }} 
             vectorEffect="non-scaling-stroke"
           />
        </svg>
      )}
      <motion.div
        initial={{ opacity: 0, x: isV ? 20 : 0, y: isV ? 0 : 20 }}
        animate={{ opacity: phase === 'milestones' || prefersReducedMotion ? 1 : 0, x: phase === 'milestones' || prefersReducedMotion ? 0 : (isV ? 20 : 0), y: phase === 'milestones' || prefersReducedMotion ? 0 : (isV ? 0 : 20) }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </div>
  )
}
