import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Heart, Shield } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{ background: '#0f172a', color: '#94a3b8', marginTop: 'auto', borderTop: '1px solid #1e293b', width: '100%', maxWidth: '100%', overflowX: 'hidden', boxSizing: 'border-box' }}>
      <div className="container" style={{ padding: '3.5rem 1.25rem 2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2.5rem', marginBottom: '2.5rem' }}>
          
          {/* Brand Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
              <span style={{ fontSize: '1.8rem' }} role="img" aria-label="Pakistan Flag">🇵🇰</span>
              <div>
                <h3 className="urdu-text" style={{ color: '#ffffff', fontSize: '1.6rem', lineHeight: '1' }}>پاکستان کی سیر</h3>
                <span style={{ fontSize: '0.8rem', color: '#34d399', fontWeight: '700', letterSpacing: '0.05em' }}>PAKISTAN KI SAIR</span>
              </div>
            </div>
            <p style={{ fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '1.25rem' }}>
              Curated tourism expeditions, family retreats, and customized group adventures across Pakistan. Discover the majesty of the Karakoram, Himalayas, lush valleys, and heritage trails with complete peace of mind.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#10b981', fontSize: '0.85rem' }}>
              <Shield size={16} aria-hidden="true" />
              <span>Verified Tour Operators & High-Altitude First Aid Trained</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '1rem', marginBottom: '1rem', borderBottom: '2px solid #047857', paddingBottom: '0.4rem', display: 'inline-block' }}>
              Explore Pakistan
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.9rem' }}>
              <li><Link to="/tours" style={{ color: '#cbd5e1', textDecoration: 'none' }}>All Tour Packages</Link></li>
              <li><Link to="/gallery" style={{ color: '#cbd5e1', textDecoration: 'none' }}>Scenic Destinations Gallery</Link></li>
              <li><Link to="/reviews" style={{ color: '#cbd5e1', textDecoration: 'none' }}>Customer Stories & Reviews</Link></li>
              <li><Link to="/book" style={{ color: '#cbd5e1', textDecoration: 'none' }}>Custom Package Planner</Link></li>
            </ul>
          </div>

          {/* Operating Rules & Safety */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '1rem', marginBottom: '1rem', borderBottom: '2px solid #047857', paddingBottom: '0.4rem', display: 'inline-block' }}>
              Operating Standards
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.85rem' }}>
              <li><strong>Group Capacity:</strong> 1 to 12 travelers per online booking</li>
              <li><strong>Medical Screening:</strong> Altitude clearance for trips &gt;3,000m</li>
              <li><strong>Family Tier:</strong> 5% discount for groups of 4+ members</li>
              <li><strong>Community Discount:</strong> 10% off with coupon code <code>SAIR10</code></li>
            </ul>
          </div>

          {/* Contact & Departure Hubs */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '1rem', marginBottom: '1rem', borderBottom: '2px solid #047857', paddingBottom: '0.4rem', display: 'inline-block' }}>
              Departure Hubs & Support
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.88rem' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <MapPin size={16} color="#34d399" aria-hidden="true" />
                <span>Islamabad Office: F-7 Markaz / Blue Area</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Phone size={16} color="#34d399" aria-hidden="true" />
                <span>Support: +92 51 289 1234 (24/7 Helpline)</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Mail size={16} color="#34d399" aria-hidden="true" />
                <span>info@pakistankisair.pk</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Academic / Copyright Footer */}
        <div style={{ borderTop: '1px solid #1e293b', paddingTop: '1.5rem', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', fontSize: '0.8rem', color: '#64748b' }}>
          <p>© {new Date().getFullYear()} پاکستان کی سیر (Pakistan ki Sair). All simulated rights reserved.</p>
          <p style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            FAST NUCES Islamabad | Web Programming CS4032 Assignment 2
          </p>
        </div>
      </div>
    </footer>
  );
}
