import TourCard from '@/components/TourCard';
import { Pagination, TourResponse } from '@/types/Pagination';
import { Tour } from '@/types/Tour';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const PopularTour = () => {
    const[tours, setTours] = useState<Tour[]>([]);
    const [pagination, setPagination] = useState<Pagination | null>(null);
    const[loading, setLoading] = useState(true);
    const baseURL = import.meta.env.VITE_API_URL;

    useEffect(() =>  {
        const fetchTour = async() => {
            try{
                const response = await axios.get<TourResponse>(`${baseURL}/public/tours/search`);
                const { tours, pagination } = response.data;
                setTours(tours.slice(0, 3));
                setPagination(pagination);
            }
            catch (err) {
                console.error('Lỗi khi lấy danh sách tour:', err);
            }
            finally {
                setLoading(false);
            }
        };

        fetchTour();
    }, []);

    return (
        <div className='my-24 px-4 md:px-24'>
            <div className='text-center'>
                <h2 className="font-bold text-black pb-4">Popular Tour</h2>
                <h4 className="text-black text-lg pb-8" style={{ fontSize: '24px'}}>Our Top 3 Most Popular Tours</h4>
            </div>
            {loading ? (
            <p>Đang tải...</p>
            ) : (
                <div className='flex flex-wrap justify-center gap-10 px-4'>
                    {tours.map((tour) => (
                        <div key={tour.tour_id} className='w-full sm:w-[calc(50%-16px)] lg:w-[calc(33.333%-16px)] xl:w-[350px]'>
                            <TourCard tour={tour} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PopularTour;