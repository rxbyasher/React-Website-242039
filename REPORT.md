# National University of Computer and Emerging Sciences (FAST NUCES)
## Islamabad Campus — Department of Computer Science
### CS4032: Web Programming | Fall 2026
---
# Assignment 02: Business Website Development Using React
## Project: پاکستان کی سیر (Pakistan ki Sair) — Tour & Travel Experience Platform

---

## 1. Student and Project Details

| Field | Detail |
| :--- | :--- |
| **Student Name** | Ramla Shamsher |
| **Roll Number** | 24I-2039 |
| **Section** | CY-5C |
| **Business Name** | پاکستان کی سیر (Pakistan ki Sair) |
| **Business Domain** | Tourism, Adventure Expeditions & Group Travel Planning |
| **Public GitHub Repository** | `https://github.com/your-username/pakistan-ki-sair` *(Replace with your link)* |
| **Live Deployed Website** | `https://pakistan-ki-sair.vercel.app` *(Replace with your link)* |
| **Final Commit Hash** | `a619681` *(or your latest git commit SHA)* |

---

## 2. Business Profile

| Element | Specification |
| :--- | :--- |
| **Business Identity** | **پاکستان کی سیر (Pakistan ki Sair)** — A travel and expedition platform offering curated domestic group adventures, cultural retreats, and customizable journeys across Pakistan. |
| **Primary Audience** | Domestic Pakistani families, university student friend groups, couples, and overseas Pakistanis visiting scenic northern and heritage regions. |
| **Operating Area** | Pakistan — Nationwide departure hubs from Islamabad/Rawalpindi, Lahore, and Karachi servicing destinations in Gilgit-Baltistan, KPK, Azad Kashmir, Balochistan, Punjab, and Sindh. |
| **Main Customer Task** | Browse tour expeditions, filter and sort by region, difficulty, or altitude; customize packages by adding upgrades or deducting unwanted inclusions to match personal budgets; register solo or multi-member groups with CNIC, emergency contact, and medical declarations; review a transparent calculated summary; and receive instant booking confirmation. |
| **Business Goal** | Complete verified online tour reservations with transparent pricing and upfront medical triage, reducing booking abandonment and manual WhatsApp coordination overhead. |
| **Offering (12 Tours)** | 1. Hunza & Khunjerab Expedition (PKR 52,000)<br>2. Skardu, Shangrila & Deosai Plains (PKR 65,000)<br>3. Fairy Meadows & Nanga Parbat Trek (PKR 48,000)<br>4. Swat Valley, Kalam & Malam Jabba (PKR 28,000)<br>5. Neelum Valley & Arang Kel Kashmir (PKR 34,000)<br>6. Kumrat Valley & Katora Lake (PKR 36,000)<br>7. Gwadar, Ormara & Makran Coastal Highway (PKR 38,000)<br>8. Walled City of Lahore Heritage Trail (PKR 22,000)<br>9. Cholistan Desert & Derawar Fort Glamping (PKR 32,000)<br>10. Gorakh Hill Station Retreat (PKR 24,000)<br>11. Kalash Valley & Chitral Cultural Odyssey (PKR 49,000)<br>12. Naltar Rainbow Lakes Expedition (PKR 46,000) |

---

## 3. Three Operating Rules

### Rule 1: Capacity & Group Size Limit (Availability / Capacity)
- **Exact Condition:** Standard online bookings accept between 1 and 12 travelers (`1 <= travelerCount <= 12`).
- **Where Told:** Next to the traveler count stepper in `PackageCustomizer.jsx` and `BookingPage.jsx`.
- **Response:**
  - `travelerCount < 1`: Submitting is blocked with error *"Booking requires at least 1 traveler."*
  - `travelerCount === 12`: Increment button is disabled, and an alert indicates standard online booking limit reached.
  - `travelerCount > 12`: Blocked with notice *"Standard online bookings accept up to 12 travelers. For larger groups, please contact our custom expedition desk."*
- **Boundary Case:** Exactly 12 travelers is accepted; 13 travelers triggers rejection.

### Rule 2: High-Altitude Medical Clearance Gate (Eligibility / Compatibility)
- **Exact Condition:** For tours with base or maximum altitude exceeding **3,000 meters** (e.g., Fairy Meadows 3,300m, Skardu/Deosai 4,114m), if any traveler reports pre-existing asthma or heart conditions, booking requires an explicit physician medical clearance confirmation (`medicalClearanceAcknowledged === true`).
- **Where Told:** Amber advisory banner on `TourDetailsPage.jsx` and an alert box under Medical Information on `BookingPage.jsx`.
- **Response:** If declared medical condition is true and acknowledgment is false, the booking confirmation button remains disabled and an alert prompt is displayed.
- **Boundary Case:** A tour below 3,000m (e.g., Swat Valley at 980m or Lahore at 215m) records the medical notes for the guide but does not lock the booking gate.

### Rule 3: Tiered Discounts & Fulfilment Threshold (Pricing / Fulfilment)
- **Exact Condition:**
  - 10% discount for registered Community Members or entering coupon `SAIR10`.
  - Automatic 5% discount for Family/Groups booking for 4 or more travelers (`travelerCount >= 4`).
  - Stacking allowed up to 15% maximum discount.
  - Minimum deposit payable is Rs. 5,000 per person.
- **Where Told:** Real-time calculated summary card in `PackageCustomizer.jsx` and `BookingPage.jsx`.
- **Response:** Calculates net payable total dynamically using derived state without page reloads.
- **Boundary Case:** Exactly 4 travelers unlocks the 5% Family Group discount; 3 travelers does not.

---

## 4. Reference-Site Investigation (Three Observed Problems)

### Problem 1: Inflexible Packages and Opaque Add-on Pricing
- **Reference URL:** *FindMyAdventure.pk / TravelWalas.pk*
- **Affected Task:** Customizing a tour package according to personal traveler budget.
- **Observed Difficulties:** Packages are rigid and non-customizable. Travelers who bring their own cars or prefer local street food cannot deduct transport or meal fees. Users must make manual phone calls or WhatsApp inquiries to get custom rates.
- **Business Consequence:** Price-sensitive domestic travelers and students abandon the site when they cannot customize costs.
- **How Pakistan ki Sair Solves It:** Built an interactive `PackageCustomizer` allowing subtractive options (e.g., self-transport deducts Rs. 8,000) and additive options (e.g., 4x4 passu jeep safari +Rs. 4,500) with instant recalculated pricing.

### Problem 2: Flat Contact Forms Lacking Multi-Member Registration & Medical Triage
- **Reference URL:** *KarakoramExpeditions.com / Pakistani Tour Portals*
- **Affected Task:** Booking for family groups and disclosing safety/medical risks.
- **Observed Difficulties:** Existing sites use a flat form with only one name and phone number (`"Number of people: 5"`). High-altitude mountain tours in Northern Pakistan require CNIC identification for police/army checkpoints, emergency next-of-kin contacts, and screening for asthma or heart conditions before departure.
- **Business Consequence:** Chaotic coordination on departure day, unexpected altitude sickness emergencies on trails, and delay at checkpoint permit desks.
- **How Pakistan ki Sair Solves It:** Implemented dynamic member cards for families/groups collecting full names, valid 13-digit CNICs, emergency phones, and a structured medical screening checklist triggering Operating Rule 2.

### Problem 3: State Reset on Page Refresh & Hidden Promotional Discounts
- **Reference URL:** *Local Tourism Booking Forms*
- **Affected Task:** Reviewing tour options and comparing family pricing across browser sessions.
- **Observed Difficulties:** Navigating back from details or refreshing the page clears all customized selections and discount codes. Furthermore, promotional discounts are hidden until the final payment step.
- **Business Consequence:** Frustration from repeated data entry and cart abandonment due to lack of upfront discount transparency.
- **How Pakistan ki Sair Solves It:** Used `localStorage` persistence with a *"Restored your customized plan"* recovery banner, combined with immediate live discount breakdown (10% community code `SAIR10` and 5% family tier).

---

## 5. Frontend Decisions (from DECISIONS.md)

| Decision | Category | Chosen Approach | Alternative | Tradeoff | Code Location |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Decision 1** | Interaction & State | Bidirectional `PackageCustomizer` component with live price calculation | WhatsApp manual inquiry form | More complex local state in details and booking views | `src/components/PackageCustomizer.jsx`, `src/utils/pricingRules.js` |
| **Decision 2** | Information Hierarchy & Mobile Layout | Multi-member dynamic family form with upfront medical triage | Single unstructured freeform textarea | Longer vertical form on 390px mobile view | `src/pages/BookingPage.jsx`, `src/styles/booking.css` |
| **Decision 3** | State Persistence | `localStorage` persistence with draft restoration banner and demo reset | Transient in-memory React state (lost on reload) | Requires defensive stale data validation | `src/utils/storage.js`, `src/components/DemoToolbar.jsx` |

---

## 6. Verification and Edge-Case Checklist

### 6.1 Manual Edge-Case Handling Checklist
| Edge Case | User Action | Expected Behaviour | Observed Behaviour | Result |
| :--- | :--- | :--- | :--- | :--- |
| **Loading Failure (FR14)** | Check *"Simulate Network Failure"* in top demo bar and click *"Retry"* | Shows clear error alert with retry button | Displays *"Connection Error: Unable to connect to Pakistan ki Sair tour servers"* with working retry | **PASS** |
| **Sold-Out Tour (FR12)** | Check *"Simulate Sold-Out Seats"* in top demo bar | Sold-out badge displayed; booking CTA disabled | Displays *"Sold Out"* badge; booking button disabled with warning text | **PASS** |
| **Invalid Tour ID (FR02)** | Enter `/tours/invalid-id-xyz` in URL | Shows friendly 404 message and link back to tours | Displays *"Expedition package not found"* with *"Browse Available Packages"* button | **PASS** |
| **Invalid Form Inputs (FR10)** | Enter invalid CNIC `12345` and invalid phone `111` | Specific field error messages; valid inputs preserved | Red validation text shown; previously entered valid name and email preserved | **PASS** |
| **Restored Selection (FR13)** | Customize package, refresh `/book` | Restores customized options with alert banner | Green banner *"Restored your customized plan"* appears with all options preserved | **PASS** |

### 6.2 Automated Business-Rule Test Result (Task 6.2)
- **Test Runner:** Node.js built-in test runner (`node --test`)
- **Test File:** `tests/pricingRules.test.js`
- **Output:**
```
> assignment-2@0.0.0 test
> node --test

✔ Operating Rule 1 - Group Capacity: Valid ordinary group size (4 travelers) (2.62ms)
✔ Operating Rule 1 - Group Capacity: Boundary limit (exactly 12 travelers) (0.43ms)
✔ Operating Rule 1 - Group Capacity: Exceeding boundary limit (13 travelers) (3.08ms)
✔ Operating Rule 1 - Group Capacity: Under minimum boundary (0 travelers) (0.80ms)
✔ Operating Rule 3 - Pricing: Calculates family discount at exactly 4 members threshold (1.08ms)
✔ Operating Rule 3 - Pricing: Stacking community (10%) and family (5%) discounts (0.55ms)
✔ Operating Rule 2 - Medical Eligibility: High altitude blocks without medical clearance acknowledgement (0.81ms)

ℹ tests 7
ℹ suites 0
ℹ pass 7
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
```

---

## 7. Known Limitations
1. **Simulated Payment Gateway:** Payment options (JazzCash, Easypaisa, Bank Transfer, Debit Card) simulate authorization without integrating live production banking APIs.
2. **Simulated Email Dispatch:** A notification confirms that a confirmation email and packing checklist were dispatched; no external SMTP service is contacted.
3. **Local Scope:** Data is retrieved from local mock JSON records through an asynchronous Promise service with simulated latency rather than a remote database.
