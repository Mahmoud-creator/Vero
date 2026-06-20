export interface Service {
  id: string;
  name: string;
  price: number;
  unit: "hour" | "job" | "visit";
}

export interface Review {
  id: string;
  author: string;
  avatar?: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Worker {
  id: string;
  name: string;
  avatar?: string;
  categoryId: string;
  profession: string;
  tagline: string;
  bio: string;
  rating: number;
  reviewCount: number;
  hourlyRate: number;
  location: string;
  distanceKm: number;
  jobsCompleted: number;
  responseTime: string;
  verified: boolean;
  online: boolean;
  skills: string[];
  services: Service[];
  reviews: Review[];
}

