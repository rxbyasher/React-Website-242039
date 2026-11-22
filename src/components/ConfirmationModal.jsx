import React from 'react';
import { CheckCircle, Mail, Calendar, Users, MapPin, Download, Home } from 'lucide-react';
import { formatPKR } from '../utils/formatters.js';

export default function ConfirmationModal({ booking, onClose }) {
  if (!booking) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-modal-title"
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.75)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        zIndex: 2000,
        backdropFilter: 'blur(4px)'
      }}
    >
      <div
        className="card"
        style={{
          width: '100%',
          maxWidth: '560px',
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: '2.25rem',
          textAlign: 'center',
          animation: 'fadeIn 0.2s ease-out'
        }}
      >
        <div style={{ width: '68px', height: '68px', borderRadius: '50%', background: '#ecfdf5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem' }}>
          <CheckCircle size={40} />
        </div>

        <span className="urdu-text" style={{ fontSize: '1.75rem', color: 'var(--primary)', display: 'block', marginBottom: '0.25rem' }}>
          مبارک ہو! آپ کا سفر تیار ہے!
        </span>

        <h2 id="confirm-modal-title" style={{ fontSize: '1.35rem', marginBottom: '0.5rem' }}>
          Booking Confirmed & Ready to Go!
        </h2>

        <p style={{ color: '#64748b', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
          Your travel plans are good to go and you will join the journey soon. We can’t wait to welcome you to the mesmerizing valleys of Pakistan!
        </p>

        {/* Email Alert Banner */}
        <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 'var(--radius-md)', padding: '0.85rem 1rem', display: 'flex', alignItems: 'center', gap: '0.75rem', textAlign: 'left', marginBottom: '1.5rem' }}>
          <Mail size={22} color="#2563eb" style={{ flexShrink: 0 }} aria-hidden="true" />
          <div style={{ fontSize: '0.85rem', color: '#1e40af' }}>
            <strong>Email Dispatched:</strong> A confirmation receipt and travel packing checklist have been dispatched to <u>{booking.primaryTraveler?.email || 'your email'}</u>.
          </div>
        </div>

        {/* Booking Details Card */}
        <div style={{ background: '#f8fafc', borderRadius: 'var(--radius-md)', padding: '1.25rem', textAlign: 'left', border: '1px solid var(--border)', marginBottom: '1.75rem', fontSize: '0.9rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.6rem' }}>
            <span style={{ color: '#64748b' }}>Booking Reference</span>
            <strong style={{ color: 'var(--primary)', fontFamily: 'monospace', fontSize: '1rem' }}>{booking.bookingReference}</strong>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ color: '#64748b' }}>Tour Expedition</span>
            <strong>{booking.tourTitle}</strong>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ color: '#64748b' }}>Primary Traveler</span>
            <strong>{booking.primaryTraveler?.fullName} ({booking.primaryTraveler?.city})</strong>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ color: '#64748b' }}>Group Members</span>
            <strong>{booking.travelersCount} {booking.travelersCount === 1 ? 'Traveler' : 'Travelers (Family / Group)'}</strong>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ color: '#64748b' }}>Emergency Contact</span>
            <span>{booking.primaryTraveler?.emergencyPhone} ({booking.primaryTraveler?.emergencyName})</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border)', fontSize: '1rem' }}>
            <span style={{ fontWeight: '700' }}>Total Amount Paid (Simulated)</span>
            <strong style={{ color: 'var(--primary)', fontSize: '1.15rem' }}>{formatPKR(booking.pricing?.totalPayable)}</strong>
          </div>
        </div>

        {/* Modal Actions */}
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
          <button
            type="button"
            onClick={onClose}
            className="btn btn-primary"
            style={{ flex: 1 }}
          >
            <Home size={16} aria-hidden="true" />
            <span>Return to Home</span>
          </button>
        </div>
      </div>
    </div>
  );
}
