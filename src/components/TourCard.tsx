import React from 'react';
import { Tour } from '@/types/Tour';
import { FaClock } from 'react-icons/fa';
import { FaPlane } from 'react-icons/fa6';
import { FaPaperPlane } from 'react-icons/fa';
import { Card, CardContent } from './ui/Card';
import { Badge } from './ui/Badge';

interface TourCardProps {
  tour: Tour;
}

const TourCard: React.FC<TourCardProps> = ({ tour }) => {
  const coverImage = tour.images?.[0]?.image_url || '/placeholder.jpg';

  return (
    <Card className='w-full cursor-pointer max-w-[350px] p-2 px-3 border-2 rounded-lg border-primary'>
      <img 
      src={coverImage}
      alt={tour.title}
      className='w-full h-48 object-cover rounded-lg'
      />
      <CardContent>
        <h2 className='font-semibold text-base mb-1.5 line-clamp-2 mt-3'>{tour.title}</h2>
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
      <div className='border-t-2 border-gray-300 my-6'></div>
      <div className='flex justify-center mb-2'>
        <button className='bg-orange-500 uppercase font-bold text-white py-2 px-4 rounded-lg w-full flex items-center justify-center'>
          Book now
          <FaPaperPlane className='ml-2' /> 
        </button>
      </div>
      </CardContent>
    </Card>
  );
};

export default TourCard;