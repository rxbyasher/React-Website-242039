import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Mountain, Star, Users, ArrowRight } from 'lucide-react';
import { formatPKR } from '../utils/formatters.js';
import { HIGH_ALTITUDE_THRESHOLD_METERS } from '../utils/pricingRules.js';

export default function TourCard({ tour }) {
  const [imageError, setImageError] = useState(false);

  const fallbackImage = 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=800&q=80';
  const isHighAltitude = (tour.baseAltitudeMeters >= HIGH_ALTITUDE_THRESHOLD_METERS) || (tour.maxAltitudeMeters >= HIGH_ALTITUDE_THRESHOLD_METERS);
  const isSoldOut = !tour.isAvailable || tour.availableSeats <= 0;

  return (
    <article className="tour-card" aria-labelledby={`tour-title-${tour.id}`}>
      {/* Image with badges */}
      <div className="tour-card-image-wrap">
        <img
          src={imageError ? fallbackImage : tour.featuredImage}
          alt={tour.title}
          className="tour-card-image"
          loading="lazy"
          onError={() => setImageError(true)}
        />
        <div className="tour-card-badges">
          <span className="badge badge-primary">
            {tour.region}
          </span>
          {isSoldOut ? (
            <span className="badge badge-danger">Sold Out</span>
          ) : isHighAltitude ? (
            <span className="badge badge-warning" title="High altitude trek: Medical clearance required for pre-existing conditions">
              <Mountain size={11} aria-hidden="true" /> Altitude 3,000m+
            </span>
          ) : (
            <span className="badge badge-accent">
              {tour.availableSeats} Seats Left
            </span>
          )}
        </div>
      </div>

      {/* Card Content */}
      <div className="tour-card-body">
        <div className="tour-card-urdu" lang="ur">{tour.urduTitle}</div>
        <h3 id={`tour-title-${tour.id}`} className="tour-card-title">
          <Link to={`/tours/${tour.id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
            {tour.title}
          </Link>
        </h3>

        <div className="tour-card-meta">
          <span className="meta-item">
            <Calendar size={14} color="#64748b" aria-hidden="true" />
            <span>{tour.durationDays} Days / {tour.durationNights} Nights</span>
          </span>
          <span className="meta-item">
            <Star size={14} color="#f59e0b" fill="#f59e0b" aria-hidden="true" />
            <span>{tour.rating} ({tour.reviewCount})</span>
          </span>
          <span className="meta-item">
            <MapPin size={14} color="#64748b" aria-hidden="true" />
            <span>From {tour.departureCity}</span>
          </span>
        </div>

        <p className="tour-card-tagline">{tour.tagline}</p>

        {/* Card Footer */}
        <div className="tour-card-footer">
          <div className="tour-price-box">
            <span className="price-label">Starting From</span>
            <span className="price-value">
              {formatPKR(tour.pricePerPerson)}
              <span className="price-unit"> / person</span>
            </span>
          </div>

          <Link
            to={`/tours/${tour.id}`}
            className="btn btn-primary btn-sm"
            aria-label={`View details and customize package for ${tour.title}`}
          >
            <span>Explore</span>
            <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}
