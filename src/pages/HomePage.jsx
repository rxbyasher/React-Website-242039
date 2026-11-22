import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Users, Sparkles, HeartPulse, ShieldCheck, ArrowRight, Star, Image as ImageIcon } from 'lucide-react';
import TourCard from '../components/TourCard.jsx';
import { TOURS_DATA } from '../data/toursData.js';
import { REVIEWS_DATA } from '../data/reviewsData.js';
import '../styles/home.css';

export default function HomePage() {
  const featuredTours = TOURS_DATA.slice(0, 3);
  const featuredReviews = REVIEWS_DATA.slice(0, 3);

  return (
    <main>
      {/* Hero Section */}
      <section className="hero-section" aria-label="Welcome Banner">
        <div className="container">
          <div className="hero-content">
            <div className="hero-urdu" lang="ur">پاکستان کی سیر</div>
            <h1 className="hero-title">Discover the Soul & Splendour of Pakistan</h1>
            <p className="hero-desc">
              Immerse yourself in legendary alpine peaks, emerald valleys, historic Mughal fortresses, and pristine coastal waters. Customizable packages, upfront safety triage, and group discounts designed for Pakistani travelers and families.
            </p>
            <div className="hero-actions">
              <Link to="/tours" className="btn btn-primary btn-lg">
                <Compass size={20} aria-hidden="true" />
                <span>Explore Tour Packages</span>
              </Link>
              <Link to="/book" className="btn btn-secondary btn-lg" style={{ background: 'rgba(255, 255, 255, 0.95)' }}>
                <span>Build Custom Trip</span>
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Stats Bar */}
      <section className="stats-bar" aria-label="Key Highlights">
        <div className="container stats-grid">
          <div className="stat-item">
            <div className="stat-number">12+</div>
            <div className="stat-label">Iconic Destinations Across All Provinces</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">12,500+</div>
            <div className="stat-label">Happy Families, Students & Explorers</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">4.9 / 5.0</div>
            <div className="stat-label">Verified Traveler Review Rating</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">100%</div>
            <div className="stat-label">Certified First-Aid & Mountain Guides</div>
          </div>
        </div>
      </section>

      {/* Featured Tours Section */}
      <section className="section-padding">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Top Rated Journeys</span>
            <h2 className="section-title">Popular Expedition Packages</h2>
            <p className="section-desc">
              From Hunza's golden terraces to Skardu's cold desert and Kashmir's pine haven, choose your next unforgettable getaway.
            </p>
          </div>

          <div className="grid-3">
            {featuredTours.map(tour => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>

          <div className="text-center mt-4">
            <Link to="/tours" className="btn btn-outline-primary btn-lg">
              <span>View All 12 Expedition Packages</span>
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Pakistan ki Sair - Solving Reference Site UX Problems */}
      <section className="section-padding" style={{ background: '#f8fafc', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Our Promise</span>
            <h2 className="section-title">Why Travel With Pakistan ki Sair?</h2>
            <p className="section-desc">
              We addressed the biggest frustrations on conventional tour sites: rigid packages, hidden costs, and zero medical screening for high-altitude treks.
            </p>
          </div>

          <div className="grid-3">
            <div className="feature-box">
              <div className="feature-icon-wrap">
                <Sparkles size={26} aria-hidden="true" />
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.6rem' }}>Customizable Budgets</h3>
              <p style={{ color: '#64748b', fontSize: '0.92rem' }}>
                Don't pay for what you don't need. Deduct transport if bringing your own vehicle, remove pre-fixed meals to explore local food streets, or upgrade to luxury suites.
              </p>
            </div>

            <div className="feature-box">
              <div className="feature-icon-wrap">
                <HeartPulse size={26} aria-hidden="true" />
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.6rem' }}>Upfront Medical Triage</h3>
              <p style={{ color: '#64748b', fontSize: '0.92rem' }}>
                Northern treks exceed 3,000m. We screen for asthma, cardiac conditions, and allergies during booking so guides carry adequate oxygen and safety supplies.
              </p>
            </div>

            <div className="feature-box">
              <div className="feature-icon-wrap">
                <Users size={26} aria-hidden="true" />
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.6rem' }}>Family & Community Discounts</h3>
              <p style={{ color: '#64748b', fontSize: '0.92rem' }}>
                Automatic 5% off for families and groups of 4+ travelers, plus an instant 10% discount for community members with coupon code <code>SAIR10</code>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Sneak Peek */}
      <section className="section-padding">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Real Traveler Stories</span>
            <h2 className="section-title">Reviews From Individuals & Families</h2>
            <p className="section-desc">
              See what solo travelers, extended families, and university friend groups have to say after returning from their trips.
            </p>
          </div>

          <div className="grid-3">
            {featuredReviews.map(rev => (
              <div key={rev.id} className="card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                  <img
                    src={rev.avatar}
                    alt={rev.name}
                    style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }}
                  />
                  <div>
                    <h4 style={{ fontSize: '1rem', marginBottom: '0.15rem' }}>{rev.name}</h4>
                    <span style={{ fontSize: '0.8rem', color: '#64748b' }}>{rev.role} • {rev.city}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.2rem', marginBottom: '0.75rem' }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={15} color="#f59e0b" fill="#f59e0b" aria-hidden="true" />
                  ))}
                </div>

                <p style={{ fontSize: '0.9rem', color: '#334155', fontStyle: 'italic', flex: 1, marginBottom: '1rem' }}>
                  "{rev.comment}"
                </p>

                <div style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: '600', borderTop: '1px solid var(--border)', paddingTop: '0.75rem' }}>
                  Tour: {rev.tourTitle}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-3">
            <Link to="/reviews" className="btn btn-secondary">
              <Star size={16} aria-hidden="true" />
              <span>Read All Customer Testimonials</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
