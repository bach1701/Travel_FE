export interface ReviewRequest {
  tour_id: number;
  comment: string;
  ratings: RatingReviewRequest;
  departure_id: string;
}

export interface RatingReviewRequest {
  Foods: number;
  Guides: number;
  Hotels: number;
  Safety: number;
  Quality: number;
  Services: number;
}
