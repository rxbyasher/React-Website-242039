/**
 * Pakistan ki Sair - Tour Packages Dataset
 * Minimum 10 selectable records with stable IDs, realistic itineraries,
 * altitude specifications, pricing, inclusions, and customizable components.
 */

export const TOURS_DATA = [
  {
    id: 'pk-hunza-01',
    title: 'Autumn & Blossom Expedition to Hunza & Khunjerab',
    urduTitle: 'ہنزہ و خنجراب کا پروقار سفر',
    tagline: 'Witness the golden valleys, sacred Passu cones, and the world highest border.',
    region: 'Gilgit-Baltistan',
    category: 'Mountain Adventure',
    durationDays: 7,
    durationNights: 6,
    pricePerPerson: 52000,
    baseAltitudeMeters: 2500,
    maxAltitudeMeters: 4693, // Khunjerab Pass
    difficulty: 'Moderate',
    rating: 4.9,
    reviewCount: 142,
    availableSeats: 9,
    isAvailable: true,
    departureCity: 'Islamabad',
    featuredImage: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1000&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1596707328904-89736e4f3586?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&w=1000&q=80'
    ],
    overview: 'Journey through the Karakoram Highway (KKH), often hailed as the eighth wonder of the world. Experience the royal heritage of Baltit and Altit Forts, cruise across the turquoise Attabad Lake, and reach the Sino-Pak border at Khunjerab Pass.',
    itinerary: [
      { day: 1, title: 'Islamabad to Naran / Chilas', desc: 'Departure early morning via Hazara Motorway. Cross Babusar Pass (summer) or drive along Indus river to Chilas.' },
      { day: 2, title: 'Chilas to Karimabad, Hunza', desc: 'Sightseeing at Nanga Parbat Viewpoint and junction of three mighty mountain ranges. Arrive in Karimabad.' },
      { day: 3, title: 'Historical Forts & Eagle Nest', desc: 'Explore 700-year-old Baltit Fort, Altit Fort, and sunset viewpoint at Duikar.' },
      { day: 4, title: 'Attabad Lake & Passu Cones', desc: 'Boating at Attabad Lake, walk the Passu suspension bridge, and admire the Cathedral peaks.' },
      { day: 5, title: 'Khunjerab Pass Excursion', desc: 'Drive through Karakoram National Park up to the Pakistan-China Border (4,693m).' },
      { day: 6, title: 'Karimabad to Besham / Naran', desc: 'Return drive through the dramatic Karakoram gorge.' },
      { day: 7, title: 'Arrival back in Islamabad', desc: 'Safe arrival back at Islamabad pick-up point by evening.' }
    ],
    includedItems: [
      'AC Saloon Coaster / Grand Cabin Transport',
      'Quality Hotel Accommodation (Twin/Triple Sharing)',
      'Daily Buffet Breakfasts & Dinners',
      'Attabad Lake Boating & Entry Tickets to Forts',
      'Experienced Tour Leader & High-Altitude First Aid'
    ],
    removableOptions: [
      { id: 'rem-transport', label: 'Self Transport (Deduct Shared AC Transport)', deduction: 8000 },
      { id: 'rem-meals', label: 'Self Dining (Deduct Pre-planned Dinners)', deduction: 4000 }
    ],
    customAddons: [
      { id: 'add-luxury-hotel', label: 'Serena / Luxus Grand Hotel Upgrade', cost: 14000 },
      { id: 'add-jeep-passu', label: 'Private 4x4 Jeep to Passu Glacier & Borith Lake', cost: 4500 },
      { id: 'add-bbq-night', label: 'Traditional Hunza Cultural Musical Night & Bonfire', cost: 2500 }
    ]
  },
  {
    id: 'pk-skardu-02',
    title: 'Enchanting Skardu, Shangrila & Deosai Plains',
    urduTitle: 'سکردو اور طلسماتی دیوسائی کا سفر',
    tagline: 'Explore the land of giants, cold deserts, and turquoise alpine lakes.',
    region: 'Gilgit-Baltistan',
    category: 'Mountain Adventure',
    durationDays: 8,
    durationNights: 7,
    pricePerPerson: 65000,
    baseAltitudeMeters: 2228,
    maxAltitudeMeters: 4114, // Deosai Plateau
    difficulty: 'Moderate',
    rating: 4.95,
    reviewCount: 188,
    availableSeats: 6,
    isAvailable: true,
    departureCity: 'Islamabad',
    featuredImage: 'https://images.unsplash.com/photo-1596707328904-89736e4f3586?auto=format&fit=crop&w=1000&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1596707328904-89736e4f3586?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1000&q=80'
    ],
    overview: 'Skardu is the gateway to four of the world fourteen eight-thousanders. Traverse the dramatic Jaglot-Skardu road, marvel at the Shangrila Lower Kachura Resort, watch sunset over the Katpana Cold Desert dunes, and cross the flower-carpeted Deosai Plains.',
    itinerary: [
      { day: 1, title: 'Islamabad to Chilas', desc: 'Scenic journey through Hazara and Indus River gorge.' },
      { day: 2, title: 'Chilas to Skardu City', desc: 'Travel on newly paved Skardu Highway, stop at confluence of rivers, arrive in Skardu.' },
      { day: 3, title: 'Upper & Lower Kachura Lakes', desc: 'Visit Shangrila Resort, boat rides, and trout fish farms.' },
      { day: 4, title: 'Deosai Plains & Sheosar Lake', desc: 'Full day 4x4 Jeep expedition into the World’s second highest plateau (4,114m).' },
      { day: 5, title: 'Shigar Valley & Cold Desert', desc: 'Explore 400-year-old Serena Shigar Fort and experience sunset on Sarfaranga dunes.' },
      { day: 6, title: 'Manthoka Waterfall & Khaplu Fort', desc: 'Excursion to scenic Khaplu palace and majestic cascades.' },
      { day: 7, title: 'Skardu to Chilas / Besham', desc: 'Begin return journey along the river.' },
      { day: 8, title: 'Chilas to Islamabad', desc: 'Safe return to Islamabad with unforgettable memories.' }
    ],
    includedItems: [
      'Dedicated AC Transport & 4x4 Deosai Safari Jeeps',
      '7 Nights Hotel Stay in Quality Resorts',
      'Breakfasts & Traditional Balti Dinners',
      'Deosai National Park & Heritage Fort Fees',
      'Oxygen Cylinder & Emergency First Aid on board'
    ],
    removableOptions: [
      { id: 'rem-transport', label: 'Self Transport (Deduct Road Travel)', deduction: 9000 },
      { id: 'rem-meals', label: 'Self Dining (Deduct Dinners)', deduction: 5000 }
    ],
    customAddons: [
      { id: 'add-luxury-shigar', label: 'Serena Shigar Fort Heritage Room Upgrade', cost: 18000 },
      { id: 'add-paramotor', label: 'Katpana Desert Stargazing & Campfire Setup', cost: 3500 },
      { id: 'add-pro-photo', label: 'Personal Photographer & Drone Reel Bundle', cost: 4000 }
    ]
  },
  {
    id: 'pk-fairymeadows-03',
    title: 'Fairy Meadows & Nanga Parbat Base Camp Trek',
    urduTitle: 'پری میڈوز اور قاتل پہاڑ نانگا پربت کا ٹریک',
    tagline: 'Trek beneath the sheer 8,126m Raikot Face of the Killer Mountain.',
    region: 'Gilgit-Baltistan',
    category: 'Mountain Adventure',
    durationDays: 6,
    durationNights: 5,
    pricePerPerson: 48000,
    baseAltitudeMeters: 3300,
    maxAltitudeMeters: 3967, // Beyal Camp / Base Camp
    difficulty: 'Challenging',
    rating: 4.88,
    reviewCount: 96,
    availableSeats: 5,
    isAvailable: true,
    departureCity: 'Islamabad',
    featuredImage: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1000&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1000&q=80'
    ],
    overview: 'An iconic bucket-list trek for true nature lovers. Experience the thrilling Raikot Bridge mountain jeep ride, followed by a picturesque alpine pine forest trek opening into lush meadows with direct views of Nanga Parbat.',
    itinerary: [
      { day: 1, title: 'Islamabad to Chilas', desc: 'Early departure via KKH or Babusar Pass.' },
      { day: 2, title: 'Raikot Bridge to Fairy Meadows', desc: 'Famous 4x4 Jeep ride to Tattu Village, then 3.5 hour guided hike to Fairy Meadows.' },
      { day: 3, title: 'Beyal Camp & Nanga Parbat Base Camp', desc: 'Full day trek through birch forests to Beyal Camp and viewpoint of Raikot Glacier.' },
      { day: 4, title: 'Reflection Lake & Village Leisure', desc: 'Relax at Fairy Meadows, photograph reflection lake, night bonfire under the Milky Way.' },
      { day: 5, title: 'Trek Down & Drive to Naran / Besham', desc: 'Hike down to Tattu, jeep to Raikot Bridge, drive to resting stop.' },
      { day: 6, title: 'Return to Islamabad', desc: 'Arrive in capital by evening.' }
    ],
    includedItems: [
      'Transport Islamabad to Raikot Bridge',
      'Thrilling 4x4 Jeep Ride Tattu return',
      'Wooden Cottage & Alpine Camp Accommodations',
      'Local Mountain Guide & Porter support for group gear',
      'All Meals on mountain trek'
    ],
    removableOptions: [
      { id: 'rem-guide', label: 'Independent Hiking (Deduct Mountain Guide)', deduction: 2000 }
    ],
    customAddons: [
      { id: 'add-horse-riding', label: 'Pony / Horse Ride for Tattu to Meadows Trail', cost: 6000 },
      { id: 'add-sleeping-bag', label: 'Sub-zero High Altitude Sleeping Bag Rental', cost: 2000 }
    ]
  },
  {
    id: 'pk-swat-04',
    title: 'Swat Valley, Kalam & Malam Jabba Retreat',
    urduTitle: 'سوات، کلام اور مالم جبہ کی پرفضا سیر',
    tagline: 'Discover the Switzerland of the East with lush meadows and pine hills.',
    region: 'Khyber Pakhtunkhwa',
    category: 'Family Escapes',
    durationDays: 4,
    durationNights: 3,
    pricePerPerson: 28000,
    baseAltitudeMeters: 980,
    maxAltitudeMeters: 2804, // Malam Jabba
    difficulty: 'Easy',
    rating: 4.75,
    reviewCount: 215,
    availableSeats: 12,
    isAvailable: true,
    departureCity: 'Islamabad',
    featuredImage: 'https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&w=1000&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&w=1000&q=80'
    ],
    overview: 'A family-friendly favorite retreat. Enjoy smooth travel through the Swat Express Motorway, ride the Malam Jabba chairlift and zip-line, explore the gushing riverbanks of Kalam, and take jeeps to Mahodand Lake.',
    itinerary: [
      { day: 1, title: 'Islamabad to Malam Jabba', desc: 'Drive via Swat Motorway, visit White Palace Marghuzar, evening at Malam Jabba ski resort.' },
      { day: 2, title: 'Malam Jabba to Kalam Valley', desc: 'Chairlift and adventure activities, then scenic drive along Swat River to Kalam.' },
      { day: 3, title: 'Mahodand & Ushu Forest Jeep Safari', desc: 'Jeep excursion to trout-rich Mahodand Lake and dense Ushu pine forest.' },
      { day: 4, title: 'Return via Mingora Bazaar', desc: 'Shop traditional Swati shawls and gemstones, return to Islamabad.' }
    ],
    includedItems: [
      'Comfortable Air-Conditioned Coaster',
      'Family-friendly 3-Star Hotels in Malam Jabba & Kalam',
      'Daily Breakfasts and Dinners',
      'Mahodand Lake 4x4 Jeep Safari',
      'Tour escort & road tolls'
    ],
    removableOptions: [
      { id: 'rem-meals', label: 'Self Dining (Deduct Dinners)', deduction: 2500 }
    ],
    customAddons: [
      { id: 'add-deluxe-resort', label: 'Malam Jabba PC / Deluxe Resort Upgrade', cost: 9500 },
      { id: 'add-zipline', label: 'Malam Jabba Adventure Pass (Zipline & Chairlift)', cost: 3500 }
    ]
  },
  {
    id: 'pk-neelum-05',
    title: 'Neelum Valley & Arang Kel Kashmir Haven',
    urduTitle: 'وادی نیلم اور ارنگ کلیل کی سرسبز جنت',
    tagline: 'Step into the green crown of Azad Kashmir, waterfalls, and wooden villages.',
    region: 'Azad Kashmir',
    category: 'Family Escapes',
    durationDays: 5,
    durationNights: 4,
    pricePerPerson: 34000,
    baseAltitudeMeters: 1600,
    maxAltitudeMeters: 2554, // Arang Kel
    difficulty: 'Easy',
    rating: 4.82,
    reviewCount: 165,
    availableSeats: 8,
    isAvailable: true,
    departureCity: 'Islamabad',
    featuredImage: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1000&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1000&q=80'
    ],
    overview: 'Neelum Valley is renowned for its dense green pine slopes, crystal-clear Neelum river, and traditional wooden Kashmiri architecture. Take the cable car up to the heavenly village of Arang Kel, explore Kutton waterfall and Sharda Peeth historical ruins.',
    itinerary: [
      { day: 1, title: 'Islamabad to Muzaffarabad & Kutton', desc: 'Visit Kohala bridge, Muzaffarabad river confluence, and Kutton waterfall.' },
      { day: 2, title: 'Kutton to Keran & Sharda', desc: 'Drive alongside border river, explore Sharda university ruins and river bridge.' },
      { day: 3, title: 'Kel & Hike to Arang Kel', desc: 'Jeep drive to Kel, take local chairlift and short hike into the fairytale meadows of Arang Kel.' },
      { day: 4, title: 'Taobat Border Village (Optional) or Sharda', desc: 'Explore pristine meadows and Kashmiri pine wood homes.' },
      { day: 5, title: 'Return to Islamabad', desc: 'Drive back through scenic Murree Expressway.' }
    ],
    includedItems: [
      'Complete Transport with Professional Mountain Driver',
      '4 Nights Hotel Stay in Scenic Locations',
      'Daily Breakfasts and Kashmiri Dinners',
      'Arang Kel Cable Lift Tickets',
      'Kashmir Tourism Permits'
    ],
    removableOptions: [
      { id: 'rem-meals', label: 'Self Dining (Deduct Dinners)', deduction: 3000 }
    ],
    customAddons: [
      { id: 'add-taobat-jeep', label: 'Private 4x4 Jeep Safari to Remote Taobat Border Village', cost: 5000 },
      { id: 'add-bonfire', label: 'Riverside Kashmiri Trout BBQ & Campfire Night', cost: 2200 }
    ]
  },
  {
    id: 'pk-kumrat-06',
    title: 'Mystical Kumrat Valley & Katora Lake Trek',
    urduTitle: 'وادئ کمراٹ اور کٹورا جھیل کا پراسرار حسن',
    tagline: 'Camp under giant deodar trees along the emerald Panjkora river.',
    region: 'Khyber Pakhtunkhwa',
    category: 'Mountain Adventure',
    durationDays: 5,
    durationNights: 4,
    pricePerPerson: 36000,
    baseAltitudeMeters: 2300,
    maxAltitudeMeters: 3500, // Katora Lake
    difficulty: 'Moderate',
    rating: 4.79,
    reviewCount: 88,
    availableSeats: 7,
    isAvailable: true,
    departureCity: 'Islamabad',
    featuredImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80'
    ],
    overview: 'Kumrat Valley offers an untouched wilderness paradise. Towering deodar pine trees line the gushing emerald waters of the river. Trek past Do Kala Chasma to the glacial bowl of Katora Lake.',
    itinerary: [
      { day: 1, title: 'Islamabad to Thal Village', desc: 'Scenic journey through Dir motorway and Upper Dir.' },
      { day: 2, title: 'Thal to Kumrat Forest & Waterfall', desc: 'Transfer into 4x4 jeeps, enter dense deodar forest, camp near river.' },
      { day: 3, title: 'Trek to Katora Glacial Lake', desc: 'Guided trek through alpine pastures to the bowl-shaped high altitude lake.' },
      { day: 4, title: 'Do Janga & Forest Leisure', desc: 'Explore natural springs, wooden suspension bridges, and photography.' },
      { day: 5, title: 'Return to Islamabad', desc: 'Drive back with arrival late evening.' }
    ],
    includedItems: [
      'Road Transport & Rugged 4x4 Jeeps in Valley',
      'Comfortable Wooden Pods / Alpine Riverside Tents',
      'Breakfasts & Camp Dinners with Bonfire',
      'Trek Leader & Trail Guidance'
    ],
    removableOptions: [
      { id: 'rem-camp', label: 'Use Own Tent & Camping Equipment', deduction: 3000 }
    ],
    customAddons: [
      { id: 'add-trout-fish', label: 'Fresh Wild Panjkora River Trout Barbecue Feast', cost: 2500 }
    ]
  },
  {
    id: 'pk-gwadar-07',
    title: 'Gwadar, Ormara Beach & Makran Coastal Highway',
    urduTitle: 'گوادر، اورماڑا بیچ اور مکران کوسٹل ہائی وے',
    tagline: 'Ride the iconic highway where dramatic desert rock formations meet the Arabian Sea.',
    region: 'Balochistan',
    category: 'Coastal & Beaches',
    durationDays: 4,
    durationNights: 3,
    pricePerPerson: 38000,
    baseAltitudeMeters: 10,
    maxAltitudeMeters: 50,
    difficulty: 'Easy',
    rating: 4.86,
    reviewCount: 110,
    availableSeats: 11,
    isAvailable: true,
    departureCity: 'Karachi',
    featuredImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80'
    ],
    overview: 'Drive on Pakistan most picturesque coastal route. Gaze upon Hingol National Park rock sphinx, Princess of Hope, camp by the pristine sands of Ormara Beach, and explore the Koh-e-Batil hammerhead cliff in Gwadar.',
    itinerary: [
      { day: 1, title: 'Karachi to Ormara Beach', desc: 'Drive via Makran Coastal Highway, stop at Kund Malir and Princess of Hope. Beach camping at Ormara.' },
      { day: 2, title: 'Ormara to Gwadar City', desc: 'Visit Gwadar Port, Hammerhead headland, and sunset at Marine Drive.' },
      { day: 3, title: 'Koh-e-Batil & Deep Sea Boating', desc: 'Climb 600 stairs of Koh-e-Batil for panoramic twin-bay view, boat ride to Astola / island waters.' },
      { day: 4, title: 'Return Drive to Karachi', desc: 'Drive back along coastal sunsets, arrival in Karachi.' }
    ],
    includedItems: [
      'Luxury Coaster Transport from Karachi',
      'Hotel Stay in Gwadar & Beach Glamping in Ormara',
      'Seafood Buffet Dinners & Breakfasts',
      'Hingol National Park Permits & Guide'
    ],
    removableOptions: [
      { id: 'rem-meals', label: 'Self Dining (Deduct Dinners)', deduction: 3000 }
    ],
    customAddons: [
      { id: 'add-deep-sea-boat', label: 'Speedboat Excursion & Snorkeling at Astola Waters', cost: 6500 },
      { id: 'add-beach-quad', label: 'Beach ATV Quad Bike Safari at Ormara Dunes', cost: 2500 }
    ]
  },
  {
    id: 'pk-lahore-08',
    title: 'Walled City of Lahore & Mughal Heritage Trail',
    urduTitle: 'اندرون لاہور اور مغلائی شاہکار کا تاریخی سفر',
    tagline: 'Immerse yourself in centuries of living Mughal, Sikh, and colonial heritage.',
    region: 'Punjab',
    category: 'Cultural Heritage',
    durationDays: 3,
    durationNights: 2,
    pricePerPerson: 22000,
    baseAltitudeMeters: 215,
    maxAltitudeMeters: 215,
    difficulty: 'Easy',
    rating: 4.92,
    reviewCount: 174,
    availableSeats: 15,
    isAvailable: true,
    departureCity: 'Lahore',
    featuredImage: 'https://images.unsplash.com/photo-1588661799402-241c08405630?auto=format&fit=crop&w=1000&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1588661799402-241c08405630?auto=format&fit=crop&w=1000&q=80'
    ],
    overview: 'An unforgettable cultural exploration into the heartbeat of Pakistan. Walk the royal trail from Delhi Gate to Shahi Hammam, admire the intricate fresco tile work of Wazir Khan Mosque, marvel at Badshahi Mosque, Lahore Fort, and enjoy dinner at Fort Food Street.',
    itinerary: [
      { day: 1, title: 'Old City Royal Trail & Shahi Hammam', desc: 'Guided walk through Delhi Gate, restored royal bathhouse, and Wazir Khan Mosque.' },
      { day: 2, title: 'Lahore Fort & Badshahi Mosque', desc: 'Explore Sheesh Mahal (Palace of Mirrors), Badshahi Mosque, and sunset at Food Street.' },
      { day: 3, title: 'Shalimar Gardens & Wagah Border Ceremony', desc: 'Morning visit to Mughal Shalimar Gardens, afternoon flag-lowering parade at Wagah.' }
    ],
    includedItems: [
      'City Transport & Traditional Rangeela Rickshaw Rides',
      'Heritage Boutique Hotel Accommodation',
      'All Monument Entry Tickets & Certified Historian Guide',
      'Authentic Lahori Breakfasts & Food Street Dinner'
    ],
    removableOptions: [
      { id: 'rem-guide', label: 'Self-Guided City Walk (Deduct Historian Guide)', deduction: 2000 }
    ],
    customAddons: [
      { id: 'add-heritage-suite', label: 'Haveli Boutique Hotel Luxury Suite Upgrade', cost: 7000 },
      { id: 'add-culinary-tour', label: 'Secret Old City Street-Food Tasting Night Tour', cost: 2500 }
    ]
  },
  {
    id: 'pk-cholistan-09',
    title: 'Cholistan Desert Safari & Derawar Fort Glamping',
    urduTitle: 'صحرائے چولستان اور قلعہ دراوڑ کا صحرائی مہم',
    tagline: 'Experience camel treks, ancient fortresses, and mystic desert campfires.',
    region: 'Punjab',
    category: 'Desert Safari',
    durationDays: 4,
    durationNights: 3,
    pricePerPerson: 32000,
    baseAltitudeMeters: 150,
    maxAltitudeMeters: 150,
    difficulty: 'Easy',
    rating: 4.81,
    reviewCount: 79,
    availableSeats: 10,
    isAvailable: true,
    departureCity: 'Bahawalpur / Lahore',
    featuredImage: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1000&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1000&q=80'
    ],
    overview: 'Witness the staggering 40 bastions of Derawar Fort rising out of the Rohi sands. Travel to the princely state of Bahawalpur, Noor Mahal palace, and sleep under millions of stars in a desert glamping tent with folk music and BBQ.',
    itinerary: [
      { day: 1, title: 'Bahawalpur City & Noor Mahal', desc: 'Visit Italian-style Noor Mahal, Darbar Mahal, and Bahawalpur museum.' },
      { day: 2, title: 'Derawar Fort & Camel Caravan', desc: 'Drive into deep Cholistan desert, camel trek to nomadic settlements, sunset at fort walls.' },
      { day: 3, title: 'Desert Glamping & Sufi Night', desc: 'Desert 4x4 dune bashing, traditional Rohi folk music, and bonfire feast.' },
      { day: 4, title: 'Uch Sharif Tombs & Return', desc: 'Visit the glazed blue tile shrines of Uch Sharif before returning.' }
    ],
    includedItems: [
      'AC Transport from Lahore / Bahawalpur',
      'Desert Glamping Tents with Bedding & Amenities',
      'Traditional Cholistani Meals & Roasting BBQ',
      'Camel Safari & Desert 4x4 Dune Ride'
    ],
    removableOptions: [
      { id: 'rem-meals', label: 'Self Dining (Deduct Dinners)', deduction: 2500 }
    ],
    customAddons: [
      { id: 'add-dune-quad', label: 'Private 4x4 Desert Dune Bashing & Sandboarding', cost: 4000 }
    ]
  },
  {
    id: 'pk-gorakh-10',
    title: 'Gorakh Hill Station - Murree of Sindh',
    urduTitle: 'گورکھ ہِل اسٹیشن - سندھ کا پرفضا مقام',
    tagline: 'Escape into the cool breezes and starry skies of the Kirthar Mountains.',
    region: 'Sindh',
    category: 'Family Escapes',
    durationDays: 3,
    durationNights: 2,
    pricePerPerson: 24000,
    baseAltitudeMeters: 1734,
    maxAltitudeMeters: 1734,
    difficulty: 'Easy',
    rating: 4.73,
    reviewCount: 92,
    availableSeats: 8,
    isAvailable: true,
    departureCity: 'Karachi',
    featuredImage: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=80'
    ],
    overview: 'Perched at 5,688 feet in the Dadu district, Gorakh is Sindh highest elevation getaway. Leave Karachi heat behind, switch to powerful 4x4 jeeps at Wahi Pandhi, and enjoy panoramic mountain views, cool temperatures, and telescope stargazing.',
    itinerary: [
      { day: 1, title: 'Karachi to Sehwan & Wahi Pandhi', desc: 'Early departure, visit historic Sehwan Sharif, reach base station.' },
      { day: 2, title: '4x4 Climb to Gorakh Summit', desc: 'Thrill ride up the serpentine mountain roads to Gorakh plateau. Sunset at Benazir Point.' },
      { day: 3, title: 'Sunrise View & Return to Karachi', desc: 'Watch golden sunrise over Kirthar range, descend and return to Karachi.' }
    ],
    includedItems: [
      'AC Transport Karachi to Base + Mountain 4x4 Jeeps',
      'Hill Top Resort Cottage / Weatherproof Tents',
      'Warm Breakfasts & Bonfire Dinners',
      'Telescope Stargazing Guidance'
    ],
    removableOptions: [
      { id: 'rem-meals', label: 'Self Dining (Deduct Dinners)', deduction: 2000 }
    ],
    customAddons: [
      { id: 'add-resort-room', label: 'Guaranteed Heated Resort Room (Subject to Availability)', cost: 5000 }
    ]
  },
  {
    id: 'pk-chitral-11',
    title: 'Kalash Valley & Chitral Cultural Odyssey',
    urduTitle: 'وادی کیلاش اور چترال کا ثقافتی میلہ',
    tagline: 'Experience the unique indigenous culture, dance, and wooden architecture of Kalash.',
    region: 'Khyber Pakhtunkhwa',
    category: 'Cultural Heritage',
    durationDays: 6,
    durationNights: 5,
    pricePerPerson: 49000,
    baseAltitudeMeters: 1670,
    maxAltitudeMeters: 3118, // Lowari / Shandur
    difficulty: 'Moderate',
    rating: 4.91,
    reviewCount: 68,
    availableSeats: 6,
    isAvailable: true,
    departureCity: 'Islamabad',
    featuredImage: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1000&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1000&q=80'
    ],
    overview: 'Step into the tranquil valleys of Bumburet, Rumbur, and Birir. Learn about the ancient Kalash traditions, colorful handmade headdresses, traditional music, and visit the historic Shahi Mosque and Fort in Chitral town.',
    itinerary: [
      { day: 1, title: 'Islamabad to Dir & Chitral', desc: 'Cross Lowari Tunnel into the scenic Chitral valley.' },
      { day: 2, title: 'Chitral to Bumburet, Kalash', desc: 'Enter the Kalash Valley, check into local lodge, meet village elders.' },
      { day: 3, title: 'Kalash Culture & Traditional Dance', desc: 'Explore Kalash graveyard, cultural museum, and witness traditional folk dance.' },
      { day: 4, title: 'Rumbur Valley Excursion', desc: 'Visit peaceful Rumbur village and taste organic walnut bread.' },
      { day: 5, title: 'Chitral Shahi Mosque & Polo Ground', desc: 'Tour historical Chitral town and buy famous Chitrali wool patti.' },
      { day: 6, title: 'Return to Islamabad', desc: 'Drive back through scenic motorways.' }
    ],
    includedItems: [
      'Dedicated AC Transport & Valley Jeeps',
      '5 Nights Heritage Lodge Stay',
      'Traditional Local Meals & Breakfasts',
      'Kalash Community Development Entry Fee'
    ],
    removableOptions: [
      { id: 'rem-meals', label: 'Self Dining (Deduct Dinners)', deduction: 3500 }
    ],
    customAddons: [
      { id: 'add-kalash-dress', label: 'Authentic Handmade Kalash Dress & Souvenir Gift Set', cost: 4000 }
    ]
  },
  {
    id: 'pk-naltar-12',
    title: 'Naltar Rainbow Lakes & Shani Glider Expedition',
    urduTitle: 'نلتر کی رنگ برنگی جھیلیں اور سرسبز وادیاں',
    tagline: 'Marvel at crystalline green and blue lakes hidden deep within pine mountains.',
    region: 'Gilgit-Baltistan',
    category: 'Mountain Adventure',
    durationDays: 6,
    durationNights: 5,
    pricePerPerson: 46000,
    baseAltitudeMeters: 2895,
    maxAltitudeMeters: 3100,
    difficulty: 'Moderate',
    rating: 4.87,
    reviewCount: 84,
    availableSeats: 7,
    isAvailable: true,
    departureCity: 'Islamabad',
    featuredImage: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1000&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1000&q=80'
    ],
    overview: 'Naltar is famed for its lush alpine pine forests, ski slopes, and the vibrant colors of Satrangi (seven-colored) and Blue Lake. Experience authentic mountain hospitality in quiet valleys.',
    itinerary: [
      { day: 1, title: 'Islamabad to Chilas', desc: 'Scenic road trip along the Indus River.' },
      { day: 2, title: 'Chilas to Gilgit & Naltar Valley', desc: 'Arrive in Gilgit, switch to 4x4 mountain jeeps for Naltar.' },
      { day: 3, title: 'Satrangi, Blue & Pari Lakes Safari', desc: 'Full day jeep and hike excursion to the three rainbow lakes.' },
      { day: 4, title: 'Pine Forest Hikes & Ski Slope View', desc: 'Leisurely hike through untouched wilderness.' },
      { day: 5, title: 'Naltar to Chilas / Besham', desc: 'Return drive along KKH.' },
      { day: 6, title: 'Return to Islamabad', desc: 'Safe arrival back in Islamabad.' }
    ],
    includedItems: [
      'AC Transport from Islamabad + Mountain 4x4 Jeeps',
      'Quality Hotel Stay & Alpine Lodge',
      'Daily Breakfasts and Dinners',
      'Experienced Local Escort & First Aid'
    ],
    removableOptions: [
      { id: 'rem-meals', label: 'Self Dining (Deduct Dinners)', deduction: 3000 }
    ],
    customAddons: [
      { id: 'add-trout-bbq', label: 'Riverside Fresh Trout Dinner & Musical Night', cost: 2800 }
    ]
  }
];
