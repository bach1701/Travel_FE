export interface UserBooking {
  booking_id: number;
  departure_id: number;
  user_id: number;
  num_adults: number;
  num_children_120_140: number;
  num_children_100_120: number;
  total_price: string;
  booking_status: string;
  special_requests?: string;
  booking_date: string;
  original_price?: string | null;
  discount?: string;
  promotion_id?: number | null;
  contact_info?: {
    email: string;
    phone: string;
    address: string;
    fullname: string;
  } | null;
  passengers?:
    | {
        gender: string;
        birthday: string;
        fullname: string;
        ticket_type: string;
      }[]
    | null;
  order_notes?: {
    smoking?: boolean;
    disabled?: boolean;
    pregnant?: boolean;
    high_floor?: boolean;
    vegetarian?: boolean;
    invoice_need?: boolean;
    invoice_needed?: boolean;
  };
  start_date: string;
  tour_id: number;
  tour_title: string;
  departure_location: string;
  // Có thể có thêm các thuộc tính khác
}
