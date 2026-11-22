import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Calendar, MapPin, Mountain, Star, Users, Check, AlertTriangle,
  ArrowLeft, ArrowRight, ShieldCheck, HeartPulse
} from 'lucide-react';
import { tourService } from '../services/tourService.js';
import { formatPKR } from '../utils/formatters.js';
import { storage } from '../utils/storage.js';
import PackageCustomizer from '../components/PackageCustomizer.jsx';
import { HIGH_ALTITUDE_THRESHOLD_METERS } from '../utils/pricingRules.js';
import '../styles/details.css';

export default function TourDetailsPage() {
  const { id } = useParams(); // FR02 parameterized route
  const navigate = useNavigate();

  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Customization state (FR07, FR08)
  const [travelers, setTravelers] = useState(2);
  const [selectedRemovals, setSelectedRemovals] = useState([]);
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [isCommunityMember, setIsCommunityMember] = useState(storage.getCommunityStatus());
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    tourService.getTourById(id, 350)
      .then(data => {
        if (!isMounted) return;
        if (!data) {
          setError('Expedition package not found. The link may be broken or outdated.');
        } else {
          setTour(data);
        }
      })
      .catch(err => {
        if (isMounted) setError(err.message || 'Error loading tour details.');
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => { isMounted = false; };
  }, [id]);

  const handleToggleRemoval = (removalId) => {
    setSelectedRemovals(prev =>
      prev.includes(removalId) ? prev.filter(item => item !== removalId) : [...prev, removalId]
    );
  };

  const handleToggleAddon = (addonId) => {
    setSelectedAddons(prev =>
      prev.includes(addonId) ? prev.filter(item => item !== addonId) : [...prev, addonId]
    );
  };

  const handleApplyCoupon = () => {
    if (couponCode.trim().toUpperCase() === 'SAIR10') {
      setCouponApplied(true);
      setIsCommunityMember(true);
      storage.setCommunityStatus(true);
    } else {
      alert('Invalid coupon code. Try entering "SAIR10" for the 10% community discount.');
    }
  };

  const handleProceedToBooking = () => {
    if (!tour) return;

    // Save draft in storage for persistence (FR13)
    const draftConfig = {
      tourId: tour.id,
      tourTitle: tour.title,
      urduTitle: tour.urduTitle,
      basePricePerPerson: tour.pricePerPerson,
      baseAltitudeMeters: tour.baseAltitudeMeters,
      maxAltitudeMeters: tour.maxAltitudeMeters,
      travelers,
      selectedRemovals,
      selectedAddons,
      isCommunityMember: isCommunityMember || couponApplied,
      updatedAt: new Date().toISOString()
    };

    storage.saveBookingDraft(draftConfig);

    // Navigate to booking checkout page
    navigate(`/book?tourId=${tour.id}`);
  };

  if (loading) {
    return (
      <main className="container state-container" style={{ padding: '5rem 1rem' }}>
        <div className="spinner" aria-hidden="true"></div>
        <h2 className="state-title">Loading Itinerary Details...</h2>
        <p className="state-desc">Fetching day-by-day expedition schedule.</p>
      </main>
    );
  }

  // FR02: Invalid tour ID feedback
  if (error || !tour) {
    return (
      <main className="container state-container card" style={{ padding: '3.5rem 1.5rem', margin: '3rem auto' }}>
        <AlertTriangle className="state-icon" color="var(--warning)" />
        <h2 className="state-title">Tour Not Found</h2>
        <p className="state-desc">{error || 'The requested tour ID does not exist in our catalog.'}</p>
        <Link to="/tours" className="btn btn-primary">
          <ArrowLeft size={16} aria-hidden="true" />
          <span>Browse Available Packages</span>
        </Link>
      </main>
    );
  }

  const isHighAltitude = (tour.baseAltitudeMeters >= HIGH_ALTITUDE_THRESHOLD_METERS) || (tour.maxAltitudeMeters >= HIGH_ALTITUDE_THRESHOLD_METERS);
  const isSoldOut = !tour.isAvailable || tour.availableSeats <= 0;

  return (
    <main className="container" style={{ padding: '2rem 1.25rem 4rem' }}>
      {/* Back Button */}
      <div style={{ marginBottom: '1.25rem' }}>
        <Link to="/tours" className="btn btn-secondary btn-sm" style={{ gap: '0.35rem' }}>
          <ArrowLeft size={14} aria-hidden="true" />
          <span>Back to All Tours</span>
        </Link>
      </div>

      {/* Hero Visual Header */}
      <section
        className="details-hero"
        style={{ backgroundImage: `url(${tour.featuredImage})` }}
        aria-label="Tour Hero Banner"
      >
        <div className="details-hero-overlay" />
        <div className="details-hero-content">
          <div className="details-urdu" lang="ur">{tour.urduTitle}</div>
          <h1 className="details-title">{tour.title}</h1>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center' }}>
            <span className="badge badge-primary">{tour.region}</span>
            <span className="badge badge-accent">{tour.durationDays} Days / {tour.durationNights} Nights</span>
            <span className="badge badge-subtle" style={{ background: 'rgba(255, 255, 255, 0.2)', color: '#ffffff' }}>
              From {tour.departureCity}
            </span>
            {isHighAltitude && (
              <span className="badge badge-warning">
                <Mountain size={12} aria-hidden="true" /> Max Altitude: {tour.maxAltitudeMeters || tour.baseAltitudeMeters}m
              </span>
            )}
          </div>
        </div>
      </section>

      {/* High Altitude Advisory Alert (Rule 2) */}
      {isHighAltitude && (
        <div
          role="note"
          style={{
            background: '#fffbeb',
            border: '1.5px solid #fde68a',
            borderRadius: 'var(--radius-md)',
            padding: '1.25rem',
            marginBottom: '2rem',
            display: 'flex',
            gap: '1rem',
            alignItems: 'flex-start'
          }}
        >
          <HeartPulse size={24} color="#d97706" style={{ flexShrink: 0, marginTop: '0.2rem' }} aria-hidden="true" />
          <div style={{ fontSize: '0.92rem', color: '#92400e' }}>
            <strong style={{ display: 'block', fontSize: '1rem', marginBottom: '0.25rem' }}>
              High-Altitude Mountain Advisory (Operating Rule 2)
            </strong>
            This expedition reaches elevations above 3,000 meters ({tour.maxAltitudeMeters || tour.baseAltitudeMeters}m). Travelers with pre-existing cardiovascular conditions or asthma will be required to confirm medical clearance and provide primary emergency contacts during registration. Our tour escorts carry medical oxygen cylinders and basic first-aid kits on board.
          </div>
        </div>
      )}

      {/* Two-Column Layout: Left (Overview & Itinerary) / Right (Customizer & CTA) */}
      <div className="details-layout">
        
        {/* Left Column */}
        <div>
          {/* Overview */}
          <section className="card" style={{ padding: '1.75rem', marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.4rem', marginBottom: '1rem' }}>Expedition Overview</h2>
            <p style={{ color: '#475569', fontSize: '0.98rem', lineHeight: '1.7', marginBottom: '1.5rem' }}>
              {tour.overview}
            </p>

            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.75rem' }}>Standard Inclusions</h3>
            <ul style={{ listStyle: 'none', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.6rem' }}>
              {tour.includedItems.map((item, idx) => (
                <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: '#334155' }}>
                  <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#dcfce7', color: '#15803d', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Check size={13} />
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Itinerary */}
          <section className="card" style={{ padding: '1.75rem' }}>
            <h2 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>Day-by-Day Expedition Itinerary</h2>
            <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              Crafted for optimal acclimatization, scenic stops, and photography opportunities.
            </p>

            <div className="itinerary-timeline">
              {tour.itinerary.map(item => (
                <div key={item.day} className="itinerary-day">
                  <div className="itinerary-day-bullet" />
                  <div className="itinerary-day-title">Day {item.day}: {item.title}</div>
                  <div className="itinerary-day-desc">{item.desc}</div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column: Customizer & Action */}
        <div>
          <PackageCustomizer
            tour={tour}
            travelers={travelers}
            onTravelersChange={setTravelers}
            selectedRemovals={selectedRemovals}
            onToggleRemoval={handleToggleRemoval}
            selectedAddons={selectedAddons}
            onToggleAddon={handleToggleAddon}
            isCommunityMember={isCommunityMember}
            onToggleCommunityMember={setIsCommunityMember}
            couponCode={couponCode}
            onCouponCodeChange={setCouponCode}
            onApplyCoupon={handleApplyCoupon}
            couponApplied={couponApplied}
          />

          <div style={{ marginTop: '1.25rem' }}>
            <button
              type="button"
              onClick={handleProceedToBooking}
              disabled={isSoldOut}
              className="btn btn-primary btn-lg"
              style={{ width: '100%', fontSize: '1.05rem', padding: '1rem' }}
            >
              <span>{isSoldOut ? 'Sold Out for Selected Dates' : 'Proceed with Custom Package'}</span>
              <ArrowRight size={18} aria-hidden="true" />
            </button>
            <div style={{ textAlign: 'center', marginTop: '0.6rem', fontSize: '0.8rem', color: '#64748b' }}>
              Instant draft save. You can review all traveler details before confirming.
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
