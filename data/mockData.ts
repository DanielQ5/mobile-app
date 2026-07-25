export type ServiceId =
  | 'mowing'
  | 'fertilizing'
  | 'aeration'
  | 'weed-control'
  | 'leaf-cleanup';

export type Service = {
  id: ServiceId;
  icon: string;
  name: string;
  description: string;
  price: string;
};

export type AppointmentStatus = 'upcoming' | 'completed';

export type LawnHealthStatus = 'excellent' | 'fair' | 'needs-attention';

export type Appointment = {
  id: string;
  serviceId: ServiceId;
  serviceName: string;
  date: string;
  status: AppointmentStatus;
  notes?: string;
  rating?: number;
  comment?: string;
  isFree?: boolean;
  // Set by the provider after the visit. Editing this from the provider side is a future enhancement;
  // for now it's seeded mock data.
  lawnHealth?: LawnHealthStatus;
};

export type Customer = {
  name: string;
  address: string;
  phone: string;
  email: string;
  plan: string;
};

export const REWARD_THRESHOLD = 5;

export type GardenZoneId = 'front-left' | 'front-right' | 'back-left' | 'back-right';

export type GardenZoneHealth = {
  zone: GardenZoneId;
  label: string;
  status: LawnHealthStatus;
  recommendation: string;
};

// Set by the provider after visits, same as Appointment.lawnHealth. A provider-facing editor
// for this is a future enhancement; for now it's seeded mock data.
export const initialGardenZones: GardenZoneHealth[] = [
  {
    zone: 'front-left',
    label: 'Front Left',
    status: 'excellent',
    recommendation: 'Looking great — keep up the current mowing schedule.',
  },
  {
    zone: 'front-right',
    label: 'Front Right',
    status: 'fair',
    recommendation: 'Light thinning near the walkway — consider overseeding.',
  },
  {
    zone: 'back-left',
    label: 'Back Left',
    status: 'needs-attention',
    recommendation: 'Soil is compacted — schedule an aeration visit.',
  },
  {
    zone: 'back-right',
    label: 'Back Right',
    status: 'fair',
    recommendation: 'A few weed patches spotted — worth a weed-control visit.',
  },
];

export const services: Service[] = [
  {
    id: 'mowing',
    icon: '🌿',
    name: 'Lawn Mowing',
    description: 'Weekly mow, edge, and trim to keep your lawn neat.',
    price: '$45 / visit',
  },
  {
    id: 'fertilizing',
    icon: '🌱',
    name: 'Fertilizing',
    description: 'Seasonal feeding to keep your grass green and healthy.',
    price: '$60 / visit',
  },
  {
    id: 'aeration',
    icon: '🌾',
    name: 'Aeration',
    description: 'Core aeration to relieve soil compaction and boost growth.',
    price: '$90 / visit',
  },
  {
    id: 'weed-control',
    icon: '🚫',
    name: 'Weed Control',
    description: 'Targeted treatment to knock out weeds without harming grass.',
    price: '$55 / visit',
  },
  {
    id: 'leaf-cleanup',
    icon: '🍂',
    name: 'Leaf Cleanup',
    description: 'Full yard leaf removal and haul-away.',
    price: '$70 / visit',
  },
];

export const initialAppointments: Appointment[] = [
  {
    id: 'a1',
    serviceId: 'mowing',
    serviceName: 'Lawn Mowing',
    date: 'Fri, Jul 12',
    status: 'upcoming',
  },
  {
    id: 'a2',
    serviceId: 'fertilizing',
    serviceName: 'Fertilizing',
    date: 'Tue, Jun 30',
    status: 'completed',
    rating: 5,
    lawnHealth: 'excellent',
  },
  {
    id: 'a3',
    serviceId: 'mowing',
    serviceName: 'Lawn Mowing',
    date: 'Fri, Jun 26',
    status: 'completed',
    rating: 4,
    comment: 'Great job, but showed up a bit late.',
    lawnHealth: 'fair',
  },
];

export const customer: Customer = {
  name: 'Daniel Quintanilla',
  address: '123 Maple Street, Springfield',
  phone: '(555) 012-3456',
  email: 'daniel@test.com',
  plan: 'Green Care Monthly',
};

export type CareTip = {
  keywords: string[];
  response: string;
};

export const careTipFallback =
  "Hmm, I'm not sure about that one yet — try describing what you're seeing (color, texture, dry/wet), or book a service and we'll take a look.";

export const careTips: CareTip[] = [
  {
    keywords: ['dry', 'brown', 'crispy', 'crunchy'],
    response: 'Sounds like it needs more water — try a deep watering early in the morning, 2–3x a week.',
  },
  {
    keywords: ['yellow', 'patchy', 'patches'],
    response: 'Yellow patches are often a sign of uneven feeding — a fertilizing visit could help even things out.',
  },
  {
    keywords: ['weeds', 'weedy'],
    response: 'For weeds, a targeted weed-control treatment is usually the fastest fix — want me to have you book one?',
  },
  {
    keywords: ['soggy', 'mushy', 'overwatered', 'wet'],
    response: 'That can mean overwatering or poor drainage — try cutting back watering frequency and see if it improves.',
  },
  {
    keywords: ['bugs', 'pests', 'insects'],
    response: 'Pests can be tricky to diagnose over chat — I\'d recommend booking a visit so someone can take a look in person.',
  },
];
