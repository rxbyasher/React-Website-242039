/**
 * Pakistan ki Sair - Local Storage Persistence Helper
 * Satisfies FR13 and edge-case handling for restored selections.
 */

const STORAGE_KEYS = {
  BOOKING_DRAFT: 'pks_booking_draft_v1',
  SHORTLIST: 'pks_shortlist_v1',
  COMMUNITY_STATUS: 'pks_community_status_v1'
};

export const storage = {
  getBookingDraft() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.BOOKING_DRAFT);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },

  saveBookingDraft(draft) {
    try {
      localStorage.setItem(STORAGE_KEYS.BOOKING_DRAFT, JSON.stringify(draft));
    } catch {
      // Storage quota or disabled in private browsing
    }
  },

  clearBookingDraft() {
    try {
      localStorage.removeItem(STORAGE_KEYS.BOOKING_DRAFT);
    } catch {}
  },

  getShortlist() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SHORTLIST);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  saveShortlist(list) {
    try {
      localStorage.setItem(STORAGE_KEYS.SHORTLIST, JSON.stringify(list));
    } catch {}
  },

  getCommunityStatus() {
    try {
      return localStorage.getItem(STORAGE_KEYS.COMMUNITY_STATUS) === 'true';
    } catch {
      return false;
    }
  },

  setCommunityStatus(status) {
    try {
      localStorage.setItem(STORAGE_KEYS.COMMUNITY_STATUS, String(status));
    } catch {}
  }
};
