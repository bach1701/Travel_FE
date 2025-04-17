import React from 'react';
import { Tour } from '@/types/Tour';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { FaClock } from 'react-icons/fa';
import { FaPlane } from 'react-icons/fa6';

interface TourCardProps {
  tour: Tour;
}

const TourCard: React.FC<TourCardProps> = ({ tour }) => {
  const coverImage = tour.images?.[0]?.image_url || '/placeholder.jpg';

  return (
    <Card className='w-full cursor-pointer max-w-[400px]'>
      <img 
      src={coverImage}
      alt={tour.title}
      className='w-full h-48 object-cover'
      />
      <CardContent>
        <h3 className='font-semibold text-base mb-1.5 line-clamp-2'>{tour.title}</h3>
        <div className='flex items-center gap-2 my-3'>
          <FaClock className='flex-shrink-0' style={{ color: '#FF6A00' }}/>
          <span className='text-sm text-gray-600'>Thời lượng: {tour.duration}</span>
        </div>

        <div className='flex items-center gap-2 my-3'>
          <FaPlane className='flex-shrink-0' style={{ color: '#FF6A00' }}/>
          <span className='text-sm text-gray-600'>
            Khởi hành: {tour.departure_location}
          </span>
        </div>
        <div className='mt-2 flex flex-wrap gap-2'>
          {tour.destination.map((place, index) => (
            <Badge key={index} variant='secondary'>
                {place}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TourCard;