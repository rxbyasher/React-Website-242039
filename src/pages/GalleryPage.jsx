import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ArrowRight, Maximize2, X, Compass } from 'lucide-react';
import { GALLERY_DATA } from '../data/galleryData.js';
import '../styles/gallery.css';

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeModalItem, setActiveModalItem] = useState(null);

  const categories = [
    'All',
    'Lakes & Rivers',
    'Peaks & Treks',
    'Resorts & Heritage',
    'Villages & Valleys',
    'Coastal & Beaches'
  ];

  const filteredPhotos = activeCategory === 'All'
    ? GALLERY_DATA
    : GALLERY_DATA.filter(p => p.category === activeCategory);

  return (
    <main className="container" style={{ padding: '3rem 1.25rem 5rem' }}>
      {/* Spacious Header with Clean Typography */}
      <div className="gallery-section-header">
        <div className="urdu-text" style={{ fontSize: '1.75rem', color: 'var(--primary)', marginBottom: '0.4rem' }}>
          سیاحتی مقامات کی تصویری گیلری
        </div>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#0f172a', marginBottom: '0.85rem' }}>
          Picturesque Destinations Across Pakistan
        </h1>
        <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: '1.6' }}>
          Explore Pakistan's most enchanting valleys, turquoise glacial waters, historic Mughal fortresses, and golden coastal shores. Click any destination card to view in full resolution.
        </p>
      </div>

      {/* Category Pills Bar */}
      <div className="gallery-category-bar" role="tablist" aria-label="Filter gallery by category">
        {categories.map(cat => {
          const count = cat === 'All'
            ? GALLERY_DATA.length
            : GALLERY_DATA.filter(p => p.category === cat).length;

          return (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`category-pill-btn ${activeCategory === cat ? 'active' : ''}`}
              role="tab"
              aria-selected={activeCategory === cat}
            >
              <span>{cat}</span>
              <span style={{ opacity: 0.75, fontSize: '0.8rem', marginLeft: '0.35rem' }}>({count})</span>
            </button>
          );
        })}
      </div>

      {/* High-Readability Gallery Grid */}
      <div className="gallery-grid">
        {filteredPhotos.map(item => (
          <article
            key={item.id}
            className="gallery-card"
            onClick={() => setActiveModalItem(item)}
            title="Click to view full photo and details"
          >
            {/* Visual Cover Wrap */}
            <div className="gallery-image-wrap">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="gallery-image"
                loading="lazy"
              />
              <span className="gallery-category-badge">{item.category}</span>
              <div className="gallery-click-hint">
                <Maximize2 size={18} />
                <span>Click to View Full Photo</span>
              </div>
            </div>

            {/* Content Body with Crisp Contrast & Spacing */}
            <div className="gallery-body">
              <div className="gallery-header-row">
                <div className="gallery-urdu" lang="ur">{item.urduTitle}</div>
                <h2 className="gallery-title">{item.title}</h2>
              </div>

              <div className="gallery-location-tag">
                <MapPin size={14} color="var(--primary)" aria-hidden="true" />
                <span>{item.location} • {item.region}</span>
              </div>

              <p className="gallery-desc">{item.description}</p>

              <div className="gallery-footer" onClick={(e) => e.stopPropagation()}>
                <span className="gallery-region-badge">{item.region}</span>
                <Link
                  to={`/tours/${item.relatedTourId}`}
                  className="btn btn-primary btn-sm"
                  style={{ gap: '0.4rem', padding: '0.45rem 0.9rem' }}
                >
                  <Compass size={14} aria-hidden="true" />
                  <span>Explore Tour</span>
                  <ArrowRight size={13} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Lightbox Modal (Click to Enlarge & Read comfortably) */}
      {activeModalItem && (
        <div
          className="lightbox-overlay"
          onClick={() => setActiveModalItem(null)}
          role="dialog"
          aria-modal="true"
        >
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="lightbox-close-btn"
              onClick={() => setActiveModalItem(null)}
              aria-label="Close photo preview"
            >
              <X size={20} />
            </button>

            <div className="lightbox-image-wrap">
              <img
                src={activeModalItem.imageUrl}
                alt={activeModalItem.title}
                className="lightbox-image"
              />
            </div>

            <div className="lightbox-body">
              <div className="gallery-urdu" lang="ur" style={{ fontSize: '1.6rem', marginBottom: '0.3rem' }}>
                {activeModalItem.urduTitle}
              </div>
              <h2 style={{ fontSize: '1.6rem', fontWeight: '800', color: '#0f172a', marginBottom: '0.5rem' }}>
                {activeModalItem.title}
              </h2>

              <div className="gallery-location-tag" style={{ marginBottom: '1rem' }}>
                <MapPin size={15} color="var(--primary)" aria-hidden="true" />
                <span>{activeModalItem.location} • {activeModalItem.region} ({activeModalItem.category})</span>
              </div>

              <p style={{ color: '#334155', fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '1.5rem' }}>
                {activeModalItem.description}
              </p>

              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', borderTop: '1px solid #e2e8f0', paddingTop: '1rem' }}>
                <button
                  type="button"
                  onClick={() => setActiveModalItem(null)}
                  className="btn btn-secondary"
                >
                  Close
                </button>
                <Link
                  to={`/tours/${activeModalItem.relatedTourId}`}
                  className="btn btn-primary"
                >
                  <Compass size={16} aria-hidden="true" />
                  <span>View Tour Package & Itinerary</span>
                  <ArrowRight size={15} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
