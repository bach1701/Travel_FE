export type RatingCategory = 'Foods' | 'Guides' | 'Hotels' | 'Safety' | 'Quality' | 'Services';

export type ReviewRatings = Record<RatingCategory, number>;

export type Review = {
  review_id: number;
  tour_id: number;
  user_id: number;
  comment: string;
  timestamp: string;
  ratings: ReviewRatings;
  average_rating: string; 
  user_name: string;
  user_avatar: string | null;
};

export type AverageRating = {
  overall_rating: string;
  services_rating: string;
  quality_rating: string;
  guides_rating: string;
  safety_rating: string;
  foods_rating: string;
  hotels_rating: string;
  review_count: string;
};

export type Pagination = {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
};

export type ReviewResponse = {
  reviews: Review[];
  averageRating: AverageRating;
  pagination: Pagination;
};
