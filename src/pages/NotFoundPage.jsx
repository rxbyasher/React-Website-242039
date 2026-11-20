import React from 'react';
import { Link } from 'react-router-dom';
import { MapPinOff, Home, Compass } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <main className="container state-container" style={{ padding: '6rem 1.5rem' }}>
      <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#fee2e2', color: 'var(--danger)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
        <MapPinOff size={44} aria-hidden="true" />
      </div>

      <div className="urdu-text" style={{ fontSize: '1.6rem', color: 'var(--primary)', marginBottom: '0.25rem' }}>
        صفحہ دستیاب نہیں ہے
      </div>

      <h1 className="state-title" style={{ fontSize: '2rem' }}>404 - Expedition Not Found</h1>
      <p className="state-desc" style={{ maxWidth: '500px', margin: '0 auto 2rem' }}>
        The mountain path or page you are looking for does not exist or has been relocated. Let's get you back on the right trail.
      </p>

      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
        <Link to="/" className="btn btn-secondary">
          <Home size={16} aria-hidden="true" />
          <span>Back to Home</span>
        </Link>
        <Link to="/tours" className="btn btn-primary">
          <Compass size={16} aria-hidden="true" />
          <span>Browse Tour Packages</span>
        </Link>
      </div>
    </main>
  );
}
