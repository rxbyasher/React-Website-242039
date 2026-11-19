/**
 * Pakistan ki Sair - Asynchronous Mock Data Loader
 * Implements FR14 with Promise-based asynchronous loading, simulated latency,
 * and demonstration switches for testing error recovery and availability edge cases.
 */

import { TOURS_DATA } from '../data/toursData.js';

// Internal demo switches (can be controlled via DemoToolbar)
let demoForceNetworkError = false;
let demoForceSoldOut = false;

export const tourService = {
  /**
   * Set demo configuration to simulate failure or changed availability
   */
  setDemoConfig({ forceError, forceSoldOut }) {
    if (typeof forceError === 'boolean') demoForceNetworkError = forceError;
    if (typeof forceSoldOut === 'boolean') demoForceSoldOut = forceSoldOut;
  },

  getDemoConfig() {
    return {
      forceError: demoForceNetworkError,
      forceSoldOut: demoForceSoldOut
    };
  },

  /**
   * Fetch all tour packages asynchronously
   * @param {number} delayMs - Simulated latency in milliseconds
   * @returns {Promise<Array>}
   */
  async getAllTours(delayMs = 400) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (demoForceNetworkError) {
          reject(new Error('Network connectivity error: Unable to connect to Pakistan ki Sair tour servers. Please check your connection and retry.'));
          return;
        }

        const tours = TOURS_DATA.map(tour => {
          if (demoForceSoldOut) {
            return { ...tour, availableSeats: 0, isAvailable: false };
          }
          return { ...tour };
        });

        resolve(tours);
      }, delayMs);
    });
  },

  /**
   * Fetch a single tour by ID asynchronously
   * @param {string} id 
   * @param {number} delayMs 
   * @returns {Promise<object | null>}
   */
  async getTourById(id, delayMs = 300) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (demoForceNetworkError) {
          reject(new Error('Failed to load expedition details due to a simulated network interruption.'));
          return;
        }

        const found = TOURS_DATA.find(t => t.id === id);
        if (!found) {
          resolve(null);
          return;
        }

        const tour = { ...found };
        if (demoForceSoldOut) {
          tour.availableSeats = 0;
          tour.isAvailable = false;
        }

        resolve(tour);
      }, delayMs);
    });
  }
};
