/**
 * Pakistan ki Sair - Formatters & Validators
 */

/**
 * Format a number as Pakistani Rupees
 * @param {number} amount 
 * @returns {string} e.g. "Rs. 52,000"
 */
export function formatPKR(amount) {
  if (typeof amount !== 'number' || isNaN(amount)) return 'Rs. 0';
  return `Rs. ${amount.toLocaleString('en-PK')}`;
}

/**
 * Format CNIC number into standard 13-digit pattern: 12345-1234567-1
 * @param {string} value 
 * @returns {string}
 */
export function formatCNIC(value) {
  const digits = value.replace(/\D/g, '').slice(0, 13);
  if (digits.length <= 5) return digits;
  if (digits.length <= 12) return `${digits.slice(0, 5)}-${digits.slice(5)}`;
  return `${digits.slice(0, 5)}-${digits.slice(5, 12)}-${digits.slice(12, 13)}`;
}

/**
 * Validate Pakistani CNIC (13 digits: XXXXX-XXXXXXX-X)
 * @param {string} cnic 
 * @returns {boolean}
 */
export function isValidCNIC(cnic) {
  if (!cnic) return false;
  const cleaned = cnic.replace(/\D/g, '');
  return cleaned.length === 13;
}

/**
 * Format Pakistani mobile phone number: 03XX-XXXXXXX
 * @param {string} value 
 * @returns {string}
 */
export function formatPhone(value) {
  const digits = value.replace(/\D/g, '').slice(0, 11);
  if (digits.length <= 4) return digits;
  return `${digits.slice(0, 4)}-${digits.slice(4)}`;
}

/**
 * Validate Pakistani mobile phone number (03XX followed by 7 digits)
 * @param {string} phone 
 * @returns {boolean}
 */
export function isValidPhone(phone) {
  if (!phone) return false;
  const cleaned = phone.replace(/\D/g, '');
  return /^03\d{9}$/.test(cleaned);
}

/**
 * Validate email address format
 * @param {string} email 
 * @returns {boolean}
 */
export function isValidEmail(email) {
  if (!email) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}
