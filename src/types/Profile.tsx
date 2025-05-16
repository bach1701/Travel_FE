export interface Profile {
  id: number;
  name: string;
  email?: string;
  role?: string;
  avatar_url?: string;
  phone_number: string;
  address: string;
  status: string;
  total_bookings: number;
  total_reviews: number;
}
