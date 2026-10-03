import { motion, useReducedMotion, useInView } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'

export function MathAnimation({ children }: { children: React.ReactNode }) {
  const prefersReducedMotion = useReducedMotion()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.2 })
  const [phase, setPhase] = useState<'start' | 'point' | 'curve' | 'data' | 'pattern' | 'model' | 'settled'>(prefersReducedMotion ? 'settled' : 'start')

  useEffect(() => {
    if (prefersReducedMotion) return
    if (!isInView) {
      setPhase('start')
      return
    }
    
    // Sequence orchestration matching POINT → CURVE → DATA → PATTERN → MODEL → IDENTITY
    const timers = [
      setTimeout(() => setPhase('point'), 200),      // 0.2s: Single point
      setTimeout(() => setPhase('curve'), 800),      // 0.8s: Mathematical curve
      setTimeout(() => setPhase('data'), 1400),      // 1.4s: Data points appear
      setTimeout(() => setPhase('pattern'), 2000),   // 2.0s: Pattern organizes
      setTimeout(() => setPhase('model'), 2600),     // 2.6s: Model learning
      setTimeout(() => setPhase('settled'), 3200)    // 3.2s: Identity reveal
    ]
    return () => timers.forEach(clearTimeout)
  }, [isInView, prefersReducedMotion])

  const isComplete = phase === 'settled' || prefersReducedMotion

  return (
    <div ref={ref} className="math-animation-wrapper" style={{ position: 'relative', width: '100%' }}>
      {/* SVG Animation Canvas */}
      {!isComplete && (
        <svg 
          className="math-canvas"
          viewBox="0 0 600 400" 
          style={{ 
            position: 'absolute', 
            inset: 0, 
            width: '100%', 
            height: '100%', 
            pointerEvents: 'none',
            zIndex: 10 
          }}
        >
          {/* Phase 1: Coordinate Point */}
          <motion.circle 
            cx="50" cy="200" r="4" fill="var(--pale-mint)"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: phase !== 'start' ? 1 : 0, scale: phase !== 'start' ? 1 : 0 }}
            transition={{ duration: 0.4 }}
          />

          {/* Phase 2: Mathematical Curve f(x) */}
          <motion.path 
            d="M 50 200 C 150 200, 250 50, 350 200 S 450 350, 550 200"
            fill="transparent" stroke="var(--pale-mint)" strokeWidth="2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: phase === 'curve' || phase === 'data' || phase === 'pattern' ? 1 : 0,
              opacity: phase === 'curve' || phase === 'data' || phase === 'pattern' ? 1 : 0 
            }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          />
          <motion.text 
            x="240" y="40" fill="var(--pale-mint)" fontSize="16" fontFamily="var(--mono)" fontStyle="italic"
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === 'curve' || phase === 'data' || phase === 'pattern' ? 0.7 : 0 }}
            transition={{ duration: 0.4 }}
          >
            f(x)
          </motion.text>

          {/* Phase 3 & 4: Data points appear & form patterns */}
          {[
            { cx: 120, cy: 175 },
            { cx: 200, cy: 95 },
            { cx: 280, cy: 115 },
            { cx: 380, cy: 260 },
            { cx: 480, cy: 290 },
            { cx: 520, cy: 230 }
          ].map((pt, i) => (
            <motion.circle 
              key={`data-${i}`} cx={pt.cx} cy={pt.cy} r="3" fill="var(--warm-grey)"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: phase === 'data' || phase === 'pattern' || phase === 'model' ? 1 : 0, 
                scale: phase === 'data' || phase === 'pattern' || phase === 'model' ? 1 : 0,
                cx: phase === 'pattern' || phase === 'model' ? 250 + (i * 20) : pt.cx,
                cy: phase === 'pattern' || phase === 'model' ? 200 + (i % 2 === 0 ? 30 : -30) : pt.cy
              }}
              transition={{ duration: 0.6, delay: phase === 'data' ? i * 0.1 : 0 }}
            />
          ))}

          {/* Phase 5: Model connections */}
          <motion.g 
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === 'pattern' || phase === 'model' ? 0.5 : 0 }}
            transition={{ duration: 0.4 }}
          >
             <line x1="250" y1="230" x2="270" y2="170" stroke="var(--warm-grey)" strokeWidth="1" />
             <line x1="270" y1="170" x2="290" y2="230" stroke="var(--warm-grey)" strokeWidth="1" />
             <line x1="290" y1="230" x2="310" y2="170" stroke="var(--warm-grey)" strokeWidth="1" />
             <line x1="310" y1="170" x2="330" y2="230" stroke="var(--warm-grey)" strokeWidth="1" />
             <line x1="330" y1="230" x2="350" y2="170" stroke="var(--warm-grey)" strokeWidth="1" />
             <text x="290" y="150" fill="var(--pale-mint)" fontSize="12" fontFamily="var(--mono)" fontStyle="italic">f(x) → Model</text>
          </motion.g>

          {/* Phase 6: Construct lines indicating learning */}
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === 'model' ? 0.6 : 0 }}
            transition={{ duration: 0.4 }}
          >
            <line x1="0" y1="20" x2="600" y2="20" stroke="var(--pale-mint)" strokeWidth="1" strokeDasharray="4 4" />
            <line x1="0" y1="120" x2="600" y2="120" stroke="var(--warm-grey)" strokeWidth="1" />
            <line x1="20" y1="0" x2="20" y2="400" stroke="var(--pale-mint)" strokeWidth="1" />
          </motion.g>
        </svg>
      )}

      {/* Final Identity Reveal */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ 
          opacity: phase === 'model' || phase === 'settled' ? 1 : 0,
          y: phase === 'model' || phase === 'settled' ? 0 : 10
        }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        style={{ position: 'relative', zIndex: 20 }}
      >
        {children}
      </motion.div>

      {/* Subtle lingering elements in final state */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: phase === 'settled' ? 0.15 : 0 }}
        transition={{ duration: 1 }}
        style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}
      >
        <svg width="100%" height="100%">
          <circle cx="20" cy="40" r="2" fill="var(--warm-grey)" />
          <circle cx="480" cy="180" r="1.5" fill="var(--pale-mint)" />
          <line x1="0" y1="90" x2="100%" y2="90" stroke="var(--pale-mint)" strokeWidth="1" strokeDasharray="2 8" />
        </svg>
      </motion.div>
    </div>
  )
}
