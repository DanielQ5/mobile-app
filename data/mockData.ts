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

export type Appointment = {
  id: string;
  serviceId: ServiceId;
  serviceName: string;
  date: string;
  status: AppointmentStatus;
};

export type Customer = {
  name: string;
  address: string;
  phone: string;
  email: string;
  plan: string;
};

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
  },
  {
    id: 'a3',
    serviceId: 'mowing',
    serviceName: 'Lawn Mowing',
    date: 'Fri, Jun 26',
    status: 'completed',
  },
];

export const customer: Customer = {
  name: 'Daniel Quintanilla',
  address: '123 Maple Street, Springfield',
  phone: '(555) 012-3456',
  email: 'daniel2356work@gmail.com',
  plan: 'Green Care Monthly',
};
