import { Tour } from "./Tour";

export interface Pagination {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
}

export interface TourResponse {
    tours: Tour[];
    pagination: Pagination;
}