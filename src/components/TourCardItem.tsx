import React, { useEffect } from "react";
import { Tour } from "@/types/Tour";
import { FaClock, FaPlaneDeparture } from "react-icons/fa";
import { Card, CardContent } from "./ui/CardItem";
import { Badge } from "./ui/BadgeItem";
import { useNavigate } from "react-router-dom";
import BookNowButton from "./ui/ButtonPrimary";

interface TourCardProps {
  tour: Tour;
}

const formatPrice = (price: number): string => {
  const formattedPrice = price.toLocaleString("vi-VN");
  return `${formattedPrice}`;
};

const TourCardItem: React.FC<TourCardProps> = ({ tour }) => {
  const navigate = useNavigate();
  const handleClickBookNow = () => {
    navigate(`/tour/detail-tour/${tour.tour_id}`);
  };

  useEffect(() => {
    console.log(tour);
  }, []);

  const coverImage = tour.images?.[0]?.image_url || "/placeholder.jpg";

  return (
    <Card className="w-full max-w-[350px] p-2 px-3 border-2 rounded-lg border-primary">
      <img
        src={coverImage}
        alt={tour.title}
        className="w-full h-48 object-cover rounded-lg"
      />
      <CardContent>
        <h2 className="font-semibold text-base mb-1.5 line-clamp-2 mt-3">
          {tour.title}
        </h2>
        <div className="flex items-center gap-2 my-3">
          <FaClock className="flex-shrink-0" style={{ color: "#FF6A00" }} />
          <span className="text-sm text-gray-600">
            Thời lượng: {tour.duration}
          </span>
        </div>

        <div className="flex items-center gap-2 my-3">
          <FaPlaneDeparture
            className="flex-shrink-0"
            style={{ color: "#FF6A00" }}
          />
          <span className="text-sm text-gray-600">
            Khởi hành: {tour.departure_location}
          </span>
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {tour.destination.length > 3 ? (
            <>
              {tour.destination.slice(0, 3).map((place, index) => (
                <Badge key={index} variant="secondary">
                  {place}
                </Badge>
              ))}
              <Badge variant="secondary">+{tour.destination.length - 3}</Badge>
            </>
          ) : (
            tour.destination.map((place, index) => (
              <Badge key={index} variant="secondary">
                {place}
              </Badge>
            ))
          )}
        </div>
        <div className="border-t-2 border-gray-300 mt-6 mb-3"></div>
        <div className="text-center mb-3">
          <h2 className="text-primary font-semibold ">
            {formatPrice(Number(tour.price_adult))}{" "}
            <span className="text-[26px]">VNĐ</span>
          </h2>
        </div>
        <div className="flex justify-center mb-2">
          <BookNowButton onClick={handleClickBookNow} />
        </div>
      </CardContent>
    </Card>
  );
};

export default TourCardItem;
