export type DietaryType = 'veg' | 'non-veg';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  dietary: DietaryType;
  isChefSpecial?: boolean;
  isPopular?: boolean;
  spiceLevel?: 1 | 2 | 3;
}

export interface SpecialtyItem {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  price: number;
  badge: string;
  image: string;
  tags: string[];
}

export interface StoryBeat {
  id: string;
  startPct: number;
  endPct: number;
  badge: string;
  title: string;
  description: string;
  align: 'left' | 'center' | 'right';
}

export interface ReviewItem {
  id: string;
  author: string;
  role: string;
  rating: number;
  comment: string;
  favoriteDish: string;
}

export interface RestaurantConfig {
  name: string;
  tagline: string;
  subtitle: string;
  established: string;
  phone: string;
  phoneDisplay: string;
  whatsapp: string;
  whatsappMessage: string;
  email: string;
  address: string;
  city: string;
  mapsUrl: string;
  timings: {
    days: string;
    lunch: string;
    dinner: string;
  };
  totalFrames: number;
  framePattern: (index: number) => string;
  storyBeats: StoryBeat[];
  specialties: SpecialtyItem[];
  menuCategories: string[];
  menuItems: MenuItem[];
  reviews: ReviewItem[];
}
