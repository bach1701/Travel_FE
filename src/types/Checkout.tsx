export interface OrderNote {
    smoking: boolean;
    vegetarian: boolean;
    high_floor: boolean;
    pregnant: boolean;
    disabled: boolean;
    invoice_need: boolean;
}

export interface Passenger {
    fullname: string;
    gender: string;
    birthday: string;
    ticket_type: "adult" | "child_120_140" | "child_100_120" | "baby"; 
  }

export interface ContactInfo {
    fullname: string;
    email: string;
    phone: string;
    address: string;
}

export interface BookingRequest {
    departure_id: number;
    num_adults: number;
    num_children_120_140: number;
    num_children_100_120: number;
    special_requests: string;
    promotion_id: number;
    contact_info: ContactInfo;
    passengers: Passenger[];
    order_notes: OrderNote;
}

export interface Booking {
    booking_id: number,
    departure_id: number,
    user_id: number,
    num_adults: number,
    num_children_120_140: number,
    num_children_100_120: number,
    total_price: string,
    booking_status: string,
    special_requests: string,
    booking_date: string,
    tour_title: string,
    departure_date: string,
    departure_location: string,
    start_date: string,
    
}
