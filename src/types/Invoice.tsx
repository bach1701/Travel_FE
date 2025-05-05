export interface InvoiceDetails {
    payment_method: string;
    transaction_id: string;
    payment_date: string;
    tour_title: string;
    departure_date: string;
    num_adults: number;
    num_children_120_140: number;
    num_children_100_120: number;
  }
  
  export interface Invoice {
    invoice_id: number;
    booking_id: number;
    amount_due: string;
    date_issued: string;
    details: string; 
    user_id: number;
    departure_id: number;
    num_adults: number;
    num_children_120_140: number;
    num_children_100_120: number;
    start_date: string;
    tour_id: number;
    price_adult: string;
    price_child_120_140: string;
    price_child_100_120: string;
    tour_title: string;
    departure_location: string;
    seller_id: number;
    duration: string;
    user_name: string;
    user_email: string;
    user_phone: string;
    user_address: string;
    seller_name: string;
    seller_email: string;
    seller_phone: string;
    seller_address: string;
    seller_avatar_url: string;
  }
  
  export interface InvoiceResponse {
    invoice: Invoice;
  }
  