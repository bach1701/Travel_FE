import React from 'react';
import { Tour } from '@/types/Tour';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';

interface TourCardProps {
  tour: Tour;
}

const TourCard: React.FC<TourCardProps> = ({ tour }) => {
  const coverImage = tour.images?.[0]?.image_url || '/placeholder.jpg';

  return (
    <Card className="rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition">
      <img src={coverImage} alt={tour.title} className="w-full h-56 object-cover" />
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold mb-1">{tour.title}</h3>
        <p className="text-sm text-muted-foreground">{tour.duration}</p>
        <p className="text-sm mt-1">Khởi hành: {tour.departure_location}</p>
        <div className="mt-2 flex flex-wrap gap-1">
          {tour.destination.map((place, index) => (
            <Badge key={index} variant="secondary">{place}</Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TourCard;
