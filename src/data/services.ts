import { ServiceItem } from '../types';

export const SERVICES: ServiceItem[] = [
  // SKILLED SERVICES
  {
    id: 'electrician',
    title: 'Electrician',
    slug: 'electrician',
    category: 'skilled',
    tokenPrice: 99,
    estimatedBaseCost: '₹199 - ₹499',
    estimatedDuration: '45 - 90 mins',
    popular: true,
    iconName: 'Zap',
    shortDesc: 'Certified electrical technicians for switches, wiring, fans, inverters, and MCB tripping issues.',
    longDesc: 'Get prompt doorstep service from background-verified electricians in Mohali & Chandigarh. From faulty switchboards to inverter wiring and heavy appliance power points, our technicians come equipped with safety-tested multimeters and insulated toolkits.',
    subcategories: [
      'Switch & Socket Repair',
      'Fan Installation & Repair',
      'Inverter / Battery Servicing',
      'MCB Fuse & Short Circuit',
      'Chandelier & Decorative Lighting',
      'Complete Room Wiring Check'
    ],
    included: [
      'Comprehensive 15-point electrical safety check',
      'Doorstep diagnostic and fault isolation',
      '₹99 booking token fully adjusted in final bill',
      '30-day post-service rework warranty'
    ],
    excluded: [
      'Cost of replacement components (switches, wires, MCBs)',
      'Concealed wall cutting requiring civil masonry work'
    ],
    faqs: [
      {
        question: 'How does the ₹99 token work?',
        answer: 'The ₹99 token confirms your booking slot and dispatches the nearest verified electrician. When the worker presents the final bill, this ₹99 is subtracted directly.'
      },
      {
        question: 'Are the electricians verified?',
        answer: 'Yes! Every worker undergoes police record verification, government Aadhaar KYC check, and a practical trade test before acceptance.'
      },
      {
        question: 'What if I cancel after the technician arrives?',
        answer: 'If the technician has arrived and inspected your issue, a standard ₹99 inspection fee applies to compensate for their travel.'
      }
    ]
  },
  {
    id: 'plumber',
    title: 'Plumber',
    slug: 'plumber',
    category: 'skilled',
    tokenPrice: 99,
    estimatedBaseCost: '₹249 - ₹599',
    estimatedDuration: '45 - 90 mins',
    popular: true,
    iconName: 'Wrench',
    shortDesc: 'Expert leak repairs, tap & shower installations, water tank cleaning, and pipeline unclogging.',
    longDesc: 'Stop water wastage and damp walls with certified plumbers across Mohali and Chandigarh sectors. Equipped with pipe wrenches, Teflon seals, pressure gauges, and drain snakes to resolve any plumbing emergency.',
    subcategories: [
      'Tap, Shower & Mixer Replacement',
      'Toilet Flush Tank & Commode Fix',
      'Pipe Leakage & Seepage Detection',
      'Overhead Water Tank Cleaning',
      'Motor Pump Installation',
      'Drainage Blockage Clearing'
    ],
    included: [
      'Pressure testing and leak identification',
      'Basic joint sealants and thread tape',
      '₹99 token deducted from final labor charges',
      'Clean-up of work area post-fix'
    ],
    excluded: [
      'Cost of sanitary hardware and PVC pipes',
      'Deep underground sewer line excavation'
    ],
    faqs: [
      {
        question: 'Can the plumber buy spare parts for me?',
        answer: 'Yes, if you need replacement taps, internal valves, or connectors, the plumber will show you the retail store receipt with zero markup.'
      },
      {
        question: 'How fast will the plumber reach my house in Mohali?',
        answer: 'Our average arrival time in Mohali (Phases 1-11, Sec 70) and Chandigarh is 28 minutes from job acceptance.'
      }
    ]
  },
  {
    id: 'carpenter',
    title: 'Carpenter',
    slug: 'carpenter',
    category: 'skilled',
    tokenPrice: 149,
    estimatedBaseCost: '₹349 - ₹899',
    estimatedDuration: '60 - 120 mins',
    popular: true,
    iconName: 'Hammer',
    shortDesc: 'Furniture repair, door locks, modular kitchen hinges, bed assembly, and custom wood fixes.',
    longDesc: 'Skilled woodwork professionals for modern modular setups and traditional wooden furniture. We fix jammed doors, broken drawer channels, noisy bed frames, and wardrobe locks.',
    subcategories: [
      'Door Lock & Handle Installation',
      'Modular Kitchen Hinge Replacement',
      'Bed & Wardrobe Assembly / Disassembly',
      'Drawer Channel & Slider Repair',
      'Curtain Rod & Wall Shelf Mounting',
      'Wood Polishing & Touch-up'
    ],
    included: [
      'Door alignment and hinge calibration',
      'Mounting screws and wall plugs',
      '₹149 token deducted from final invoice',
      '14-day workmanship guarantee'
    ],
    excluded: [
      'High-grade lock mechanisms or hydraulic hinges',
      'Laminates and timber boards'
    ],
    faqs: [
      {
        question: 'Do you assemble IKEA / Pepperfry furniture?',
        answer: 'Yes! Our carpenters specialize in flat-pack furniture assembly with proper torque screwdrivers without damaging engineered wood.'
      }
    ]
  },
  {
    id: 'ac-repair',
    title: 'AC Repair Technician',
    slug: 'ac-repair',
    category: 'skilled',
    tokenPrice: 199,
    estimatedBaseCost: '₹399 - ₹1,499',
    estimatedDuration: '60 - 120 mins',
    popular: true,
    iconName: 'Wind',
    shortDesc: 'Split & window AC power jet servicing, gas charging, cooling issues, and uninstallation.',
    longDesc: 'Keep your indoor air crisp and cool during the harsh Punjab summers. Technicians carry high-pressure foam cleaning machines, digital manifold gauges for R32/R410A refrigerant testing, and electrical capacitor testers.',
    subcategories: [
      'Power Jet Foam Deep Servicing',
      'Refrigerant / Gas Leak & Refill',
      'Cooling Coil & PCB Repair',
      'Split AC Installation / Relocation',
      'Compressor Inspection & Capacitor Fix',
      'Water Leakage Drainage Fix'
    ],
    included: [
      'Indoor & outdoor unit coil deep wash',
      'Air filter cleaning and antimicrobial spray',
      'Amperage and cooling delta-T temperature measurement',
      '₹199 token adjusted in final bill'
    ],
    excluded: [
      'New copper piping beyond standard length',
      'Heavy compressor motor replacement'
    ],
    faqs: [
      {
        question: 'Do you provide a cooling warranty on gas recharge?',
        answer: 'Yes, we provide a 60-day cooling warranty on complete refrigerant recharge jobs with leak sealing.'
      }
    ]
  },
  {
    id: 'appliance-repair',
    title: 'Appliance Repair',
    slug: 'appliance-repair',
    category: 'skilled',
    tokenPrice: 149,
    estimatedBaseCost: '₹299 - ₹799',
    estimatedDuration: '45 - 90 mins',
    popular: false,
    iconName: 'Tv',
    shortDesc: 'Diagnose and repair washing machines, refrigerators, microwaves, and water purifiers.',
    longDesc: 'From front-load washing machines that will not spin to single-door and double-door refrigerators that stop chilling, our appliance mechanics diagnose PCB logic boards, motor belts, thermostats, and RO membrane filters.',
    subcategories: [
      'Washing Machine (Front / Top Load)',
      'Refrigerator & Deep Freezer',
      'Microwave Oven & OTG',
      'RO Water Purifier Servicing',
      'Geyser / Water Heater Repair'
    ],
    included: [
      'Full electronic circuit and motor diagnosis',
      'Safety earth-leakage testing',
      '₹149 token credited to final payment',
      'Clear upfront quote before opening sealed parts'
    ],
    excluded: [
      'Brand OEM original compressor or motor replacements',
      'Cosmetic plastic outer body parts'
    ],
    faqs: [
      {
        question: 'Are parts genuine?',
        answer: 'Our technicians only install OEM-certified or branded aftermarket parts with manufacturer warranty.'
      }
    ]
  },
  {
    id: 'painter',
    title: 'Painter',
    slug: 'painter',
    category: 'skilled',
    tokenPrice: 149,
    estimatedBaseCost: '₹499 - ₹2,499',
    estimatedDuration: 'Half Day / Full Day',
    popular: false,
    iconName: 'Paintbrush',
    shortDesc: 'Interior & exterior wall painting, waterproof putty touch-ups, texture accent walls.',
    longDesc: 'Give your home, office, or rental flat a fresh look. We provide experienced wall painters who handle surface sanding, primer basecoats, Asian Paints/Berger emulsion coats, and post-painting floor masking.',
    subcategories: [
      'Single Room Repainting',
      'Water Seepage & Damp Wall Treatment',
      'Designer Texture Accent Wall',
      'Full House Painting Consultation',
      'Metal Grill & Wooden Polish Painting'
    ],
    included: [
      'Drop sheets to protect floor tiles and furniture',
      'Putty smoothening for minor cracks',
      '₹149 token deducted from final contract'
    ],
    excluded: [
      'Cost of paint buckets and primers',
      'Exterior scaffolding for towers above 2 floors'
    ],
    faqs: [
      {
        question: 'Can you help estimate paint quantity?',
        answer: 'Yes! The painter will take laser measurements and calculate exact liters needed to prevent over-buying.'
      }
    ]
  },

  // UNSKILLED SERVICES
  {
    id: 'cleaning-help',
    title: 'Cleaning Help',
    slug: 'cleaning-help',
    category: 'unskilled',
    tokenPrice: 149,
    estimatedBaseCost: '₹399 - ₹1,199',
    estimatedDuration: '2 - 4 hours',
    popular: true,
    iconName: 'Sparkles',
    shortDesc: 'Deep home cleaning, bathroom scrubbing, kitchen de-greasing, and balcony wash.',
    longDesc: 'Thorough cleaning personnel trained for high-standard hygiene. Ideal for pre-festival cleans, post-party cleanup, move-in preparation, or deep bathroom descaling in Mohali & Chandigarh apartments.',
    subcategories: [
      'Bathroom Tile & Fixture Descaling',
      'Kitchen Deep De-greasing & Cabinets',
      'Full Apartment Deep Cleaning',
      'Balcony & Terrace Pressure Wash',
      'Sofa & Mattress Dry Vacuuming'
    ],
    included: [
      'Eco-friendly descaling agents and microfiber mops',
      'High-grade scrubbers and dust masks',
      '₹149 token credited to final bill'
    ],
    excluded: [
      'Cleaning of fragile crystal chandeliers or valuable heirlooms',
      'Waste disposal outside municipal bins'
    ],
    faqs: [
      {
        question: 'Do I need to supply cleaning supplies?',
        answer: 'Basic water and electricity are required from the customer. The cleaning helper brings microfiber cloths, specialized chemicals, and scrubbers.'
      }
    ]
  },
  {
    id: 'household-helper',
    title: 'Household Helper',
    slug: 'household-helper',
    category: 'unskilled',
    tokenPrice: 99,
    estimatedBaseCost: '₹249 - ₹499',
    estimatedDuration: '2 - 3 hours',
    popular: true,
    iconName: 'Home',
    shortDesc: 'Kitchen assistance, utensil washing, floor mopping, dusting, and general home chores.',
    longDesc: 'Need an extra pair of hands for a few hours? Book a polite, punctual domestic helper for immediate assistance when your regular maid is on leave or during family gatherings.',
    subcategories: [
      'Dishwashing & Kitchen Cleanup',
      'Vegetable Chopping & Meal Prep Aid',
      'Complete House Dusting & Mopping',
      'Wardrobe Organizing & Bed Making',
      'Post-Dinner Party Cleanup'
    ],
    included: [
      'Punctual arrival with verified ID verification',
      'Hardworking, respectful helper',
      '₹99 booking token fully adjusted'
    ],
    excluded: [
      'Full gourmet cooking as chief chef',
      'Heavy luggage shifting over stairs'
    ],
    faqs: [
      {
        question: 'Can I book for recurring daily slots?',
        answer: 'Yes! After your initial booking, you can schedule recurring weekly or daily slots through your customer dashboard.'
      }
    ]
  },
  {
    id: 'loading-shifting',
    title: 'Loading and Shifting',
    slug: 'loading-shifting',
    category: 'unskilled',
    tokenPrice: 199,
    estimatedBaseCost: '₹499 - ₹1,499',
    estimatedDuration: '2 - 5 hours',
    popular: true,
    iconName: 'Truck',
    shortDesc: 'Strong helpers for furniture shifting, luggage loading/unloading, and flat relocation.',
    longDesc: 'Physically fit and careful loaders for moving heavy furniture, carton boxes, electronic appliances, and commercial inventory up and down stairs or loading onto mini-trucks.',
    subcategories: [
      'Apartment Shifting Manpower (1-3 Helpers)',
      'Single Heavy Item Movement (Fridge/Almirah)',
      'Loading / Unloading Tata Ace or Pickup',
      'Hostel / PG Room Shifting Manpower',
      'Office Furniture Rearrangement'
    ],
    included: [
      'Heavy-duty lifting straps and grip gloves',
      'Careful handling of breakables and corners',
      '₹199 token deducted against final invoice'
    ],
    excluded: [
      'Transport vehicle hire (manpower only, unless combo requested)',
      'Disassembly of complex mechanical equipment'
    ],
    faqs: [
      {
        question: 'Can I request more than one helper?',
        answer: 'Yes, in the booking form you can specify whether you need 1, 2, or 3 helpers.'
      }
    ]
  },
  {
    id: 'gardening',
    title: 'Gardening Help',
    slug: 'gardening',
    category: 'unskilled',
    tokenPrice: 99,
    estimatedBaseCost: '₹249 - ₹599',
    estimatedDuration: '2 - 3 hours',
    popular: false,
    iconName: 'Flower2',
    shortDesc: 'Lawn mowing, hedge trimming, plant repotting, dry leaf sweeping, and soil manure.',
    longDesc: 'Keep your Chandigarh or Mohali lawn lush, green, and tidy. Our gardeners come with grass shears, hedge clippers, and soil trowels to restore your garden vitality.',
    subcategories: [
      'Lawn Grass Trimming & Edging',
      'Hedge & Shrub Pruning',
      'Plant Repotting & Organic Manure Mixing',
      'Weed Removal & Flowerbed De-stoning',
      'Seasonal Flower Care Consultation'
    ],
    included: [
      'Pruning tools and hand shears',
      'Raking and bundling of green garden waste',
      '₹99 token deducted from final payment'
    ],
    excluded: [
      'Cost of new flowering plants and pots',
      'Chemical pesticide fumigation for large orchards'
    ],
    faqs: [
      {
        question: 'Will the gardener bring his own grass cutter?',
        answer: 'Our gardeners carry manual lawn shears. For motor-powered lawn mowers, please mention in booking notes so a machine-equipped helper is assigned.'
      }
    ]
  },
  {
    id: 'daily-wage-labour',
    title: 'Daily Wage Labour',
    slug: 'daily-wage-labour',
    category: 'unskilled',
    tokenPrice: 199,
    estimatedBaseCost: '₹650 - ₹850 / Day',
    estimatedDuration: '8 Hours Shift',
    popular: true,
    iconName: 'HardHat',
    shortDesc: 'General construction helpers, sand/brick carrying, site clearing, and civil labor.',
    longDesc: 'Reliable, verified daily wage workers for construction sites, warehouse unloading, renovation debris removal, and trench digging. Transparent day-shift rates without middleman cuts.',
    subcategories: [
      'Construction Material Shifting (Bricks, Cement)',
      'Renovation Debris / Malba Clearing',
      'Wall Plaster Chipping & Scraping',
      'Trench & Foundation Digging Assistance',
      'Plot Boundary Leveling'
    ],
    included: [
      'Full 8-hour shift manpower (with standard 1-hour lunch)',
      'Aadhaar verified identity cards',
      'Direct wage transparency, ₹199 token adjusted'
    ],
    excluded: [
      'Masonry skilled trowel finish (this is helper labor)',
      'Heavy machinery operation'
    ],
    faqs: [
      {
        question: 'What are the shift timings?',
        answer: 'Standard shifts run from 9:00 AM to 5:30 PM with a lunch break, or customized as per site supervisor.'
      }
    ]
  },
  {
    id: 'event-helpers',
    title: 'Event Helpers',
    slug: 'event-helpers',
    category: 'unskilled',
    tokenPrice: 149,
    estimatedBaseCost: '₹450 - ₹900 / Shift',
    estimatedDuration: '4 - 8 Hours',
    popular: false,
    iconName: 'PartyPopper',
    shortDesc: 'Catering staff assistants, chair/table layout, banquet hall helpers, and party cleanup.',
    longDesc: 'Ensure your wedding, birthday party, kitty party, or corporate conference runs smoothly in Mohali and Chandigarh banquet venues. Polite helpers for hospitality support.',
    subcategories: [
      'Buffet Setup & Water Serving Support',
      'Banquet Chair & Table Arrangement',
      'Gift Counter & Registration Welcome Desk',
      'Used Crockery Clearing & Washing Area',
      'Post-Event Floor & Tent Cleanliness'
    ],
    included: [
      'Clean attire and courteous etiquette',
      'Timely presence before guests arrive',
      '₹149 token deducted from final payout'
    ],
    excluded: [
      'Master Chef culinary preparation',
      'Bar tending / alcohol mixing'
    ],
    faqs: [
      {
        question: 'Can I book for an evening function?',
        answer: 'Yes, event helpers can be booked for evening shifts (e.g. 6 PM - 12 AM).'
      }
    ]
  },
  {
    id: 'shop-helpers',
    title: 'Shop Helpers',
    slug: 'shop-helpers',
    category: 'unskilled',
    tokenPrice: 199,
    estimatedBaseCost: '₹500 - ₹900 / Day',
    estimatedDuration: 'Full Day / Part Day',
    popular: false,
    iconName: 'Store',
    shortDesc: 'Retail shop assistance, godown stock arrangement, customer packing, and parcel dispatch.',
    longDesc: 'Extra staff for festival rush, stock inventory taking, and daily shop upkeep in Sector 17 Plaza, Phase 7 Mohali, or Shastri Market. Dependable helpers on demand.',
    subcategories: [
      'Stock Unpacking & Shelf Display Stacking',
      'Customer Carry-bag Packaging',
      'Godown Inventory Rearrangement',
      'E-commerce Parcel Tape & Bubble Wrap',
      'Daily Storefront Dusting & Care'
    ],
    included: [
      'Fast learners for retail operations',
      'Verification check',
      '₹199 token adjusted against merchant invoice'
    ],
    excluded: [
      'Cash register / billing counter handling',
      'Driving store delivery vans'
    ],
    faqs: [
      {
        question: 'Can shop owners book for a whole week?',
        answer: 'Yes! We support weekly merchant passes with discounted commission rates.'
      }
    ]
  }
];

