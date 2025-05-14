export interface UserReview {
  review_id: number;
  tour_id: number;
  user_id: number;
  comment: string;
  timestamp: string;
  average_rating: string;
  booking_id: number;
  departure_id: number;
  tour_title: string;
  departure_date: string;
  rating: Rating;
}

export interface Rating {
  Foods: number;
  Guides: number;
  Hotels: number;
  Safety: number;
  Quality: number;
  Services: number;
}

export interface TourDetails {
  tour_id: number;
  image_url?: string;
}
