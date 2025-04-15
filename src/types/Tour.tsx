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

export interface Tour {
    tour_id: number;
    seller_id: number;
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
  }