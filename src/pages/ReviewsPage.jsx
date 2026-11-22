import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, Users, User, Heart, MessageSquare, CheckCircle, ArrowRight } from 'lucide-react';
import { REVIEWS_DATA } from '../data/reviewsData.js';
import '../styles/reviews.css';

export default function ReviewsPage() {
  const [filterType, setFilterType] = useState('all');

  const filteredReviews = filterType === 'all'
    ? REVIEWS_DATA
    : REVIEWS_DATA.filter(r => r.category === filterType);

  return (
    <main className="container" style={{ padding: '2.5rem 1.25rem 4rem' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 2.5rem' }}>
        <div className="urdu-text" style={{ fontSize: '1.6rem', color: 'var(--primary)' }}>سیاحوں کے تاثرات و تجربات</div>
        <h1 style={{ fontSize: '2.4rem', marginBottom: '0.75rem' }}>Traveler Reviews & Experiences</h1>
        <p style={{ color: '#64748b', fontSize: '1rem' }}>
          Real feedback from solo adventurers, multi-generational families, and university student friend groups who explored Pakistan with us.
        </p>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
        <button
          type="button"
          onClick={() => setFilterType('all')}
          className={`btn btn-sm ${filterType === 'all' ? 'btn-primary' : 'btn-secondary'}`}
        >
          All Reviews ({REVIEWS_DATA.length})
        </button>
        <button
          type="button"
          onClick={() => setFilterType('family')}
          className={`btn btn-sm ${filterType === 'family' ? 'btn-primary' : 'btn-secondary'}`}
        >
          <Users size={14} aria-hidden="true" />
          <span>Families & Reunions</span>
        </button>
        <button
          type="button"
          onClick={() => setFilterType('individual')}
          className={`btn btn-sm ${filterType === 'individual' ? 'btn-primary' : 'btn-secondary'}`}
        >
          <User size={14} aria-hidden="true" />
          <span>Solo & Couples</span>
        </button>
        <button
          type="button"
          onClick={() => setFilterType('friends')}
          className={`btn btn-sm ${filterType === 'friends' ? 'btn-primary' : 'btn-secondary'}`}
        >
          <Heart size={14} aria-hidden="true" />
          <span>University & Friend Groups</span>
        </button>
      </div>

      {/* Reviews Grid */}
      <div className="reviews-grid">
        {filteredReviews.map(rev => (
          <article key={rev.id} className="review-card">
            <div className="review-author">
              <img
                src={rev.avatar}
                alt={rev.name}
                className="review-avatar"
                loading="lazy"
              />
              <div>
                <h3 style={{ fontSize: '1.05rem', marginBottom: '0.2rem' }}>{rev.name}</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: '#64748b' }}>
                  <span>{rev.role}</span>
                  <span>•</span>
                  <span>{rev.city}</span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', marginBottom: '0.75rem' }}>
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={15}
                  color={i < Math.floor(rev.rating) ? '#f59e0b' : '#cbd5e1'}
                  fill={i < Math.floor(rev.rating) ? '#f59e0b' : 'none'}
                  aria-hidden="true"
                />
              ))}
              <span style={{ fontSize: '0.85rem', fontWeight: '700', marginLeft: '0.3rem', color: 'var(--dark)' }}>
                {rev.rating}.0
              </span>
              <span className="badge badge-primary" style={{ marginLeft: 'auto', fontSize: '0.65rem' }}>
                <CheckCircle size={10} /> Verified Trip
              </span>
            </div>

            {rev.highlight && (
              <div className="review-highlight">
                "{rev.highlight}"
              </div>
            )}

            <p className="review-text">
              "{rev.comment}"
            </p>

            <div className="review-tour-meta">
              <div>
                <span style={{ display: 'block', fontSize: '0.72rem', textTransform: 'uppercase', color: '#94a3b8' }}>Expedition Taken</span>
                <Link to={`/tours/${rev.tourId}`} style={{ color: 'var(--primary)', fontWeight: '600', textDecoration: 'none' }}>
                  {rev.tourTitle}
                </Link>
              </div>
              <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>{rev.date}</span>
            </div>
          </article>
        ))}
      </div>

      {/* Review CTA */}
      <div className="card text-center" style={{ marginTop: '3.5rem', padding: '2.5rem', background: '#f8fafc', border: '1.5px dashed var(--border)' }}>
        <h2 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>Ready to Experience Pakistan with Us?</h2>
        <p style={{ color: '#64748b', fontSize: '0.95rem', maxWidth: '600px', margin: '0 auto 1.5rem' }}>
          Join thousands of travelers who booked their scenic getaways with customizable packages, transparent budget adjustments, and upfront safety planning.
        </p>
        <Link to="/tours" className="btn btn-primary btn-lg">
          <span>Choose Your Expedition</span>
          <ArrowRight size={18} aria-hidden="true" />
        </Link>
      </div>
    </main>
  );
}
