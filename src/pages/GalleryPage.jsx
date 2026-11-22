import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ArrowRight, Image as ImageIcon } from 'lucide-react';
import { GALLERY_DATA } from '../data/galleryData.js';
import '../styles/gallery.css';

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Lakes & Rivers', 'Peaks & Treks', 'Resorts & Heritage', 'Villages & Valleys', 'Coastal & Beaches'];

  const filteredPhotos = activeCategory === 'All'
    ? GALLERY_DATA
    : GALLERY_DATA.filter(p => p.category === activeCategory);

  return (
    <main className="container" style={{ padding: '2.5rem 1.25rem 4rem' }}>
      {/* Header */}
      <div style={{ marginBottom: '2rem', textAlign: 'center', maxWidth: '700px', margin: '0 auto 2.5rem' }}>
        <div className="urdu-text" style={{ fontSize: '1.6rem', color: 'var(--primary)' }}>سیاحتی مقامات کی تصویری گیلری</div>
        <h1 style={{ fontSize: '2.4rem', marginBottom: '0.75rem' }}>Picturesque Destinations Across Pakistan</h1>
        <p style={{ color: '#64748b', fontSize: '1rem' }}>
          Explore the stunning landscapes, heritage monuments, and turquoise alpine waters where Pakistan ki Sair leads unforgettable expeditions.
        </p>
      </div>

      {/* Category Pills */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center', marginBottom: '2.5rem' }}>
        {categories.map(cat => (
          <button
            key={cat}
            type="button"
            onClick={() => setActiveCategory(cat)}
            className={`btn btn-sm ${activeCategory === cat ? 'btn-primary' : 'btn-secondary'}`}
            style={{ borderRadius: 'var(--radius-full)', padding: '0.45rem 1rem' }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="gallery-grid">
        {filteredPhotos.map(item => (
          <article key={item.id} className="gallery-card">
            <div className="gallery-image-wrap">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="gallery-image"
                loading="lazy"
              />
              <span className="gallery-category-badge">{item.category}</span>
            </div>

            <div className="gallery-body">
              <div className="gallery-urdu" lang="ur">{item.urduTitle}</div>
              <h2 className="gallery-title">{item.title}</h2>
              <div className="gallery-location">
                <MapPin size={13} color="var(--primary)" aria-hidden="true" />
                <span>{item.location} ({item.region})</span>
              </div>
              <p className="gallery-desc">{item.description}</p>

              <div className="gallery-footer">
                <span className="badge badge-primary">{item.region}</span>
                <Link
                  to={`/tours/${item.relatedTourId}`}
                  className="btn btn-secondary btn-sm"
                  style={{ fontSize: '0.8rem', padding: '0.35rem 0.65rem' }}
                >
                  <span>View Tour</span>
                  <ArrowRight size={13} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
