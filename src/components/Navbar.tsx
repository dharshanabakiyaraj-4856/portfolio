import { useState } from 'react'
import { portfolioData } from '../data/portfolioData'
import { NavLink } from 'react-router-dom'

const links = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Projects', href: '/projects' },
  { label: 'Achievements', href: '/achievements' },
  { label: 'Contact', href: '/contact' }
]

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const closeMenu = () => setIsMenuOpen(false)

  return (
    <header className="site-header">
      <nav className="navbar container" aria-label="Primary navigation">
        <NavLink className="wordmark" to="/" onClick={closeMenu}>
          <span className="wordmark-mark">P</span>
          <span>{portfolioData.name}</span>
        </NavLink>
        
        <button 
          className="menu-toggle" 
          type="button" 
          aria-expanded={isMenuOpen} 
          aria-controls="primary-menu" 
          aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'} 
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <span />
          <span />
        </button>
        
        <div id="primary-menu" className={`nav-links ${isMenuOpen ? 'is-open' : ''}`}>
          {links.map((link) => (
            <NavLink 
              key={link.href} 
              to={link.href}
              onClick={closeMenu}
              className={({ isActive }) => isActive ? 'active' : ''}
              end={link.href === '/'}
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      </nav>
    </header>
  )
}