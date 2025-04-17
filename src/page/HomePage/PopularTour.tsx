import TourCard from '@/components/TourCard';
import { Tour } from '@/types/Tour';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const PopularTour = () => {
    const[tours, setTours] = useState<Tour[]>([]);
    const[loading, setLoading] = useState(true);
    const baseURL = import.meta.env.VITE_API_URL;

    useEffect(() =>  {
        const fetchTour = async() => {
            try{
                const response = await axios.get<Tour[]>(`${baseURL}/public/tours/search`);
                setTours(response.data);
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
        <div className='my-16 px-4 md:px-20'>
            <div className='text-center mb-10'>
                <h2 className="font-bold text-gray-800 mb-4">Popular Tour</h2>
                <p className="text-gray-600 text-lg">Top 6 tour phổ biến nhất của chúng tôi</p>
            </div>
            {loading ? (
            <p>Đang tải...</p>
            ) : (
                <div className='flex flex-wrap justify-center gap-6 px-4'>
                    {tours.map((tour) => (
                        <div key={tour.tour_id} className='w-full sm:w-[calc(50%-16px)] lg:w-[calc(33.333%-16px)] xl:w-[400px]'>
                            <TourCard tour={tour} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PopularTour;