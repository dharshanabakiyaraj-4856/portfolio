import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion || window.matchMedia('(pointer: coarse)').matches) return

    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    const updateHoverState = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isInteractable = 
        window.getComputedStyle(target).cursor === 'pointer' ||
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button'
      
      setIsHovering(isInteractable)
    }

    window.addEventListener('mousemove', updatePosition)
    window.addEventListener('mouseover', updateHoverState)

    return () => {
      window.removeEventListener('mousemove', updatePosition)
      window.removeEventListener('mouseover', updateHoverState)
    }
  }, [prefersReducedMotion])

  if (prefersReducedMotion || window.matchMedia('(pointer: coarse)').matches) return null

  return (
    <motion.div
      className="custom-cursor"
      animate={{
        x: position.x - (isHovering ? 15 : 4),
        y: position.y - (isHovering ? 15 : 4),
        scale: isHovering ? 1 : 0.5,
        opacity: isHovering ? 0.3 : 0.6
      }}
      transition={{ type: 'tween', ease: 'backOut', duration: 0.15 }}
      style={{
        position: 'fixed',
        top: 0, left: 0,
        width: isHovering ? 30 : 8,
        height: isHovering ? 30 : 8,
        borderRadius: '50%',
        backgroundColor: 'var(--dusty-mauve)',
        pointerEvents: 'none',
        zIndex: 9999,
        mixBlendMode: 'screen'
      }}
    />
  )
}
