# پاکستان کی سیر (Pakistan ki Sair) - Tourism Travel Platform

> **Web Programming (CS4032) - Assignment 02**  
> **Institution:** National University of Computer and Emerging Sciences (FAST NUCES), Islamabad Campus  
> **Program:** BS Cyber Security | **Semester:** Fall 2026  

---

## Student & Submission Details
- **Student Name:** Ramla Shamsher
- **Roll Number:** 24I-2039
- **Section:** CY-5C
- **Business Name:** پاکستان کی سیر (Pakistan ki Sair)
- **GitHub Repository:** https://github.com/rxbyasher/React-Website-242039
- **Live Deployed Application:** https://react-website-242039.vercel.app/
- **Final Commit Hash:** `32ea507`

---

## 1. Project Overview & Business Profile
**پاکستان کی سیر (Pakistan ki Sair)** is a modern, responsive React web application designed for curated domestic tourism and group travel experiences across Pakistan. It features signature expeditions to Gilgit-Baltistan (Hunza, Skardu, Fairy Meadows, Naltar), Khyber Pakhtunkhwa (Swat, Kumrat, Chitral), Azad Kashmir (Neelum Valley), Balochistan (Gwadar & Makran Coast), Punjab (Lahore Heritage, Cholistan), and Sindh (Gorakh Hill Station).

### Business Profile Summary
- **Business Identity:** Pakistan ki Sair - Domestic adventure and cultural expedition operator.
- **Primary Audience:** Pakistani families, university student friend groups, solo travelers, and overseas Pakistanis seeking safe, organized journeys with transparent pricing.
- **Operating Area:** Pakistan (departures from Islamabad/Rawalpindi, Lahore, and Karachi).
- **Main Customer Task:** Browse expeditions, search and filter destinations, customize package inclusions/deductions according to personal budget, register travelers with emergency and medical disclosures, review transparent calculations, and secure a booking confirmation.
- **Offering:** 12 rich, realistic tour package records with day-by-day itineraries, altitude metrics, and customizable options.

---

## 2. Three Core Operating Rules

### Operating Rule 1: Capacity & Group Size Limit (Numerical Limit)
- **Condition:** Standard online bookings accept between **1 and 12 travelers** per reservation (`1 <= count <= 12`).
- **Communication:** Communicated via the traveler count stepper in `PackageCustomizer.jsx` and `BookingPage.jsx`.
- **Enforcement:** The increment button is disabled at 12 members with a warning: *"Maximum online booking limit reached (12 members). Contact our office for larger delegations."* Submitting outside 1–12 is blocked by `validateGroupCapacity()`.
- **Boundary Case:** Exactly 12 travelers is valid; 13 or 0 is rejected with an explicit error message.

### Operating Rule 2: High-Altitude Medical Clearance & Safety Triage
- **Condition:** For high-altitude tours exceeding **3,000 meters** (e.g., Fairy Meadows 3,300m, Skardu/Deosai 4,114m), if any traveler reports pre-existing asthma or cardiovascular issues, booking requires an explicit physician clearance confirmation.
- **Communication:** Displayed via an amber advisory alert on `TourDetailsPage.jsx` and a mandatory confirmation checkbox in `BookingPage.jsx`.
- **Enforcement:** If conditions are met and the box is unchecked, booking completion is disabled with an alert.
- **Boundary Case:** A tour below 3,000m (e.g., Swat Valley or Lahore) allows booking progression with medical notes logged for the tour guide without mandatory clearance blocking.

### Operating Rule 3: Tiered Discounts & Fulfilment Threshold
- **Condition:**
  - **10% Community Discount:** Applied if the user is a registered community member or enters promo code `SAIR10`.
  - **5% Family & Group Tier Discount:** Automatically applied when booking for **4 or more travelers** (`count >= 4`).
  - Both discounts stack up to a maximum 15% reduction.
  - Minimum deposit payable per person is locked at Rs. 5,000.
- **Communication:** Live summary card shows detailed discount breakdown with per-person and total savings.
- **Enforcement:** Calculated via derived state in `calculateTourPricing()`.
- **Boundary Case:** A group of exactly 4 travelers receives the 5% family discount; a group of 3 does not.

---

## 3. Technology Stack & Packages
- **Framework:** React 19 + Vite 8
- **Language:** JavaScript (ES Modules)
- **Routing:** `react-router-dom` v7
- **Icons:** `lucide-react`
- **Testing:** Node.js Built-in Test Runner (`node:test` & `node:assert/strict`)
- **Styling:** Custom Authored CSS Design System (Zero prebuilt UI kits or Bootstrap)
- **Typography:** Plus Jakarta Sans & Google Amiri (Urdu Nastaliq typography)

---

## 4. Setup, Development, Build & Test Commands

### Prerequisites
- Node.js (version 20 or higher; tested on Node v24.20.0)
- npm (version 10 or higher)

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
The application will launch locally at `http://localhost:5173/`.

### 3. Run Automated Business Rule Tests (Task 6.2)
```bash
npm test
```
Executes Node.js built-in tests covering valid inputs, boundary limits, and rule breaches in `tests/pricingRules.test.js`.

### 4. Build for Production Deployment
```bash
npm run build
```
Creates an optimized production bundle in the `dist/` directory.

### 5. Preview Production Build
```bash
npm run preview
```

---

## 5. Main Routes & Features Summary
| Route | Component | Purpose |
| :--- | :--- | :--- |
| `/` | `HomePage` | Hero with scenic Pakistan imagery, Urdu branding, stats, featured packages, and value propositions. |
| `/tours` | `ToursPage` | Catalog of 12 packages with live text search, region filter, difficulty filter, altitude filter, and multi-option sorting. |
| `/tours/:id` | `TourDetailsPage` | Parameterized route showing day-by-day itinerary, inclusions, altitude advisory, interactive budget customizer, and 404 fallback for invalid IDs. |
| `/book` | `BookingPage` | Registration checkout form with individual vs. family mode, dynamic member addition, CNIC/phone validation, medical triage, payment simulation, and persistent draft restoration. |
| `/gallery` | `GalleryPage` | Photo gallery of Pakistan's picturesque tourist spots with category filtering. |
| `/reviews` | `ReviewsPage` | Testimonials from individual adventurers, multi-generational families, and student friend groups. |
| `*` | `NotFoundPage` | Friendly 404 fallback with clear navigation links back to active routes. |

---

## 6. Examiner Edge-Case Testing Guide (Task 6.1)
A dedicated **FAST NUCES Viva / Demo Testing Bar** is fixed at the top of the screen to enable quick evaluation of required edge cases:

1. **Simulate Network Failure (FR14):**
   - Check *"Simulate Network Failure"* in the top toolbar.
   - Navigate to `/tours` or click *"Retry Loading Packages"*.
   - **Observed Behavior:** Shows a clean red error state with descriptive guidance and a working **Retry** button.
   - Uncheck the box and click **Retry** to observe instant recovery.

2. **Simulate Sold-Out Availability (FR12 & Task 6.1):**
   - Check *"Simulate Sold-Out Seats"* in the top toolbar.
   - **Observed Behavior:** Tours reflect *"Sold Out"* badges, and booking CTA buttons are disabled with warning feedback.

3. **Restored Draft & Stale Selection (FR13 & Task 6.1):**
   - Select a tour, customize add-ons, enter coupon `SAIR10`, and click *"Proceed with Custom Package"*.
   - Refresh the page at `/book` or close and reopen the browser.
   - **Observed Behavior:** A green banner confirms draft restoration with all custom options, member counts, and discounts intact.
   - Click *"Clear Saved Draft"* in the demo toolbar to verify clean reset.

4. **Invalid URL / 404 Handling (Task 6.1):**
   - Enter an invalid URL such as `/tours/invalid-id-999` or `/random-page`.
   - **Observed Behavior:** Displays a user-friendly 404 screen explaining that the expedition path is missing, providing direct buttons back to Home or All Tours.

---

## 7. Concept Map
| Concept | Relevant File | Component / Function |
| :--- | :--- | :--- |
| **Routing & Parameterized Paths** | `src/App.jsx`, `src/pages/TourDetailsPage.jsx` | `<BrowserRouter>`, `<Routes>`, `<Route>`, `useParams()` |
| **Asynchronous Mock Loader** | `src/services/tourService.js` | `tourService.getAllTours()`, `tourService.getTourById()` |
| **Derived State & Filtering** | `src/pages/ToursPage.jsx` | `useMemo()` combining search query, region, difficulty, and sort criteria |
| **Capacity & Pricing Business Rules** | `src/utils/pricingRules.js` | `validateGroupCapacity()`, `calculateTourPricing()` |
| **High-Altitude Medical Triage Rule**| `src/utils/pricingRules.js`, `src/pages/BookingPage.jsx` | `validateMedicalEligibility()` |
| **Automated Node.js Testing** | `tests/pricingRules.test.js` | `node:test`, `node:assert/strict` test suite |
| **Controlled Forms & Dynamic Arrays**| `src/pages/BookingPage.jsx` | `primaryTraveler`, `groupMembers` array (`map`, `filter`, spread updates) |
| **Form Validation & Preservation** | `src/utils/formatters.js`, `src/pages/BookingPage.jsx` | `isValidCNIC()`, `isValidPhone()`, `validateForm()` |
| **Client Storage Persistence** | `src/utils/storage.js` | `storage.getBookingDraft()`, `storage.saveBookingDraft()` |
| **Outcome Modal & Simulated Email** | `src/components/ConfirmationModal.jsx` | `<ConfirmationModal />` (pop-up dialog and email notification alert) |

---

## 8. Simulated Operations & Known Limitations
- **Simulated Payment:** Credit card, JazzCash, Easypaisa, and Bank Transfer selections simulate payment authorization without charging real accounts.
- **Simulated Email:** Upon completing a booking, a popup confirms the booking and alerts the user that a confirmation receipt has been dispatched to their email address. No external SMTP server is required.
- **Data Scope:** Tour packages, gallery photos, and reviews are loaded locally through a simulated asynchronous service with mock network latency.
