import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Users, UserPlus, Trash2, HeartPulse, ShieldCheck, CheckCircle2,
  AlertCircle, DollarSign, Calendar, CreditCard, ChevronRight, Tag
} from 'lucide-react';
import { TOURS_DATA } from '../data/toursData.js';
import {
  calculateTourPricing,
  validateGroupCapacity,
  validateMedicalEligibility,
  MIN_GROUP_SIZE,
  MAX_GROUP_SIZE,
  HIGH_ALTITUDE_THRESHOLD_METERS
} from '../utils/pricingRules.js';
import {
  formatPKR,
  formatCNIC,
  isValidCNIC,
  formatPhone,
  isValidPhone,
  isValidEmail
} from '../utils/formatters.js';
import { storage } from '../utils/storage.js';
import ConfirmationModal from '../components/ConfirmationModal.jsx';
import '../styles/booking.css';

const INITIAL_PRIMARY_TRAVELER = {
  fullName: '',
  email: '',
  cnic: '',
  phone: '',
  age: '',
  gender: 'Male',
  city: 'Islamabad',
  emergencyName: '',
  emergencyPhone: '',
  hasAsthma: false,
  hasHeartCondition: false,
  hasAllergies: false,
  medicalNotes: ''
};

const createEmptyMember = (index) => ({
  id: `member-${Date.now()}-${index}`,
  fullName: '',
  email: '',
  cnic: '',
  phone: '',
  age: '',
  gender: 'Female',
  city: 'Islamabad',
  emergencyName: '',
  emergencyPhone: '',
  hasAsthma: false,
  hasHeartCondition: false,
  hasAllergies: false,
  medicalNotes: ''
});

export default function BookingPage() {
  const [searchParams] = useSearchParams();
  const queryTourId = searchParams.get('tourId');

  // Selected tour state
  const [selectedTourId, setSelectedTourId] = useState(queryTourId || TOURS_DATA[0].id);

  // Group / Booking Type
  const [isFamilyBooking, setIsFamilyBooking] = useState(false);

  // Form states (FR09 Controlled form)
  const [primaryTraveler, setPrimaryTraveler] = useState(INITIAL_PRIMARY_TRAVELER);
  const [groupMembers, setGroupMembers] = useState([]);

  // Customization selections
  const [selectedRemovals, setSelectedRemovals] = useState([]);
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [isCommunityMember, setIsCommunityMember] = useState(storage.getCommunityStatus());
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);

  // Medical clearance checkbox (Operating Rule 2)
  const [medicalClearanceAcknowledged, setMedicalClearanceAcknowledged] = useState(false);

  // Payment method simulation
  const [paymentMethod, setPaymentMethod] = useState('easypaisa');

  // Form validation errors state (FR10)
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState(false);

  // Restored draft notification state (FR13)
  const [restoredDraftInfo, setRestoredDraftInfo] = useState(null);

  // Confirmation modal state (FR16)
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  // Load saved draft on mount if available (FR13)
  useEffect(() => {
    const savedDraft = storage.getBookingDraft();
    if (savedDraft) {
      if (savedDraft.tourId) setSelectedTourId(savedDraft.tourId);
      if (savedDraft.travelers && savedDraft.travelers > 1) {
        setIsFamilyBooking(true);
        // recreate member slots if not yet filled
        const extraCount = savedDraft.travelers - 1;
        setGroupMembers(Array.from({ length: extraCount }, (_, i) => createEmptyMember(i + 1)));
      }
      if (savedDraft.selectedRemovals) setSelectedRemovals(savedDraft.selectedRemovals);
      if (savedDraft.selectedAddons) setSelectedAddons(savedDraft.selectedAddons);
      if (savedDraft.isCommunityMember) setIsCommunityMember(true);
      setRestoredDraftInfo(`Restored your customized plan for ${savedDraft.tourTitle || 'your expedition'}.`);
    }
  }, []);

  const currentTour = TOURS_DATA.find(t => t.id === selectedTourId) || TOURS_DATA[0];
  const totalTravelers = 1 + (isFamilyBooking ? groupMembers.length : 0);

  // Deductions & additions calculations
  const customDeductionsTotal = (currentTour.removableOptions || [])
    .filter(opt => selectedRemovals.includes(opt.id))
    .reduce((sum, opt) => sum + opt.deduction, 0);

  const customAddonsTotal = (currentTour.customAddons || [])
    .filter(opt => selectedAddons.includes(opt.id))
    .reduce((sum, opt) => sum + opt.cost, 0);

  // Pricing calculation (Operating Rule 3)
  const pricing = calculateTourPricing({
    basePricePerPerson: currentTour.pricePerPerson,
    travelerCount: totalTravelers,
    isCommunityMember: isCommunityMember || couponApplied,
    customAddonsTotalPerPerson: customAddonsTotal,
    customDeductionsTotalPerPerson: customDeductionsTotal
  });

  // Check if any traveler in the booking has declared asthma or heart issues
  const anyAsthmaOrHeart = primaryTraveler.hasAsthma || primaryTraveler.hasHeartCondition ||
    groupMembers.some(m => m.hasAsthma || m.hasHeartCondition);

  // Operating Rule 2: Medical clearance validation
  const medicalRuleCheck = validateMedicalEligibility({
    tourAltitude: currentTour.maxAltitudeMeters || currentTour.baseAltitudeMeters,
    hasMedicalConditions: anyAsthmaOrHeart,
    medicalClearanceAcknowledged
  });

  // Handlers for Primary Traveler
  const handlePrimaryChange = (field, value) => {
    setPrimaryTraveler(prev => ({ ...prev, [field]: value }));
    // Clear specific error if now valid
    if (errors[field]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  // Handlers for Group Members
  const handleAddMember = () => {
    if (totalTravelers >= MAX_GROUP_SIZE) {
      alert(`Cannot exceed the maximum group limit of ${MAX_GROUP_SIZE} travelers (Operating Rule 1).`);
      return;
    }
    setGroupMembers(prev => [...prev, createEmptyMember(prev.length + 1)]);
  };

  const handleRemoveMember = (memberId) => {
    setGroupMembers(prev => prev.filter(m => m.id !== memberId));
  };

  const handleMemberChange = (id, field, value) => {
    setGroupMembers(prev => prev.map(m => m.id === id ? { ...m, [field]: value } : m));
  };

  // Validation function (FR10)
  const validateForm = () => {
    const newErrors = {};

    // 1. Primary Traveler Name
    if (!primaryTraveler.fullName.trim() || primaryTraveler.fullName.trim().length < 3) {
      newErrors.fullName = 'Full name is required (minimum 3 characters).';
    }

    // 2. Email
    if (!isValidEmail(primaryTraveler.email)) {
      newErrors.email = 'Please provide a valid email address (e.g. name@example.com).';
    }

    // 3. CNIC format (13 digits: XXXXX-XXXXXXX-X)
    if (!isValidCNIC(primaryTraveler.cnic)) {
      newErrors.cnic = 'Valid 13-digit CNIC required (e.g. 37405-1234567-1).';
    }

    // 4. Phone
    if (!isValidPhone(primaryTraveler.phone)) {
      newErrors.phone = 'Valid Pakistani mobile number required (03XXXXXXXXX).';
    }

    // 5. Age
    const ageNum = parseInt(primaryTraveler.age, 10);
    if (isNaN(ageNum) || ageNum < 1 || ageNum > 100) {
      newErrors.age = 'Please enter a valid age (1 - 100).';
    }

    // 6. Emergency Contact
    if (!primaryTraveler.emergencyName.trim()) {
      newErrors.emergencyName = 'Emergency contact person name is required.';
    }
    if (!isValidPhone(primaryTraveler.emergencyPhone)) {
      newErrors.emergencyPhone = 'Valid emergency contact phone required (03XXXXXXXXX).';
    } else if (primaryTraveler.emergencyPhone.replace(/\D/g, '') === primaryTraveler.phone.replace(/\D/g, '')) {
      newErrors.emergencyPhone = 'Emergency phone cannot be identical to traveler phone.';
    }

    // Check additional group members
    groupMembers.forEach((member, idx) => {
      if (!member.fullName.trim() || member.fullName.trim().length < 3) {
        newErrors[`member_${member.id}_fullName`] = `Member #${idx + 2} name is required.`;
      }
      if (member.cnic && !isValidCNIC(member.cnic)) {
        newErrors[`member_${member.id}_cnic`] = `Member #${idx + 2} CNIC must be 13 digits.`;
      }
      if (member.phone && !isValidPhone(member.phone)) {
        newErrors[`member_${member.id}_phone`] = `Member #${idx + 2} phone must be 03XXXXXXXXX format.`;
      }
    });

    // Capacity limit check (Operating Rule 1)
    const capacityCheck = validateGroupCapacity(totalTravelers);
    if (!capacityCheck.valid) {
      newErrors.capacity = capacityCheck.error;
    }

    // Medical rule check (Operating Rule 2)
    if (!medicalRuleCheck.valid) {
      newErrors.medical = medicalRuleCheck.error;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitBooking = (e) => {
    e.preventDefault();
    setTouched(true);

    if (!validateForm()) {
      // Scroll to first error
      window.scrollTo({ top: 200, behavior: 'smooth' });
      return;
    }

    // Create confirmed booking object
    const booking = {
      bookingReference: `PKS-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      tourId: currentTour.id,
      tourTitle: currentTour.title,
      urduTitle: currentTour.urduTitle,
      travelersCount: totalTravelers,
      primaryTraveler,
      groupMembers,
      pricing,
      paymentMethod,
      bookingDate: new Date().toLocaleDateString('en-PK', { day: 'numeric', month: 'short', year: 'numeric' })
    };

    // Clear saved draft on successful booking
    storage.clearBookingDraft();

    // Trigger confirmation modal (FR16)
    setConfirmedBooking(booking);
  };

  return (
    <main className="container" style={{ padding: '2.5rem 1.25rem 4rem' }}>
      {/* Restored Draft Banner (FR13) */}
      {restoredDraftInfo && (
        <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: 'var(--radius-md)', padding: '0.85rem 1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: '#065f46' }}>
            <CheckCircle2 size={18} />
            <span>{restoredDraftInfo}</span>
          </div>
          <button
            type="button"
            onClick={() => setRestoredDraftInfo(null)}
            className="btn btn-secondary btn-sm"
            style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem' }}
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Page Title */}
      <div style={{ marginBottom: '2rem' }}>
        <div className="urdu-text" style={{ fontSize: '1.4rem', color: 'var(--primary)' }}>آن لائن بکنگ و رجسٹریشن</div>
        <h1 style={{ fontSize: '2.2rem', marginBottom: '0.5rem' }}>Book Your Travel Expedition</h1>
        <p style={{ color: '#64748b', fontSize: '1rem' }}>
          Fill in traveler identification, emergency contact, and medical declarations to complete your reservation.
        </p>
      </div>

      <form onSubmit={handleSubmitBooking} noValidate>
        <div className="booking-grid">
          
          {/* Left Column: Form Inputs */}
          <div>
            
            {/* Step 1: Select or Confirm Tour Package */}
            <section className="card" style={{ padding: '1.75rem', marginBottom: '1.75rem' }}>
              <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span className="badge badge-primary">Step 1</span>
                <span>Select Tour Package</span>
              </h2>

              <div className="form-group">
                <label htmlFor="select-tour" className="form-label">
                  Choose Destination
                </label>
                <select
                  id="select-tour"
                  value={selectedTourId}
                  onChange={(e) => setSelectedTourId(e.target.value)}
                  className="form-select"
                >
                  {TOURS_DATA.map(t => (
                    <option key={t.id} value={t.id}>
                      {t.title} ({t.durationDays} Days - {formatPKR(t.pricePerPerson)})
                    </option>
                  ))}
                </select>
              </div>

              {/* Booking Mode Toggle: Individual vs Family/Group */}
              <div>
                <label className="form-label">Booking Category</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <button
                    type="button"
                    onClick={() => { setIsFamilyBooking(false); setGroupMembers([]); }}
                    style={{
                      padding: '0.85rem',
                      borderRadius: 'var(--radius-md)',
                      border: !isFamilyBooking ? '2px solid var(--primary)' : '1px solid var(--border)',
                      background: !isFamilyBooking ? 'var(--primary-light)' : '#ffffff',
                      cursor: 'pointer',
                      textAlign: 'center'
                    }}
                  >
                    <div style={{ fontWeight: '700', color: !isFamilyBooking ? 'var(--primary)' : 'var(--dark)' }}>
                      Individual Traveler
                    </div>
                    <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Solo registration (1 Person)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setIsFamilyBooking(true);
                      if (groupMembers.length === 0) {
                        setGroupMembers([createEmptyMember(1), createEmptyMember(2), createEmptyMember(3)]);
                      }
                    }}
                    style={{
                      padding: '0.85rem',
                      borderRadius: 'var(--radius-md)',
                      border: isFamilyBooking ? '2px solid var(--primary)' : '1px solid var(--border)',
                      background: isFamilyBooking ? 'var(--primary-light)' : '#ffffff',
                      cursor: 'pointer',
                      textAlign: 'center'
                    }}
                  >
                    <div style={{ fontWeight: '700', color: isFamilyBooking ? 'var(--primary)' : 'var(--dark)' }}>
                      Family / Group Booking
                    </div>
                    <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Leader + Members (5% off at 4+)</span>
                  </button>
                </div>
              </div>
            </section>

            {/* Step 2: Primary Traveler / Group Leader Information */}
            <section className="card" style={{ padding: '1.75rem', marginBottom: '1.75rem' }}>
              <div className="flex-between mb-3">
                <h2 style={{ fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span className="badge badge-primary">Step 2</span>
                  <span>{isFamilyBooking ? 'Family Group Leader Details' : 'Traveler Details'}</span>
                </h2>
                <span className="badge badge-subtle">Primary Contact</span>
              </div>

              {/* Name & Email */}
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="lead-name" className="form-label">Full Name *</label>
                  <input
                    id="lead-name"
                    type="text"
                    placeholder="e.g. Ali Ahmed"
                    value={primaryTraveler.fullName}
                    onChange={(e) => handlePrimaryChange('fullName', e.target.value)}
                    className={`form-input ${errors.fullName ? 'is-invalid' : ''}`}
                    required
                  />
                  {errors.fullName && <div className="field-error"><AlertCircle size={13} /> {errors.fullName}</div>}
                </div>

                <div className="form-group">
                  <label htmlFor="lead-email" className="form-label">Email Address *</label>
                  <input
                    id="lead-email"
                    type="email"
                    placeholder="name@example.com"
                    value={primaryTraveler.email}
                    onChange={(e) => handlePrimaryChange('email', e.target.value)}
                    className={`form-input ${errors.email ? 'is-invalid' : ''}`}
                    required
                  />
                  {errors.email && <div className="field-error"><AlertCircle size={13} /> {errors.email}</div>}
                </div>
              </div>

              {/* CNIC & Phone */}
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="lead-cnic" className="form-label">CNIC Number (13 digits) *</label>
                  <input
                    id="lead-cnic"
                    type="text"
                    placeholder="XXXXX-XXXXXXX-X"
                    maxLength={15}
                    value={primaryTraveler.cnic}
                    onChange={(e) => handlePrimaryChange('cnic', formatCNIC(e.target.value))}
                    className={`form-input ${errors.cnic ? 'is-invalid' : ''}`}
                    required
                  />
                  {errors.cnic ? (
                    <div className="field-error"><AlertCircle size={13} /> {errors.cnic}</div>
                  ) : (
                    <div className="field-hint">Required for hotel check-ins and mountain permit checks.</div>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="lead-phone" className="form-label">Mobile Phone *</label>
                  <input
                    id="lead-phone"
                    type="tel"
                    placeholder="0300-1234567"
                    maxLength={12}
                    value={primaryTraveler.phone}
                    onChange={(e) => handlePrimaryChange('phone', formatPhone(e.target.value))}
                    className={`form-input ${errors.phone ? 'is-invalid' : ''}`}
                    required
                  />
                  {errors.phone && <div className="field-error"><AlertCircle size={13} /> {errors.phone}</div>}
                </div>
              </div>

              {/* Age, Gender, City */}
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="lead-age" className="form-label">Age *</label>
                  <input
                    id="lead-age"
                    type="number"
                    min="1"
                    max="100"
                    placeholder="e.g. 26"
                    value={primaryTraveler.age}
                    onChange={(e) => handlePrimaryChange('age', e.target.value)}
                    className={`form-input ${errors.age ? 'is-invalid' : ''}`}
                    required
                  />
                  {errors.age && <div className="field-error"><AlertCircle size={13} /> {errors.age}</div>}
                </div>

                <div className="form-group">
                  <label htmlFor="lead-gender" className="form-label">Gender</label>
                  <select
                    id="lead-gender"
                    value={primaryTraveler.gender}
                    onChange={(e) => handlePrimaryChange('gender', e.target.value)}
                    className="form-select"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="lead-city" className="form-label">Home City</label>
                  <select
                    id="lead-city"
                    value={primaryTraveler.city}
                    onChange={(e) => handlePrimaryChange('city', e.target.value)}
                    className="form-select"
                  >
                    <option value="Islamabad">Islamabad</option>
                    <option value="Rawalpindi">Rawalpindi</option>
                    <option value="Lahore">Lahore</option>
                    <option value="Karachi">Karachi</option>
                    <option value="Peshawar">Peshawar</option>
                    <option value="Faisalabad">Faisalabad</option>
                    <option value="Multan">Multan</option>
                    <option value="Quetta">Quetta</option>
                    <option value="Other">Other City</option>
                  </select>
                </div>
              </div>

              {/* Emergency Contact */}
              <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: 'var(--radius-md)', marginTop: '0.5rem', border: '1px solid var(--border)' }}>
                <h4 style={{ fontSize: '0.9rem', marginBottom: '0.75rem', color: '#1e293b' }}>
                  Emergency Contact (Next of Kin / Relative)
                </h4>
                <div className="form-row">
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label htmlFor="lead-em-name" className="form-label" style={{ fontSize: '0.82rem' }}>Contact Name *</label>
                    <input
                      id="lead-em-name"
                      type="text"
                      placeholder="e.g. Brother / Parent Name"
                      value={primaryTraveler.emergencyName}
                      onChange={(e) => handlePrimaryChange('emergencyName', e.target.value)}
                      className={`form-input ${errors.emergencyName ? 'is-invalid' : ''}`}
                    />
                    {errors.emergencyName && <div className="field-error"><AlertCircle size={13} /> {errors.emergencyName}</div>}
                  </div>

                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label htmlFor="lead-em-phone" className="form-label" style={{ fontSize: '0.82rem' }}>Emergency Phone *</label>
                    <input
                      id="lead-em-phone"
                      type="tel"
                      placeholder="03XX-XXXXXXX"
                      maxLength={12}
                      value={primaryTraveler.emergencyPhone}
                      onChange={(e) => handlePrimaryChange('emergencyPhone', formatPhone(e.target.value))}
                      className={`form-input ${errors.emergencyPhone ? 'is-invalid' : ''}`}
                    />
                    {errors.emergencyPhone && <div className="field-error"><AlertCircle size={13} /> {errors.emergencyPhone}</div>}
                  </div>
                </div>
              </div>

              {/* Medical Information & Allergies */}
              <div className="medical-box">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: '700', fontSize: '0.92rem', color: '#92400e', marginBottom: '0.5rem' }}>
                  <HeartPulse size={16} />
                  <span>Medical Declaration & Allergies</span>
                </div>
                <p style={{ fontSize: '0.82rem', color: '#78350f', marginBottom: '0.75rem' }}>
                  Does the lead traveler have any history of high-altitude sensitivities, asthma, cardiac issues, or dietary/dust allergies?
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', fontSize: '0.88rem' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={primaryTraveler.hasAsthma}
                      onChange={(e) => handlePrimaryChange('hasAsthma', e.target.checked)}
                      style={{ accentColor: 'var(--primary)' }}
                    />
                    <span>Asthma / Respiratory issues</span>
                  </label>

                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={primaryTraveler.hasHeartCondition}
                      onChange={(e) => handlePrimaryChange('hasHeartCondition', e.target.checked)}
                      style={{ accentColor: 'var(--primary)' }}
                    />
                    <span>Heart / Cardiovascular issues</span>
                  </label>

                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={primaryTraveler.hasAllergies}
                      onChange={(e) => handlePrimaryChange('hasAllergies', e.target.checked)}
                      style={{ accentColor: 'var(--primary)' }}
                    />
                    <span>Severe Allergies (Pollen / Food)</span>
                  </label>
                </div>
              </div>
            </section>

            {/* Step 3: Additional Family / Group Members (Dynamic Form) */}
            {isFamilyBooking && (
              <section className="card" style={{ padding: '1.75rem', marginBottom: '1.75rem' }}>
                <div className="flex-between mb-3">
                  <div>
                    <h2 style={{ fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span className="badge badge-primary">Step 3</span>
                      <span>Additional Family Members ({groupMembers.length})</span>
                    </h2>
                    <span style={{ fontSize: '0.85rem', color: '#64748b' }}>
                      Total booking group: {totalTravelers} / {MAX_GROUP_SIZE} max
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={handleAddMember}
                    disabled={totalTravelers >= MAX_GROUP_SIZE}
                    className="btn btn-secondary btn-sm"
                  >
                    <UserPlus size={15} aria-hidden="true" />
                    <span>Add Member</span>
                  </button>
                </div>

                {groupMembers.map((member, idx) => (
                  <div key={member.id} className="member-card">
                    <div className="member-card-header">
                      <strong style={{ fontSize: '0.95rem', color: 'var(--primary)' }}>
                        Member #{idx + 2}
                      </strong>
                      <button
                        type="button"
                        onClick={() => handleRemoveMember(member.id)}
                        className="btn btn-secondary btn-sm"
                        style={{ padding: '0.2rem 0.5rem', color: 'var(--danger)', borderColor: 'var(--danger-border)' }}
                        title="Remove Member"
                      >
                        <Trash2 size={13} />
                        <span>Remove</span>
                      </button>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label className="form-label" style={{ fontSize: '0.82rem' }}>Full Name *</label>
                        <input
                          type="text"
                          placeholder="Member Name"
                          value={member.fullName}
                          onChange={(e) => handleMemberChange(member.id, 'fullName', e.target.value)}
                          className={`form-input ${errors[`member_${member.id}_fullName`] ? 'is-invalid' : ''}`}
                        />
                        {errors[`member_${member.id}_fullName`] && (
                          <div className="field-error"><AlertCircle size={12} /> {errors[`member_${member.id}_fullName`]}</div>
                        )}
                      </div>

                      <div className="form-group">
                        <label className="form-label" style={{ fontSize: '0.82rem' }}>CNIC (13 digits)</label>
                        <input
                          type="text"
                          placeholder="XXXXX-XXXXXXX-X"
                          maxLength={15}
                          value={member.cnic}
                          onChange={(e) => handleMemberChange(member.id, 'cnic', formatCNIC(e.target.value))}
                          className={`form-input ${errors[`member_${member.id}_cnic`] ? 'is-invalid' : ''}`}
                        />
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label className="form-label" style={{ fontSize: '0.82rem' }}>Age</label>
                        <input
                          type="number"
                          placeholder="Age"
                          value={member.age}
                          onChange={(e) => handleMemberChange(member.id, 'age', e.target.value)}
                          className="form-input"
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label" style={{ fontSize: '0.82rem' }}>Gender</label>
                        <select
                          value={member.gender}
                          onChange={(e) => handleMemberChange(member.id, 'gender', e.target.value)}
                          className="form-select"
                        >
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Child">Child</option>
                        </select>
                      </div>

                      <div className="form-group">
                        <label className="form-label" style={{ fontSize: '0.82rem' }}>Mobile Phone</label>
                        <input
                          type="tel"
                          placeholder="03XX-XXXXXXX"
                          maxLength={12}
                          value={member.phone}
                          onChange={(e) => handleMemberChange(member.id, 'phone', formatPhone(e.target.value))}
                          className="form-input"
                        />
                      </div>
                    </div>

                    {/* Member Medical checklist */}
                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', fontSize: '0.82rem', marginTop: '0.25rem', color: '#64748b' }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', cursor: 'pointer' }}>
                        <input
                          type="checkbox"
                          checked={member.hasAsthma}
                          onChange={(e) => handleMemberChange(member.id, 'hasAsthma', e.target.checked)}
                          style={{ accentColor: 'var(--primary)' }}
                        />
                        <span>Asthma</span>
                      </label>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', cursor: 'pointer' }}>
                        <input
                          type="checkbox"
                          checked={member.hasHeartCondition}
                          onChange={(e) => handleMemberChange(member.id, 'hasHeartCondition', e.target.checked)}
                          style={{ accentColor: 'var(--primary)' }}
                        />
                        <span>Heart issues</span>
                      </label>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', cursor: 'pointer' }}>
                        <input
                          type="checkbox"
                          checked={member.hasAllergies}
                          onChange={(e) => handleMemberChange(member.id, 'hasAllergies', e.target.checked)}
                          style={{ accentColor: 'var(--primary)' }}
                        />
                        <span>Allergies</span>
                      </label>
                    </div>
                  </div>
                ))}

                {totalTravelers < MAX_GROUP_SIZE && (
                  <button
                    type="button"
                    onClick={handleAddMember}
                    className="btn btn-outline-primary btn-sm"
                    style={{ width: '100%', marginTop: '0.5rem' }}
                  >
                    <UserPlus size={15} aria-hidden="true" />
                    <span>Add Another Family / Group Member ({totalTravelers}/{MAX_GROUP_SIZE})</span>
                  </button>
                )}
              </section>
            )}

            {/* Operating Rule 2: High Altitude Medical Clearance Gate */}
            {medicalRuleCheck.requiresAcknowledgment && (
              <section className="card" style={{ padding: '1.5rem', marginBottom: '1.75rem', border: '1.5px solid var(--danger-border)', background: 'var(--danger-light)' }} role="alert">
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <AlertCircle size={22} color="var(--danger)" style={{ flexShrink: 0, marginTop: '0.15rem' }} />
                  <div>
                    <h3 style={{ fontSize: '1rem', color: 'var(--danger)', marginBottom: '0.35rem' }}>
                      High-Altitude Medical Clearance Required (Operating Rule 2)
                    </h3>
                    <p style={{ fontSize: '0.85rem', color: '#7f1d1d', marginBottom: '0.75rem', lineHeight: '1.5' }}>
                      Because this expedition reaches high altitudes (3,000m+) and pre-existing medical conditions (asthma or cardiac history) were declared for one or more travelers, you must confirm that a physician has cleared participants for high-altitude activities.
                    </p>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.88rem', fontWeight: '600', color: '#991b1b' }}>
                      <input
                        type="checkbox"
                        checked={medicalClearanceAcknowledged}
                        onChange={(e) => setMedicalClearanceAcknowledged(e.target.checked)}
                        style={{ width: '18px', height: '18px', accentColor: 'var(--danger)' }}
                        required
                      />
                      <span>I confirm physician medical clearance for all declared conditions on high-altitude trails.</span>
                    </label>
                  </div>
                </div>
              </section>
            )}

            {/* Step 4: Payment Simulation */}
            <section className="card" style={{ padding: '1.75rem' }}>
              <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span className="badge badge-primary">Step 4</span>
                <span>Select Simulated Payment Method</span>
              </h2>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.75rem', marginBottom: '1rem' }}>
                <label className={`payment-method-label ${paymentMethod === 'easypaisa' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="payment"
                    value="easypaisa"
                    checked={paymentMethod === 'easypaisa'}
                    onChange={() => setPaymentMethod('easypaisa')}
                    style={{ accentColor: 'var(--primary)' }}
                  />
                  <span>Easypaisa</span>
                </label>

                <label className={`payment-method-label ${paymentMethod === 'jazzcash' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="payment"
                    value="jazzcash"
                    checked={paymentMethod === 'jazzcash'}
                    onChange={() => setPaymentMethod('jazzcash')}
                    style={{ accentColor: 'var(--primary)' }}
                  />
                  <span>JazzCash</span>
                </label>

                <label className={`payment-method-label ${paymentMethod === 'bank' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="payment"
                    value="bank"
                    checked={paymentMethod === 'bank'}
                    onChange={() => setPaymentMethod('bank')}
                    style={{ accentColor: 'var(--primary)' }}
                  />
                  <span>Bank Transfer</span>
                </label>

                <label className={`payment-method-label ${paymentMethod === 'card' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={paymentMethod === 'card'}
                    onChange={() => setPaymentMethod('card')}
                    style={{ accentColor: 'var(--primary)' }}
                  />
                  <span>Debit / Card</span>
                </label>
              </div>

              <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                🔒 Academic demo sandbox: No real money will be charged. All transactions are simulated for verification.
              </div>
            </section>

          </div>

          {/* Right Column: Calculated Sticky Summary (FR11) */}
          <div>
            <div className="card summary-sticky" style={{ padding: '1.75rem' }}>
              <div className="urdu-text" style={{ fontSize: '1.2rem', color: 'var(--primary)' }}>خلاصہ و کل رقم</div>
              <h2 style={{ fontSize: '1.3rem', marginBottom: '1.25rem' }}>Booking Summary</h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748b' }}>Tour Destination</span>
                  <strong>{currentTour.title.slice(0, 24)}...</strong>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748b' }}>Traveler Count</span>
                  <strong>{totalTravelers} {totalTravelers === 1 ? 'Traveler' : 'Travelers'}</strong>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748b' }}>Base Package / person</span>
                  <span>{formatPKR(currentTour.pricePerPerson)}</span>
                </div>

                {customDeductionsTotal > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--success)' }}>
                    <span>Budget Deductions / person</span>
                    <span>- {formatPKR(customDeductionsTotal)}</span>
                  </div>
                )}

                {customAddonsTotal > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--primary)' }}>
                    <span>Selected Add-ons / person</span>
                    <span>+ {formatPKR(customAddonsTotal)}</span>
                  </div>
                )}

                <div style={{ borderTop: '1px solid var(--border)', paddingTop: '0.75rem', display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748b' }}>Adjusted Subtotal</span>
                  <span>{formatPKR(pricing.subtotal)}</span>
                </div>

                {/* Discounts breakdown (Operating Rule 3) */}
                {pricing.discountAmount > 0 && (
                  <div style={{ background: '#f0fdf4', padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid #bbf7d0' }}>
                    <div style={{ fontWeight: '700', color: 'var(--success)', fontSize: '0.85rem', marginBottom: '0.25rem' }}>
                      Discounts Applied ({pricing.discountPercent}%)
                    </div>
                    {pricing.discountBreakdown.map((disc, i) => (
                      <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#166534' }}>
                        <span>• {disc.label}</span>
                        <span>- {disc.percent}%</span>
                      </div>
                    ))}
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.35rem', paddingTop: '0.35rem', borderTop: '1px dashed #86efac', fontWeight: '700', color: 'var(--success)' }}>
                      <span>You Save</span>
                      <span>- {formatPKR(pricing.discountAmount)}</span>
                    </div>
                  </div>
                )}

                <div style={{ borderTop: '2px solid var(--border)', paddingTop: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ fontSize: '1.05rem', fontWeight: '800' }}>Total Payable</span>
                  <span style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--primary)' }}>
                    {formatPKR(pricing.totalPayable)}
                  </span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={medicalRuleCheck.requiresAcknowledgment && !medicalClearanceAcknowledged}
                className="btn btn-primary btn-lg"
                style={{ width: '100%', fontSize: '1.05rem', padding: '1rem' }}
              >
                <span>Confirm & Complete Booking</span>
                <ChevronRight size={18} />
              </button>

              {medicalRuleCheck.requiresAcknowledgment && !medicalClearanceAcknowledged && (
                <div style={{ marginTop: '0.75rem', fontSize: '0.78rem', color: 'var(--danger)', textAlign: 'center' }}>
                  Please acknowledge doctor clearance to unlock booking.
                </div>
              )}

              <div style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.78rem', color: '#64748b' }}>
                Instant confirmation popup + simulated email confirmation will be sent upon completion.
              </div>
            </div>
          </div>

        </div>
      </form>

      {/* Confirmation Modal (FR16) */}
      {confirmedBooking && (
        <ConfirmationModal
          booking={confirmedBooking}
          onClose={() => {
            setConfirmedBooking(null);
            window.location.href = '/';
          }}
        />
      )}
    </main>
  );
}
