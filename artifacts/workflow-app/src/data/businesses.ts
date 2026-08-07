export type BusinessCategory = 'Coffee' | 'Food' | 'Drinks' | 'Wellness' | 'Shops';

export type Business = {
  id: string;
  name: string;
  category: BusinessCategory;
  neighborhood: string;
  address: string;
  description: string;
  editorialNote: string;
  hours: string;
  phone: string;
  website: string;
  price: '$' | '$$' | '$$$';
  rating: number;
  reviewCount: number;
  image: string;
  color: string;
  tags: string[];
  openNow: boolean;
};

export const businesses: Business[] = [
  {
    id: 'field-day',
    name: 'Field Day',
    category: 'Coffee',
    neighborhood: 'Mission District',
    address: '307 Valencia Street, San Francisco',
    description: 'A sunny neighborhood coffee bar for cardamom buns, precise espresso, and lingering afternoons.',
    editorialNote: 'The kind of place that makes a Tuesday feel like a small occasion.',
    hours: 'Mon–Sun · 7:00 am–4:00 pm',
    phone: '(415) 555-0182',
    website: 'fielddaysf.com',
    price: '$$',
    rating: 4.8,
    reviewCount: 214,
    image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=1200',
    color: '#e5ad8b',
    tags: ['Pastries', 'Outdoor tables', 'Laptop-friendly'],
    openNow: true,
  },
  {
    id: 'little-lagniappe',
    name: 'Little Lagniappe',
    category: 'Food',
    neighborhood: 'Bernal Heights',
    address: '412 Cortland Avenue, San Francisco',
    description: 'A tiny Gulf-inspired counter serving hot sandwiches, cold drinks, and a little something extra.',
    editorialNote: 'Come hungry; leave with a new favorite corner of the city.',
    hours: 'Tue–Sat · 11:30 am–9:00 pm',
    phone: '(415) 555-0124',
    website: 'littlelagniappesf.com',
    price: '$$',
    rating: 4.7,
    reviewCount: 168,
    image: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=1200',
    color: '#b9c6a2',
    tags: ['Walk-ins welcome', 'Patio', 'Sandwiches'],
    openNow: true,
  },
  {
    id: 'casa-mora',
    name: 'Casa Mora',
    category: 'Drinks',
    neighborhood: 'Potrero Hill',
    address: '1690 18th Street, San Francisco',
    description: 'Low-lit, high-spirited aperitivo with an excellent vermouth list and the best bar snacks around.',
    editorialNote: 'A golden-hour bar with a point of view.',
    hours: 'Wed–Sun · 4:00 pm–11:00 pm',
    phone: '(415) 555-0199',
    website: 'casamorasf.com',
    price: '$$$',
    rating: 4.9,
    reviewCount: 92,
    image: 'https://images.pexels.com/photos/941864/pexels-photo-941864.jpeg?auto=compress&cs=tinysrgb&w=1200',
    color: '#d3b7a7',
    tags: ['Natural wine', 'Date night', 'Reservations'],
    openNow: true,
  },
  {
    id: 'common-thread',
    name: 'Common Thread',
    category: 'Shops',
    neighborhood: 'Noe Valley',
    address: '1288 Sanchez Street, San Francisco',
    description: 'A considered little shop of useful things: linen, paper, ceramics, and gifts worth keeping.',
    editorialNote: 'For the person who notices the nice details.',
    hours: 'Mon–Sat · 10:00 am–6:00 pm',
    phone: '(415) 555-0171',
    website: 'commonthreadsf.com',
    price: '$$',
    rating: 4.6,
    reviewCount: 74,
    image: 'https://images.pexels.com/photos/3738086/pexels-photo-3738086.jpeg?auto=compress&cs=tinysrgb&w=1200',
    color: '#c5d1cf',
    tags: ['Home goods', 'Local makers', 'Gifts'],
    openNow: true,
  },
  {
    id: 'slow-burn',
    name: 'Slow Burn',
    category: 'Wellness',
    neighborhood: 'Dogpatch',
    address: '744 Tennessee Street, San Francisco',
    description: 'Infrared sauna, restorative movement, and a quiet hour away from the city’s bright edges.',
    editorialNote: 'A reset button disguised as a neighborhood studio.',
    hours: 'Mon–Sun · 6:00 am–8:00 pm',
    phone: '(415) 555-0163',
    website: 'slowburnsf.com',
    price: '$$$',
    rating: 4.8,
    reviewCount: 51,
    image: 'https://images.pexels.com/photos/3865554/pexels-photo-3865554.jpeg?auto=compress&cs=tinysrgb&w=1200',
    color: '#cfb4bf',
    tags: ['Sauna', 'Classes', 'Gift cards'],
    openNow: true,
  },
  {
    id: 'marigold-table',
    name: 'Marigold Table',
    category: 'Food',
    neighborhood: 'Inner Sunset',
    address: '1372 9th Avenue, San Francisco',
    description: 'Seasonal cooking, warm light, and a table that feels like it has been waiting for you.',
    editorialNote: 'The neighborhood dinner you will plan your week around.',
    hours: 'Thu–Mon · 5:00 pm–10:00 pm',
    phone: '(415) 555-0146',
    website: 'marigoldtablesf.com',
    price: '$$$',
    rating: 4.9,
    reviewCount: 133,
    image: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=1200',
    color: '#e7c681',
    tags: ['Seasonal', 'Reservations', 'Vegetarian-friendly'],
    openNow: false,
  },
];

export const categories: Array<'All' | BusinessCategory> = ['All', 'Coffee', 'Food', 'Drinks', 'Wellness', 'Shops'];