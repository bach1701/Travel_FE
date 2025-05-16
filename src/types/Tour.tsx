export interface TourImage {
  image_id: number;
  tour_id: number;
  image_url: string;
  description: string | null;
  upload_date: string;
  is_cover: boolean;
}

export interface TourItinerary {
  title: string;
  day_number: number;
  description: string;
}

export interface TourDeparture {
  departure_id: number;
  tour_id: number;
  start_date: string;
  price_adult: string;
  price_child_120_140: string;
  price_child_100_120: string;
  availability: boolean;
  description: string;
}

export interface Tour {
  tour_id: number;
  seller_id: number;
  seller_name: string;
  title: string;
  duration: string;
  departure_location: string;
  description: string;
  destination: string[];
  region: number;
  itinerary: TourItinerary[];
  max_participants: number;
  availability: boolean;
  images: TourImage[];
  next_departure_adult_price: string;
  next_departure_id: number;
  next_departure_date: string;
  departures: TourDeparture[];
  price_adult: string;
}
