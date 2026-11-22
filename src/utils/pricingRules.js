/**
 * Pakistan ki Sair - Business Rules & Pricing Calculations
 * 
 * Implements the 3 core operating rules:
 * 1. Availability / Capacity: 1 to 12 travelers per online booking.
 * 2. Eligibility / Medical Suitability: High-altitude (>=3000m) medical clearance check.
 * 3. Pricing / Fulfilment: Community (10%) and Family (5% for >=4 members) discount rules.
 */

export const MIN_GROUP_SIZE = 1;
export const MAX_GROUP_SIZE = 12;
export const HIGH_ALTITUDE_THRESHOLD_METERS = 3000;
export const COMMUNITY_DISCOUNT_PERCENT = 10;
export const FAMILY_DISCOUNT_PERCENT = 5;
export const MIN_FAMILY_MEMBERS_FOR_DISCOUNT = 4;
export const MIN_DEPOSIT_PER_PERSON = 5000;

/**
 * Validates group capacity according to Operating Rule 1.
 * @param {number} travelerCount 
 * @returns {{ valid: boolean, error: string | null }}
 */
export function validateGroupCapacity(travelerCount) {
  const count = Number(travelerCount);

  if (isNaN(count) || !Number.isInteger(count)) {
    return {
      valid: false,
      error: 'Traveler count must be a whole number.'
    };
  }

  if (count < MIN_GROUP_SIZE) {
    return {
      valid: false,
      error: `Booking requires at least ${MIN_GROUP_SIZE} traveler.`
    };
  }

  if (count > MAX_GROUP_SIZE) {
    return {
      valid: false,
      error: `Standard online bookings accept up to ${MAX_GROUP_SIZE} travelers. For larger groups, please contact our custom expedition desk.`
    };
  }

  return { valid: true, error: null };
}

/**
 * Validates medical eligibility according to Operating Rule 2.
 * @param {object} params
 * @param {number} params.tourAltitude - Altitude in meters
 * @param {boolean} params.hasMedicalConditions - Whether any traveler has heart/asthma issues
 * @param {boolean} params.medicalClearanceAcknowledged - Whether user agreed to medical clearance
 * @returns {{ valid: boolean, requiresAcknowledgment: boolean, error: string | null }}
 */
export function validateMedicalEligibility({
  tourAltitude = 0,
  hasMedicalConditions = false,
  medicalClearanceAcknowledged = false
}) {
  const isHighAltitude = tourAltitude >= HIGH_ALTITUDE_THRESHOLD_METERS;
  const requiresAcknowledgment = isHighAltitude && hasMedicalConditions;

  if (requiresAcknowledgment && !medicalClearanceAcknowledged) {
    return {
      valid: false,
      requiresAcknowledgment: true,
      error: 'Because this high-altitude tour exceeds 3,000m and pre-existing medical conditions (asthma/cardiac) were declared, doctor clearance acknowledgement is required before proceeding.'
    };
  }

  return {
    valid: true,
    requiresAcknowledgment,
    error: null
  };
}

/**
 * Calculates complete pricing breakdown according to Operating Rule 3.
 * @param {object} options
 * @param {number} options.basePricePerPerson - Base tour package price in PKR
 * @param {number} options.travelerCount - Number of travelers
 * @param {boolean} options.isCommunityMember - Community membership status
 * @param {number} [options.customAddonsTotalPerPerson=0] - Sum of chosen add-ons per person
 * @param {number} [options.customDeductionsTotalPerPerson=0] - Sum of removed options per person
 * @returns {object} Calculated pricing summary
 */
export function calculateTourPricing({
  basePricePerPerson,
  travelerCount,
  isCommunityMember = false,
  customAddonsTotalPerPerson = 0,
  customDeductionsTotalPerPerson = 0
}) {
  // Validate group size first
  const capacityCheck = validateGroupCapacity(travelerCount);
  if (!capacityCheck.valid) {
    return {
      valid: false,
      error: capacityCheck.error,
      travelerCount,
      subtotal: 0,
      discountAmount: 0,
      discountPercent: 0,
      totalPayable: 0,
      depositDue: 0
    };
  }

  const count = Number(travelerCount);
  const adjustedPricePerPerson = Math.max(
    MIN_DEPOSIT_PER_PERSON,
    basePricePerPerson + customAddonsTotalPerPerson - customDeductionsTotalPerPerson
  );

  const subtotal = adjustedPricePerPerson * count;

  // Rule 3: Discounts
  let discountPercent = 0;
  const discountBreakdown = [];

  if (isCommunityMember) {
    discountPercent += COMMUNITY_DISCOUNT_PERCENT;
    discountBreakdown.push({
      label: `Community Member (${COMMUNITY_DISCOUNT_PERCENT}%)`,
      percent: COMMUNITY_DISCOUNT_PERCENT
    });
  }

  if (count >= MIN_FAMILY_MEMBERS_FOR_DISCOUNT) {
    discountPercent += FAMILY_DISCOUNT_PERCENT;
    discountBreakdown.push({
      label: `Family & Group Tier (${FAMILY_DISCOUNT_PERCENT}%)`,
      percent: FAMILY_DISCOUNT_PERCENT
    });
  }

  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const totalPayable = subtotal - discountAmount;
  const depositDue = count * MIN_DEPOSIT_PER_PERSON;

  return {
    valid: true,
    error: null,
    travelerCount: count,
    basePricePerPerson,
    customAddonsTotalPerPerson,
    customDeductionsTotalPerPerson,
    adjustedPricePerPerson,
    subtotal,
    discountPercent,
    discountAmount,
    discountBreakdown,
    totalPayable,
    depositDue
  };
}
