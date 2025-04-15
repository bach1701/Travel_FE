import React, { useEffect, useState } from 'react';
import { Tour } from '@/types/Tour';
import axios from 'axios';
import TourCard from '../../components/TourCard';

const HomePage: React.FC = () => {
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const baseURL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await axios.get<Tour[]>(`${baseURL}/public/tours/search`);
        setTours(response.data);
      } catch (error) {
        console.error('Lỗi khi lấy danh sách tour:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, []);

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-4">Danh sách Tour</h1>
      {loading ? (
        <p>Đang tải...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tours.map((tour) => (
            <TourCard key={tour.tour_id} tour={tour} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
