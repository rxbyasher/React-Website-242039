import React from 'react';
import { Minus, Plus, Check, ShieldAlert, Users, Sparkles, Tag } from 'lucide-react';
import { formatPKR } from '../utils/formatters.js';
import {
  MIN_GROUP_SIZE,
  MAX_GROUP_SIZE,
  MIN_FAMILY_MEMBERS_FOR_DISCOUNT,
  calculateTourPricing
} from '../utils/pricingRules.js';

export default function PackageCustomizer({
  tour,
  travelers,
  onTravelersChange,
  selectedRemovals,
  onToggleRemoval,
  selectedAddons,
  onToggleAddon,
  isCommunityMember,
  onToggleCommunityMember,
  couponCode,
  onCouponCodeChange,
  onApplyCoupon,
  couponApplied
}) {
  // Calculate deductions
  const customDeductionsTotal = (tour.removableOptions || [])
    .filter(opt => selectedRemovals.includes(opt.id))
    .reduce((sum, opt) => sum + opt.deduction, 0);

  // Calculate additions
  const customAddonsTotal = (tour.customAddons || [])
    .filter(opt => selectedAddons.includes(opt.id))
    .reduce((sum, opt) => sum + opt.cost, 0);

  // Run business calculation
  const pricing = calculateTourPricing({
    basePricePerPerson: tour.pricePerPerson,
    travelerCount: travelers,
    isCommunityMember: isCommunityMember || couponApplied,
    customAddonsTotalPerPerson: customAddonsTotal,
    customDeductionsTotalPerPerson: customDeductionsTotal
  });

  const handleDecrement = () => {
    if (travelers > MIN_GROUP_SIZE) {
      onTravelersChange(travelers - 1);
    }
  };

  const handleIncrement = () => {
    if (travelers < MAX_GROUP_SIZE) {
      onTravelersChange(travelers + 1);
    }
  };

  return (
    <section className="card" style={{ padding: '1.75rem', border: '1.5px solid #a7f3d0' }} aria-labelledby="customizer-heading">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1.25rem' }}>
        <div>
          <span className="badge badge-primary">Interactive Budget Customizer</span>
          <h3 id="customizer-heading" style={{ fontSize: '1.35rem', marginTop: '0.35rem' }}>
            Customize Your Tour Package
          </h3>
        </div>
        <div style={{ textAlign: 'right' }}>
          <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Per Person Adjusted</span>
          <div style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--primary)' }}>
            {formatPKR(pricing.adjustedPricePerPerson)}
          </div>
        </div>
      </div>

      <p style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '1.5rem' }}>
        Tweak this package to match your budget and travel style. Deduct items you don't need (like bringing your own car) or add luxury stays and adventure upgrades.
      </p>

      {/* Traveler Count Stepper (Rule 1 enforcement) */}
      <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', border: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <label htmlFor="travelers-stepper" style={{ fontWeight: '700', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Users size={18} color="var(--primary)" aria-hidden="true" />
              <span>Number of Travelers</span>
            </label>
            <span style={{ fontSize: '0.82rem', color: '#64748b' }}>
              Standard online bookings accept 1 to 12 travelers.
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button
              type="button"
              id="travelers-stepper"
              onClick={handleDecrement}
              disabled={travelers <= MIN_GROUP_SIZE}
              className="btn btn-secondary btn-sm"
              style={{ width: '38px', height: '38px', padding: 0 }}
              aria-label="Decrease traveler count"
            >
              <Minus size={16} />
            </button>
            <span style={{ fontSize: '1.2rem', fontWeight: '800', minWidth: '32px', textAlign: 'center' }}>
              {travelers}
            </span>
            <button
              type="button"
              onClick={handleIncrement}
              disabled={travelers >= MAX_GROUP_SIZE}
              className="btn btn-secondary btn-sm"
              style={{ width: '38px', height: '38px', padding: 0 }}
              aria-label="Increase traveler count"
            >
              <Plus size={16} />
            </button>
          </div>
        </div>

        {/* Boundary Notice */}
        {travelers >= MAX_GROUP_SIZE && (
          <div style={{ marginTop: '0.75rem', fontSize: '0.82rem', color: 'var(--warning)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <ShieldAlert size={14} />
            <span>Maximum online booking limit reached (12 members). Contact our office for larger delegations.</span>
          </div>
        )}

        {/* Family Tier Tier Notification */}
        {travelers >= MIN_FAMILY_MEMBERS_FOR_DISCOUNT && (
          <div style={{ marginTop: '0.75rem', fontSize: '0.85rem', color: 'var(--success)', display: 'flex', alignItems: 'center', gap: '0.4rem', background: '#f0fdf4', padding: '0.4rem 0.75rem', borderRadius: 'var(--radius-sm)' }}>
            <Sparkles size={15} />
            <span><strong>Family & Group Tier Unlocked!</strong> You qualify for an automatic 5% group discount.</span>
          </div>
        )}
      </div>

      {/* Removable Components (Budget friendly) */}
      {tour.removableOptions && tour.removableOptions.length > 0 && (
        <div style={{ marginBottom: '1.5rem' }}>
          <h4 style={{ fontSize: '0.95rem', marginBottom: '0.75rem', color: '#334155' }}>
            Optional Inclusions to Remove (Save Budget)
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {tour.removableOptions.map(opt => {
              const isChecked = selectedRemovals.includes(opt.id);
              return (
                <label
                  key={opt.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.75rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    border: isChecked ? '1.5px solid #10b981' : '1px solid var(--border)',
                    background: isChecked ? '#f0fdf4' : '#ffffff',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => onToggleRemoval(opt.id)}
                      style={{ width: '18px', height: '18px', accentColor: 'var(--primary)' }}
                    />
                    <span style={{ fontSize: '0.9rem', fontWeight: '500' }}>{opt.label}</span>
                  </div>
                  <span style={{ fontSize: '0.88rem', fontWeight: '700', color: 'var(--success)' }}>
                    - {formatPKR(opt.deduction)}/pax
                  </span>
                </label>
              );
            })}
          </div>
        </div>
      )}

      {/* Add-on Components */}
      {tour.customAddons && tour.customAddons.length > 0 && (
        <div style={{ marginBottom: '1.5rem' }}>
          <h4 style={{ fontSize: '0.95rem', marginBottom: '0.75rem', color: '#334155' }}>
            Available Experience Add-ons & Upgrades
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {tour.customAddons.map(addon => {
              const isChecked = selectedAddons.includes(addon.id);
              return (
                <label
                  key={addon.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.75rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    border: isChecked ? '1.5px solid var(--primary)' : '1px solid var(--border)',
                    background: isChecked ? 'var(--primary-light)' : '#ffffff',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => onToggleAddon(addon.id)}
                      style={{ width: '18px', height: '18px', accentColor: 'var(--primary)' }}
                    />
                    <span style={{ fontSize: '0.9rem', fontWeight: '500' }}>{addon.label}</span>
                  </div>
                  <span style={{ fontSize: '0.88rem', fontWeight: '700', color: 'var(--primary)' }}>
                    + {formatPKR(addon.cost)}/pax
                  </span>
                </label>
              );
            })}
          </div>
        </div>
      )}

      {/* Community Membership & Coupon Code */}
      <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.9rem', fontWeight: '600' }}>
            <input
              type="checkbox"
              checked={isCommunityMember || couponApplied}
              onChange={(e) => onToggleCommunityMember(e.target.checked)}
              style={{ width: '18px', height: '18px', accentColor: 'var(--primary)' }}
            />
            <span>I am a Pakistan ki Sair Community Member (10% Discount)</span>
          </label>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <input
              type="text"
              placeholder="Promo Code (SAIR10)"
              value={couponCode}
              onChange={(e) => onCouponCodeChange(e.target.value)}
              className="form-input"
              style={{ width: '150px', padding: '0.4rem 0.6rem', fontSize: '0.85rem' }}
              aria-label="Enter promotional discount code"
            />
            <button
              type="button"
              onClick={onApplyCoupon}
              className="btn btn-secondary btn-sm"
            >
              Apply
            </button>
          </div>
        </div>
        {couponApplied && (
          <span style={{ fontSize: '0.8rem', color: 'var(--success)', marginTop: '0.4rem', display: 'block' }}>
            ✓ Coupon applied: 10% Community Member discount activated!
          </span>
        )}
      </div>

      {/* Summary Box */}
      <div style={{ borderTop: '2px dashed var(--border)', paddingTop: '1.25rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontSize: '0.9rem', color: '#64748b' }}>
          <span>Subtotal ({travelers} {travelers === 1 ? 'traveler' : 'travelers'})</span>
          <span>{formatPKR(pricing.subtotal)}</span>
        </div>

        {pricing.discountAmount > 0 && (
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontSize: '0.9rem', color: 'var(--success)', fontWeight: '600' }}>
            <span>Total Discounts ({pricing.discountPercent}%)</span>
            <span>- {formatPKR(pricing.discountAmount)}</span>
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border)' }}>
          <span style={{ fontWeight: '800', fontSize: '1.1rem', color: 'var(--dark)' }}>Estimated Payable Total</span>
          <span style={{ fontWeight: '800', fontSize: '1.5rem', color: 'var(--primary)' }}>
            {formatPKR(pricing.totalPayable)}
          </span>
        </div>
      </div>
    </section>
  );
}
