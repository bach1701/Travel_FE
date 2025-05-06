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
