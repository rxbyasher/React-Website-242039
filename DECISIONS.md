# Frontend Decisions (DECISIONS.md)
**Course:** Web Programming (CS4032) | **Semester:** Fall 2026 | **Campus:** FAST NUCES Islamabad  
**Project:** پاکستان کی سیر (Pakistan ki Sair) - Tourism & Travel Experience Platform  

---

## Decision 1: Interactive Bidirectional Package Budget Customizer
*Category: Interaction & State Behaviour*

- **Problem:**  
  Existing Pakistani travel and expedition websites (e.g., *FindMyAdventure.pk*, *TravelWalas.pk*) present rigid, take-it-or-leave-it tour packages. Customers cannot subtract components they do not require (e.g., bringing their own 4x4 vehicle or arranging independent meals) or add experiential upgrades (e.g., luxury heritage hotel suites, jeep safaris) with immediate, transparent price recalculation before reaching checkout.
- **Decision:**  
  Designed and implemented an interactive, bidirectional `PackageCustomizer` component. It tracks additive and subtractive options through local React state and calculates real-time price breakdowns using pure derived functions (`calculateTourPricing`), without requiring server round-trips.
- **Alternative:**  
  Displaying a static price with an informational footnote ("Contact custom desk for modifications") or directing customers to a WhatsApp chat inquiry form.
- **Reason:**  
  Pakistani travelers and university student groups operate on varying budgets. Allowing users to dynamically adjust packages to fit their specific budget directly on the web page eliminates uncertainty and reduces checkout abandonment.
- **Tradeoff:**  
  Increases component state complexity in `TourDetailsPage.jsx` and requires synchronization between package customization and the final booking checkout page.
- **Code Location:**  
  - Component: `src/components/PackageCustomizer.jsx` (`PackageCustomizer`)
  - Business Rule Engine: `src/utils/pricingRules.js` (`calculateTourPricing`)
- **Evidence & Verification Steps:**  
  1. Open any tour page (e.g., `/tours/pk-hunza-01`).
  2. In the "Customize Your Tour Package" card, check **"Self Transport (Deduct Shared AC Transport)"**.
  3. Observe that the per-person price immediately deducts Rs. 8,000, and the subtotal updates instantaneously.
  4. Increase traveler count using the plus button to 4; observe the automatic **5% Family & Group Tier** discount badge and deduction.

---

## Decision 2: Multi-Member Dynamic Family & Group Form with Upfront Medical Triage
*Category: Information Hierarchy & Mobile Layout*

- **Problem:**  
  Conventional travel booking websites utilize a generic single-traveler contact form with a basic number field (`"Number of guests: 4"`), collecting only one phone number. Northern Pakistan expeditions (e.g., Fairy Meadows, Skardu, Khunjerab) reach altitudes between 3,000m and 4,700m where high-altitude sickness (AMS), cardiovascular stress, hotel room allocations, and police/military checkpoint permits require full CNICs, emergency contacts, and medical disclosures for each traveler.
- **Decision:**  
  Engineered an adaptive, responsive registration form in `BookingPage.jsx` supporting both "Individual Traveler" and "Family / Group Booking" modes. When in Family mode, the form renders a lead traveler profile followed by dynamically added member cards (up to 12 members). Each member includes validated CNIC, mobile number, emergency contact, and a structured medical checklist (Asthma, Heart, Allergies) that enforces Operating Rule 2.
- **Alternative:**  
  Using a freeform textarea field asking users to manually type `"Please list all traveler names, CNICs, and any medical issues"`.
- **Reason:**  
  Unstructured text leads to incomplete data, invalid CNIC numbers, missing emergency contacts, and delayed safety triage. The structured multi-member interface ensures that tour leaders possess certified health declarations and emergency numbers prior to departure.
- **Tradeoff:**  
  Generates a longer form on mobile screens (390px). This was mitigated by adding a sticky summary sidebar on desktop, collapsible member cards, and clear step indicators.
- **Code Location:**  
  - Page: `src/pages/BookingPage.jsx` (`BookingPage`)
  - Formatter / Validator: `src/utils/formatters.js` (`isValidCNIC`, `formatCNIC`, `isValidPhone`)
  - Styles: `src/styles/booking.css`
- **Evidence & Verification Steps:**  
  1. Navigate to `/book`.
  2. Toggle **"Family / Group Booking"**.
  3. Click **"Add Member"** to dynamically append family member cards.
  4. Enter an invalid CNIC (e.g., 5 digits); observe immediate feedback preserving valid input.
  5. Check **"Asthma"** or **"Heart Condition"** on a high-altitude tour (>3,000m); observe that Operating Rule 2 engages, displaying the mandatory doctor clearance confirmation checkbox before allowing booking submission.

---

## Decision 3: Local Storage Persistence with Stale-State Recovery & Transparent Discounts
*Category: Interaction & State Persistence*

- **Problem:**  
  On many reference websites, accidental browser refreshes or navigating between tour pages clears selected customizations, entered traveler details, and promo codes. Furthermore, promotional discounts are frequently concealed until the final credit card payment modal, leading to customer mistrust.
- **Decision:**  
  Implemented client-side persistence via `localStorage` through `src/utils/storage.js`. When a user customizes a package or begins a booking, their preferences, member counts, community membership status, and promo codes are safely persisted. A dedicated top demo toolbar (`DemoToolbar.jsx`) provides an explicit **"Clear Saved Draft"** button for easy evaluator testing and clean-state reproduction.
- **Alternative:**  
  Relying solely on transient React in-memory state or forcing users to create an account and log in before drafting a tour plan.
- **Reason:**  
  Travelers in Pakistan frequently compare itineraries and discuss options with family members across multiple sessions before paying. Draft persistence ensures progress is never lost, while transparent real-time discount summaries (10% community code `SAIR10` and 5% family group tier) build customer confidence.
- **Tradeoff:**  
  Requires careful validation against current tour availability upon draft restoration, ensuring that if a tour becomes sold out, the restored draft gracefully prompts the user.
- **Code Location:**  
  - Utility: `src/utils/storage.js` (`storage`)
  - Restoration Hook: `src/pages/BookingPage.jsx` (`useEffect`)
  - Testing Control: `src/components/DemoToolbar.jsx`
- **Evidence & Verification Steps:**  
  1. Go to `/tours/pk-skardu-02`, adjust options, and click **"Proceed with Custom Package"**.
  2. Refresh the browser at `/book` or close and reopen the tab.
  3. Observe the green notification banner: *"Restored your customized plan for Enchanting Skardu..."* with all options and member counts intact.
  4. Click **"Clear Saved Draft"** in the top testing toolbar to verify graceful reset to a default state.
