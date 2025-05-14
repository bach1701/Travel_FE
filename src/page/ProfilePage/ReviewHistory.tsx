import StarRatings from "react-star-ratings";
import defaultImage from "../../assets/image/destination/halong.svg";
import { FaEdit, FaPlaneDeparture, FaTrash } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseURL } from "@/config/api";
import { TourDetails, UserReview } from "@/types/UserReview";

const ReviewHistory = () => {
  const [userReviews, setUserReviews] = useState<UserReview[] | null>(null);
  const [tourImages, setTourImages] = useState<{ [tourId: number]: string }>(
    {}
  );

  useEffect(() => {
    const fetchUserReview = async () => {
      const accessToken = localStorage.getItem("AccessToken");
      try {
        const resUserReview = await axios.get(`${baseURL}/user/reviews`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        setUserReviews(resUserReview.data.reviews);
      } catch (err: any) {
        console.log(err);
      }
    };

    fetchUserReview();
  }, []);
  useEffect(() => {
    const fetchTourImage = async (tourId: number) => {
      try {
        const resTourDetails = await axios.get(
          `${baseURL}/public/tours/${tourId}`
        );
        const tourDetail: TourDetails = resTourDetails.data.images[0];
        setTourImages((prevImages) => ({
          ...prevImages,
          [tourId]: tourDetail.image_url || defaultImage,
        }));
      } catch (error) {
        console.error(`Failed to fetch details for tour ID ${tourId}:`, error);
        setTourImages((prevImages) => ({
          ...prevImages,
          [tourId]: defaultImage,
        }));
      }
    };

    if (userReviews) {
      userReviews.forEach((review) => {
        if (!tourImages[review.tour_id]) {
          fetchTourImage(review.tour_id);
        }
      });
    }
  }, [userReviews]);

  return (
    <>
      <div className="bg-white py-6 px-8 rounded-md shadow-md">
        <h2 className="text-xl font-semibold mb-4">My Review</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userReviews?.map((userReview, index) => (
            <div
              key={index}
              className="border border-gray-300 overflow-hidden rounded-lg shadow-sm"
            >
              <img
                className="w-full h-60 object-cover"
                src={tourImages[userReview.tour_id] || defaultImage}
                alt={userReview.tour_title}
              />
              <div className="p-4">
                <div className="relative h-12 mb-2">
                  <h3 className="font-semibold text-base mb-1.5 mt-3 line-clamp-2 tour-title">
                    {userReview.tour_title}
                  </h3>
                </div>
                <p className="mb-2 flex items-center text-sm text-gray-600">
                  <FaPlaneDeparture className="text-primary mr-2" />
                  {userReview.departure_date}
                </p>
                <div className="border border-gray-300 mx-4 mb-4" />
                <div className="flex items-center mb-2">
                  <StarRatings
                    rating={Number(userReview.average_rating)}
                    starRatedColor="#FF6A00"
                    numberOfStars={5}
                    starDimension="20px"
                    starSpacing="2px"
                  />
                  <p className="ml-3 mt-1 mb-0 text-sm text-gray-600">
                    at {userReview.timestamp}
                  </p>
                </div>
                <p className="my-3 text-gray-700 text-[16px]">
                  {userReview.comment}
                </p>
              </div>
              <div className="border-t border-gray-300 flex justify-end font-semibold text-sm">
                <button className="flex items-center text-blue-500 hover:text-blue-700 py-3 px-4">
                  <FaEdit className="mr-2" />
                  Edit
                </button>
                <button className="flex items-center text-red-600 hover:text-red-700 py-3 px-4">
                  <FaTrash className="mr-2" />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ReviewHistory;
