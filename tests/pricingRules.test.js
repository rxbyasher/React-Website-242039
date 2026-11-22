import test from 'node:test';
import assert from 'node:assert/strict';
import {
  validateGroupCapacity,
  calculateTourPricing,
  validateMedicalEligibility,
  MAX_GROUP_SIZE,
  MIN_GROUP_SIZE,
  MIN_FAMILY_MEMBERS_FOR_DISCOUNT
} from '../src/utils/pricingRules.js';

test('Operating Rule 1 - Group Capacity: Valid ordinary group size (4 travelers)', () => {
  const result = validateGroupCapacity(4);
  assert.equal(result.valid, true);
  assert.equal(result.error, null);
});

test('Operating Rule 1 - Group Capacity: Boundary limit (exactly 12 travelers)', () => {
  const result = validateGroupCapacity(MAX_GROUP_SIZE);
  assert.equal(result.valid, true);
  assert.equal(result.error, null);
});

test('Operating Rule 1 - Group Capacity: Exceeding boundary limit (13 travelers)', () => {
  const result = validateGroupCapacity(13);
  assert.equal(result.valid, false);
  assert.match(result.error, /accept up to 12 travelers/i);
});

test('Operating Rule 1 - Group Capacity: Under minimum boundary (0 travelers)', () => {
  const result = validateGroupCapacity(0);
  assert.equal(result.valid, false);
  assert.match(result.error, /requires at least 1 traveler/i);
});

test('Operating Rule 3 - Pricing: Calculates family discount at exactly 4 members threshold', () => {
  const basePrice = 30000;
  const travelers = MIN_FAMILY_MEMBERS_FOR_DISCOUNT; // 4
  const pricing = calculateTourPricing({
    basePricePerPerson: basePrice,
    travelerCount: travelers,
    isCommunityMember: false
  });

  assert.equal(pricing.valid, true);
  assert.equal(pricing.discountPercent, 5); // 5% family discount
  assert.equal(pricing.subtotal, basePrice * travelers); // 120,000
  assert.equal(pricing.discountAmount, 6000); // 5% of 120,000
  assert.equal(pricing.totalPayable, 114000);
});

test('Operating Rule 3 - Pricing: Stacking community (10%) and family (5%) discounts', () => {
  const basePrice = 40000;
  const travelers = 5;
  const pricing = calculateTourPricing({
    basePricePerPerson: basePrice,
    travelerCount: travelers,
    isCommunityMember: true
  });

  assert.equal(pricing.valid, true);
  assert.equal(pricing.discountPercent, 15); // 10% + 5%
  assert.equal(pricing.discountAmount, (40000 * 5) * 0.15); // 30,000
  assert.equal(pricing.totalPayable, 170000);
});

test('Operating Rule 2 - Medical Eligibility: High altitude blocks without medical clearance acknowledgement', () => {
  const result = validateMedicalEligibility({
    tourAltitude: 3300, // Fairy Meadows / Deosai
    hasMedicalConditions: true,
    medicalClearanceAcknowledged: false
  });

  assert.equal(result.valid, false);
  assert.equal(result.requiresAcknowledgment, true);
  assert.match(result.error, /doctor clearance acknowledgement is required/i);
});
