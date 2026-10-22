import { Treatment, ClinicLocation, FAQItem, PatientStory, ReviewItem } from '../types';

export const PRACTICE_CONFIG = {
  brandName: 'FORME Orthodontics',
  shortName: 'FORME',
  tagline: 'A confident smile, designed around you.',
  phoneDisplay: '+1 (000) 000-0000',
  phoneRaw: '+10000000000',
  email: 'care@formeortho.com',
  whatsappNumber: '15558394402',
  whatsappMessage: 'Hello, I would like to inquire about booking an orthodontic consultation with FORME Orthodontics.',
  heroInteriorImage: '/src/assets/images/forme_studio_suite_1792612619340.jpg',
  disclaimer: 'Orthodontic treatment suitability and outcomes are determined during a comprehensive clinical examination. Information provided is for educational reference only.',
};

export const TREATMENTS: Treatment[] = [
  {
    id: 'clear-aligners',
    title: 'Clear Aligners',
    tagline: 'Discreet, removable alignment tailored to your lifestyle',
    description:
      'Clear aligners offer a subtle, virtually invisible way to straighten your teeth using a series of custom-molded, BPA-free transparent trays. Designed with 3D digital precision, aligners gently guide your teeth into optimal harmony while allowing you to eat, brush, and floss with complete freedom.',
    keyFeatures: [
      'Removable for meals, special occasions, and effortless brushing',
      'Smooth, low-profile medical polymers with zero wires or brackets',
      'Digital 3D simulation showing planned movement before you begin',
      'Fewer emergency appointments and check-in visits',
    ],
    idealFor: 'Teens and adults seeking an inconspicuous, lifestyle-friendly treatment for mild to moderate crowding, spacing, or relapse.',
    durationContext: 'Typical duration varies based on complexity, commonly ranging from 6 to 18 months under clinical supervision.',
    image: 'aligner',
  },
  {
    id: 'traditional-braces',
    title: 'Traditional Braces',
    tagline: 'Time-tested precision for comprehensive orthodontic care',
    description:
      'Modern traditional braces are sleeker, lighter, and more comfortable than ever. Engineered with low-profile stainless steel brackets and shape-memory thermal archwires, they provide unmatched biomechanical control to resolve complex dental alignment and skeletal bite discrepancies.',
    keyFeatures: [
      'Gold-standard control for complex rotations, deep bites, and severe crowding',
      'Continuous, reliable micro-movements without requiring patient tray discipline',
      'Modern slimline brackets engineered to minimize cheek and lip friction',
      'Customizable ligature options for personal expression',
    ],
    idealFor: 'Patients of all ages with moderate to severe orthodontic needs, tooth impactions, or significant bite misalignment.',
    durationContext: 'Average treatment ranges from 12 to 24 months, custom-tailored to dental anatomy and jaw development.',
    image: 'braces',
  },
  {
    id: 'ceramic-braces',
    title: 'Ceramic Braces',
    tagline: 'The mechanics of braces with natural tooth-toned aesthetics',
    description:
      'Ceramic braces combine the precision and continuous movement of conventional orthodontics with translucent or tooth-shaded monocrystalline ceramic brackets that blend seamlessly with your natural tooth shade.',
    keyFeatures: [
      'Tooth-colored, stain-resistant brackets designed to match your enamel',
      'Exceptional mechanical strength combined with refined cosmetic subtlety',
      'Subtle frosted or white-coated archwires for enhanced discretion',
      'Ideal balance between aesthetic discretion and clinical control',
    ],
    idealFor: 'Professionals and image-conscious individuals who require the precise tooth movements of brackets without metallic visibility.',
    durationContext: 'Typically spans 14 to 24 months depending on individual orthodontic goals and bite adjustments.',
    image: 'ceramic',
  },
  {
    id: 'early-assessment',
    title: 'Early Orthodontic Assessment',
    tagline: 'Proactive guidance for developing smiles and healthy jaw growth',
    description:
      'The American Association of Orthodontists recommends every child receive an initial orthodontic screening by age 7. Early evaluation allows us to detect subtle developmental cues, guide jaw growth, and create space for erupting adult teeth, often preventing invasive treatments later.',
    keyFeatures: [
      'Non-invasive monitoring of dental eruption and facial symmetry',
      'Interceptive guidance to alleviate severe crowding or crossbites',
      'Gentle habit correction (such as thumb sucking or tongue thrusting)',
      'Most children do not require immediate treatment—simply ongoing observation',
    ],
    idealFor: 'Children aged 7–11 with emerging permanent teeth, crossbites, protruding incisors, or airway/breathing considerations.',
    durationContext: 'Focuses on periodic 6-month observational checks, with interceptive phase 1 care (if indicated) lasting 6 to 12 months.',
    image: 'assessment',
  },
];

export const ORTHODONTIST_BIO = {
  name: 'Dr. Elena Vance, DDS, MS',
  title: 'Specialist Orthodontist & Clinical Director',
  credentials: [
    'Doctor of Dental Surgery (DDS) — Top Honors',
    'Master of Science in Orthodontics & Dentofacial Orthopedics',
    'Board Certified Specialist Orthodontist',
  ],
  experience: '14+ Years in Clinical Orthodontics',
  philosophy:
    'Orthodontics is an art of delicate balance where architectural precision meets human empathy. I believe a healthy, radiant smile should never feel artificial or identical to anyone else’s. We listen closely to your personal concerns, examine your full facial harmony, and engineer a gentle, minimally invasive treatment journey tailored strictly to your life.',
  specialInterests: [
    'Minimally Invasive Digital Clear Aligner Biomechanics',
    'Facial Aesthetics & Airway-Centric Orthodontic Design',
    'Adult Orthodontics & Pre-Restorative Alignment',
    'Interceptive Early Growth Guidance in Children',
  ],
  memberships: [
    'American Association of Orthodontists (AAO)',
    'World Federation of Orthodontists (WFO)',
    'American Board of Orthodontics (ABO Diplomate)',
  ],
  quote: 'Every smile has its own natural architecture. Our role is to reveal its balance with patience and genuine care.',
};

export const SMILE_JOURNEY_STEPS = [
  {
    step: '01',
    title: 'Consultation & Discovery',
    subtitle: 'Where your journey begins with an open conversation',
    description:
      'We begin with a warm, unhurried discussion about your dental history, aesthetic aspirations, and lifestyle needs. We photograph your smile and perform high-resolution digital 3D scans—with zero messy impressions.',
    details: [
      'Comprehensive digital intraoral 3D scanning',
      'Facial profile and airway photography',
      'Open discussion about your personal aesthetic goals',
      'Clear, honest review of preliminary findings',
    ],
  },
  {
    step: '02',
    title: 'Personalized Assessment',
    subtitle: 'A treatment blueprint tailored to your goals',
    description:
      'Dr. Vance conducts a full diagnostic workup to present your tailored orthodontic roadmap. You will review a 3D digital simulation of your expected tooth movement, understand all appliance choices, and receive transparent pricing.',
    details: [
      'Interactive 3D simulation of your smile progression',
      'Comparison between aligners, ceramic, or traditional braces',
      'Transparent treatment timeframe and investment breakdown',
      'Flexible, interest-free payment schedule options',
    ],
  },
  {
    step: '03',
    title: 'Your Treatment Journey',
    subtitle: 'Gentle progress with attentive, ongoing support',
    description:
      'Your custom appliances are fitted with utmost care. Throughout your treatment, we monitor progress with scheduled check-ins or optional virtual monitoring check-ups, ensuring your experience is comfortable and predictable.',
    details: [
      'Gentle appliance fitting and personal care guidance kit',
      'Regular check-ins (in-clinic or optional virtual check)',
      'Continuous refinement to ensure optimal bite harmony',
      'Custom post-treatment retainers to preserve your new smile',
    ],
  },
];

export const PATIENT_STORIES: PatientStory[] = [
  {
    id: 'story-1',
    initials: 'CM',
    firstName: 'Clara',
    treatment: 'Clear Aligners',
    duration: '14 Months',
    story:
      'As a corporate communications manager, Clara was hesitant to wear visible braces for her crowded lower incisors and overlapping front teeth. With customized clear aligners, she completed her journey discreetly without missing a single presentation.',
    outcomeQuote:
      'The process felt effortless and quiet. No one at work noticed I was wearing aligners, and my confidence in meetings increased tenfold.',
    verifiedConsent: true,
    beforeImage: 'before-1',
    afterImage: 'after-1',
  },
  {
    id: 'story-2',
    initials: 'MR',
    firstName: 'Marcus',
    treatment: 'Ceramic Braces',
    duration: '18 Months',
    story:
      'Marcus had an open bite and deep spacing that affected both his bite comfort and smile confidence. Dr. Vance utilized ceramic brackets to discreetly apply continuous force, closing the gap and establishing functional bite contact.',
    outcomeQuote:
      'Having ceramic brackets made all the difference. They blended into my teeth, and eating now feels completely natural.',
    verifiedConsent: true,
    beforeImage: 'before-2',
    afterImage: 'after-2',
  },
  {
    id: 'story-3',
    initials: 'SL',
    firstName: 'Sophia',
    treatment: 'Early Guidance + Aligners',
    duration: '12 Months',
    story:
      'Sophia’s parents brought her in at age 8 for crossbite concerns. Interceptive Phase 1 expansion created proper arch room, making her subsequent teenage alignment remarkably swift and avoiding extractions.',
    outcomeQuote:
      'The team was so gentle with Sophia from day one. She actually looked forward to her visits and loved seeing her progress.',
    verifiedConsent: true,
    beforeImage: 'before-3',
    afterImage: 'after-3',
  },
];

export const REVIEWS: ReviewItem[] = [
  {
    id: 'rev-1',
    author: 'Eleanor H.',
    rating: 5,
    date: 'Verified Patient',
    treatment: 'Clear Aligners',
    text: 'From the minute you step through the doors, the atmosphere is serene and thoughtful. Dr. Vance takes the time to explain every single stage without rushing. My aligner treatment finished ahead of schedule and the results exceeded my hopes.',
    source: 'Patient Feedback Form',
  },
  {
    id: 'rev-2',
    author: 'David K.',
    rating: 5,
    date: 'Verified Patient',
    treatment: 'Ceramic Braces',
    text: 'At 34, I was nervous about getting braces. The ceramic option was so subtle that friends only noticed if I pointed it out. The clinic is spotless, high-tech, and appointments always run on time.',
    source: 'Patient Feedback Form',
  },
  {
    id: 'rev-3',
    author: 'Rachel M.',
    rating: 5,
    date: 'Parent of Patient',
    treatment: 'Early Orthodontic Assessment',
    text: 'Dr. Vance advised us that my 8-year-old son did not need active treatment yet—just periodic monitoring. That level of medical integrity is rare and deeply appreciated.',
    source: 'Patient Feedback Form',
  },
  {
    id: 'rev-4',
    author: 'Julian T.',
    rating: 5,
    date: 'Verified Patient',
    treatment: 'Comprehensive Orthodontics',
    text: 'Gentle, modern, and genuinely compassionate. The 3D scan and digital preview were fascinating to see. My bite feels balanced and I finally smile without thinking about it.',
    source: 'Patient Feedback Form',
  },
];

export const FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'first-visit',
    question: 'What happens during my first orthodontic consultation?',
    answer:
      'Your initial consultation is a relaxed, comprehensive discovery session. We will examine your teeth and jaws, capture high-resolution digital 3D photographs and scans (no gooey impression trays), and discuss what you would like to achieve. Dr. Vance will explain your orthodontic opportunities, whether treatment is recommended right now, and outline transparent treatment timelines and investment options.',
  },
  {
    id: 'faq-2',
    category: 'treatments',
    question: 'What is the difference between braces and clear aligners?',
    answer:
      'Both systems apply gentle, continuous forces to guide teeth into alignment. Braces use low-profile ceramic or metal brackets affixed to the teeth with high-tech archwires, providing optimal control for complex dental movements. Clear aligners use a sequence of custom-molded, removable transparent trays that you wear 20–22 hours per day. During your consultation, we evaluate your clinical anatomy and lifestyle to determine which option is best suited for you.',
  },
  {
    id: 'faq-3',
    category: 'treatments',
    question: 'How long does orthodontic treatment take?',
    answer:
      'Treatment duration is unique to each patient. Mild aesthetic alignment or minor spacing can often be accomplished in 6 to 12 months, whereas comprehensive correction of severe crowding or skeletal bite discrepancies typically takes 14 to 24 months. We provide an individualized estimate during your personalized assessment.',
  },
  {
    id: 'faq-4',
    category: 'treatments',
    question: 'Can adults receive orthodontic treatment?',
    answer:
      'Absolutely. Approximately one-third of our orthodontic patients are adults. The biological mechanisms that move teeth are the same at any age, provided your teeth and periodontal gums are healthy. With aesthetic options like clear aligners and ceramic brackets, adult treatment is discreet and seamlessly integrates into professional life.',
  },
  {
    id: 'faq-5',
    category: 'financing',
    question: 'Are payment plans or financing available?',
    answer:
      'Yes. We firmly believe financial considerations should never stand between you and a healthy, confident smile. We offer flexible, interest-free in-house monthly payment plans spread over the course of your treatment, as well as assistance with dental insurance benefits and flexible spending accounts (HSA/FSA).',
  },
  {
    id: 'faq-6',
    category: 'care',
    question: 'How often will I need appointments?',
    answer:
      'With modern materials and digital planning, visits are required much less frequently than in the past. Clear aligner patients typically visit every 8 to 12 weeks for check-ins, with optional virtual monitoring between visits. Patients with traditional or ceramic braces usually visit every 6 to 8 weeks for gentle adjustments.',
  },
  {
    id: 'faq-7',
    category: 'first-visit',
    question: 'What should I bring to my first visit?',
    answer:
      'Please bring a photo ID, any dental insurance card or benefit details you wish to apply, and recent dental records or X-rays if you have had them taken in the past 6 months (though we can easily request these from your general dentist with your permission). Most importantly, bring your questions and smile goals!',
  },
];

export const CLINIC_LOCATIONS: ClinicLocation[] = [
  {
    id: 'flagship',
    name: 'Downtown Studio',
    tag: 'Flagship Practice',
    address: '450 Sutter Street, Suite 1200',
    city: 'San Francisco, CA 94108',
    phone: '+1 (555) 839-4402',
    email: 'downtown@formeortho.com',
    hours: {
      weekdays: 'Mon – Thu: 8:00 AM – 6:00 PM · Fri: 8:00 AM – 4:00 PM',
      saturday: 'Select Saturdays: 9:00 AM – 2:00 PM (By Appointment)',
      sunday: 'Closed',
    },
    parkingInfo: 'Validated parking available at the Sutter-Stockton Garage adjacent to our building. Convenient transit access via Powell St BART & Muni.',
    coordinates: { x: 38, y: 44 },
  },
  {
    id: 'westside',
    name: 'Pacific Heights & Presidio',
    tag: 'Boutique Studio',
    address: '2100 Webster Street, Suite 405',
    city: 'San Francisco, CA 94115',
    phone: '+1 (555) 839-4403',
    email: 'westside@formeortho.com',
    hours: {
      weekdays: 'Tue – Fri: 8:30 AM – 5:30 PM',
      saturday: 'Alternate Saturdays: 9:00 AM – 1:00 PM',
      sunday: 'Closed',
    },
    parkingInfo: 'Dedicated underground patient parking on Webster St with direct elevator access to our suite. Fully ADA compliant and wheelchair accessible.',
    coordinates: { x: 26, y: 32 },
  },
  {
    id: 'southbay',
    name: 'Silicon Valley Pavilion',
    tag: 'Innovation Center',
    address: '3000 Sand Hill Road, Building 2',
    city: 'Menlo Park, CA 94025',
    phone: '+1 (555) 839-4404',
    email: 'siliconvalley@formeortho.com',
    hours: {
      weekdays: 'Mon, Wed, Fri: 8:00 AM – 5:00 PM',
      saturday: 'Closed',
      sunday: 'Closed',
    },
    parkingInfo: 'Ample surface visitor parking with complimentary EV charging stations. Close to I-280 Alpine Road exit.',
    coordinates: { x: 62, y: 74 },
  },
];
