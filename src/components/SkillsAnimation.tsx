import { useRef, useEffect, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

export function SkillsAnimation({ children }: { children: React.ReactNode }) {
  const prefersReducedMotion = useReducedMotion()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.2 })
  const [phase, setPhase] = useState<'start' | 'scatter' | 'cluster' | 'transform' | 'settled'>(prefersReducedMotion ? 'settled' : 'start')

  useEffect(() => {
    if (prefersReducedMotion) return
    if (!isInView) {
      setPhase('start')
      return
    }
    const timers = [
      setTimeout(() => setPhase('scatter'), 50),
      setTimeout(() => setPhase('cluster'), 350),
      setTimeout(() => setPhase('transform'), 750),
      setTimeout(() => setPhase('settled'), 1200)
    ]
    return () => timers.forEach(clearTimeout)
  }, [isInView, prefersReducedMotion])

  const isComplete = phase === 'settled' || prefersReducedMotion

  const clusters = [
    { cx: 150, cy: 80 }, 
    { cx: 350, cy: 150 },
    { cx: 550, cy: 90 }, 
    { cx: 750, cy: 180 },
    { cx: 850, cy: 60 }  
  ]

  const points = Array.from({ length: 30 }).map((_, i) => {
    const targetCluster = clusters[i % 5]
    return {
      id: i,
      startCx: 100 + Math.random() * 800,
      startCy: 30 + Math.random() * 180,
      targetCx: targetCluster.cx + (Math.random() * 50 - 25),
      targetCy: targetCluster.cy + (Math.random() * 50 - 25)
    }
  })

  return (
    <div ref={ref} style={{ position: 'relative', width: '100%', minHeight: '300px' }}>
      {!isComplete && (
        <svg viewBox="0 0 1000 250" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 10 }}>
          {points.map(pt => {
             const cx = phase === 'start' ? pt.startCx : (phase === 'scatter' ? pt.startCx : pt.targetCx)
             const cy = phase === 'start' ? pt.startCy : (phase === 'scatter' ? pt.startCy : pt.targetCy)
             const opacity = phase === 'start' ? 0 : (phase === 'transform' ? 0 : 1)
             return (
               <motion.circle 
                 key={pt.id}
                 r="2.5"
                 fill="var(--pale-mint)"
                 initial={{ cx: pt.startCx, cy: pt.startCy, opacity: 0 }}
                 animate={{ cx, cy, opacity }}
                 transition={{ duration: phase === 'cluster' ? 0.7 : 0.4, ease: "easeInOut" }}
               />
             )
          })}
          {phase === 'cluster' && clusters.map((c, i) => (
             <motion.circle 
                key={`c-${i}`}
                cx={c.cx} cy={c.cy} r="35"
                fill="transparent"
                stroke="var(--warm-grey)"
                strokeWidth="1"
                strokeDasharray="2 4"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.4, scale: 1 }}
                transition={{ duration: 0.6 }}
             />
          ))}
          {phase === 'cluster' && points.map((pt, i) => {
             if (i % 3 !== 0) return null
             const targetCluster = clusters[i % 5]
             return (
               <motion.line 
                 key={`l-${i}`}
                 x1={pt.targetCx} y1={pt.targetCy} x2={targetCluster.cx} y2={targetCluster.cy}
                 stroke="var(--warm-grey)"
                 strokeWidth="0.5"
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 0.3 }}
                 transition={{ duration: 0.4, delay: 0.2 }}
               />
             )
          })}
        </svg>
      )}

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ 
          opacity: phase === 'transform' || phase === 'settled' ? 1 : 0,
          scale: phase === 'transform' || phase === 'settled' ? 1 : 0.98
        }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{ position: 'relative', zIndex: 1 }}
      >
        {children}
      </motion.div>
    </div>
  )
}
