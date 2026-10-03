import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { PageTransition } from './PageTransition'

export function NotFound() {
  return (
    <PageTransition>
      <section className="section not-found-section" id="notfound" style={{ minHeight: 'calc(100vh - 150px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="container" style={{ position: 'relative', textAlign: 'center', maxWidth: '600px' }}>
          
          <div className="not-found-visual" style={{ position: 'relative', marginBottom: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '180px' }}>
             
             {/* 404 */}
             <motion.h1 
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.6, ease: "easeOut" }}
               style={{ fontSize: 'clamp(80px, 15vw, 150px)', margin: 0, lineHeight: 1, color: 'var(--text-heading)', zIndex: 2 }}
             >
               404
             </motion.h1>

             {/* Broken Curve SVG */}
             <motion.svg 
               viewBox="0 0 200 100" 
               style={{ position: 'absolute', width: '150%', height: '150%', top: '-25%', left: '-25%', pointerEvents: 'none', zIndex: 1 }}
             >
               {/* Left part of curve */}
               <motion.path 
                 d="M 0 80 Q 50 80 80 50 T 100 20" 
                 fill="none" 
                 stroke="var(--pale-mint)" 
                 strokeWidth="1.5"
                 initial={{ pathLength: 0, opacity: 0 }}
                 animate={{ pathLength: 1, opacity: 0.5 }}
                 transition={{ duration: 1, delay: 0.4, ease: "easeInOut" }}
               />
               {/* Right part of curve (broken) */}
               <motion.path 
                 d="M 120 40 Q 150 70 200 30" 
                 fill="none" 
                 stroke="var(--pale-mint)" 
                 strokeWidth="1.5"
                 initial={{ pathLength: 0, opacity: 0 }}
                 animate={{ pathLength: 1, opacity: 0.5 }}
                 transition={{ duration: 1, delay: 0.6, ease: "easeInOut" }}
               />
             </motion.svg>

             {/* Data points */}
             <motion.div
               initial={{ opacity: 0, scale: 0 }}
               animate={{ opacity: 0.7, scale: 1 }}
               transition={{ duration: 0.5, delay: 1 }}
               style={{ position: 'absolute', top: '25%', left: '42%', width: '4px', height: '4px', background: 'var(--pale-mint)', borderRadius: '50%' }}
             />
             <motion.div
               initial={{ opacity: 0, scale: 0 }}
               animate={{ opacity: 0.7, scale: 1 }}
               transition={{ duration: 0.5, delay: 1.1 }}
               style={{ position: 'absolute', top: '65%', left: '58%', width: '4px', height: '4px', background: 'var(--pale-mint)', borderRadius: '50%' }}
             />
             <motion.div
               initial={{ opacity: 0, scale: 0 }}
               animate={{ opacity: 0.4, scale: 1 }}
               transition={{ duration: 0.5, delay: 1.2 }}
               style={{ position: 'absolute', top: '40%', left: '65%', width: '3px', height: '3px', background: 'var(--pale-mint)', borderRadius: '50%' }}
             />
          </div>

          {/* Text content */}
          <motion.div
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.6, delay: 1.4 }}
          >
            <h2 style={{ fontSize: '32px', marginBottom: '16px' }}>This path doesn't exist.</h2>
            <p style={{ color: 'var(--text-meta)', marginBottom: '40px', fontSize: '16px' }}>
              The page you're looking for may have moved or no longer exists.
            </p>
          </motion.div>

          {/* Button */}
          <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ duration: 0.6, delay: 1.8 }}
          >
            <Link to="/" className="button button-primary">
              <span aria-hidden="true" style={{ transform: 'none', marginRight: '8px' }}>←</span> Back to Home
            </Link>
          </motion.div>
          
        </div>
      </section>
    </PageTransition>
  )
}
