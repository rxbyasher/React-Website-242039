import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Compass, Image, Star, Calendar, Menu, X, Tag } from 'lucide-react';
import '../styles/navbar.css';

export default function Navbar({ hasActiveDraft }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <header className="header-nav">
      <div className="container nav-container">
        {/* Brand Logo */}
        <Link to="/" className="brand-link" onClick={closeMenu}>
          <span className="brand-flag" role="img" aria-label="Pakistan Flag">🇵🇰</span>
          <div className="brand-text">
            <span className="brand-urdu">پاکستان کی سیر</span>
            <span className="brand-eng">Pakistan ki Sair</span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav aria-label="Primary Navigation">
          <ul className={`nav-menu ${mobileMenuOpen ? 'open' : ''}`}>
            <li>
              <NavLink to="/" end className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={closeMenu}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/tours" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={closeMenu}>
                <Compass size={16} aria-hidden="true" />
                <span>Tour Packages</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/gallery" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={closeMenu}>
                <Image size={16} aria-hidden="true" />
                <span>Gallery</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/reviews" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={closeMenu}>
                <Star size={16} aria-hidden="true" />
                <span>Reviews</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/book" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={closeMenu}>
                <Calendar size={16} aria-hidden="true" />
                <span>Custom Booking {hasActiveDraft && <span className="badge badge-accent" style={{ fontSize: '0.65rem' }}>Draft</span>}</span>
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* Right CTA / Community Code & Mobile toggle */}
        <div className="nav-actions">
          <div className="badge badge-primary" title="Use coupon SAIR10 for 10% Community Discount">
            <Tag size={13} aria-hidden="true" />
            <span>Code: <strong>SAIR10</strong></span>
          </div>

          <Link to="/tours" className="btn btn-primary btn-sm">
            Book a Tour
          </Link>

          <button
            type="button"
            className="mobile-toggle"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle Navigation Menu"
            onClick={() => setMobileMenuOpen(prev => !prev)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </header>
  );
}
