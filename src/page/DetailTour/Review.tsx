import { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight, FaHeart } from "react-icons/fa";
import StarRatings from "react-star-ratings";
import { ReviewResponse } from "../TourPage/ReviewType";
import axios from "axios";
import { baseURL } from "@/config/api";
import { useUserProfile } from "@/hooks/useUserProfile";
import { ReviewRequest } from "@/types/ReviewRequest";
import ModelNotification from "@/components/ModelNotification";

const Review = ({ id }: { id: string }) => {
  const { user } = useUserProfile();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSuccess, setIsSuccess] = useState<Boolean | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [reviewTour, setReviewTour] = useState<ReviewResponse | null>(null);
  const [dataReviewRequest, setDataReviewRequest] = useState<ReviewRequest>({
    tour_id: parseInt(id),
    departure_id: "",
    comment: "",
    ratings: {
      Foods: 0,
      Guides: 0,
      Hotels: 0,
      Safety: 0,
      Quality: 0,
      Services: 0,
    },
  });

  const ratingCategories = [
    { key: "Services", label: "Service" },
    { key: "Guides", label: "Guides" },
    { key: "Quality", label: "Quality" },
    { key: "Safety", label: "Safety" },
    { key: "Foods", label: "Food" },
    { key: "Hotels", label: "Hotel" },
  ];

  const convertToIntegerAndRound = (str: string | undefined) => {
    if (str === undefined) {
      throw new Error("Invalid input: input is undefined");
    }

    const number = parseFloat(str);
    if (isNaN(number)) {
      throw new Error("Invalid input: not a number");
    }

    return Math.round(number * 100) / 100;
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => {
      const total = reviewTour?.reviews?.length || 0;
      return prev > 0 ? prev - 1 : total - 1;
    });
  };

  const handleNext = () => {
    setCurrentIndex((prev) => {
      const total = reviewTour?.reviews?.length || 0;
      return prev < total - 1 ? prev + 1 : 0;
    });
  };

  const handleRatingChange = (category: string, newRating: number) => {
    setDataReviewRequest((prev) => ({
      ...prev,
      ratings: {
        ...prev.ratings,
        [category]: newRating,
      },
    }));
  };

  const handleCloseNotification = () => {
    setIsSuccess(null);
    setErrorMessage(null);
  };

  const handleCreateReview = async () => {
    const accessToken = localStorage.getItem("AccessToken");
    if (!accessToken) {
      setIsSuccess(false);
      setErrorMessage("Please login to create a review");
      return;
    }

    if (!dataReviewRequest.comment) {
      setIsSuccess(false);
      setErrorMessage("Please enter your comment");
      return;
    }

    try {
      await axios.post(`${baseURL}/user/reviews/simple`, dataReviewRequest, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      console.log("Review data:", dataReviewRequest);
      alert("Review submitted successfully!");
      const resReviewTour = await axios.get(
        `${baseURL}/public/reviews/tours/${id}`
      );
      setReviewTour(resReviewTour.data);
      setDataReviewRequest({
        tour_id: parseInt(id),
        comment: "",
        departure_id: "",
        ratings: {
          Foods: 0,
          Guides: 0,
          Hotels: 0,
          Safety: 0,
          Quality: 0,
          Services: 0,
        },
      });
      setSuccessMessage("Review submitted successfully!");
      setIsSuccess(true);
    } catch (err) {
      setIsSuccess(false);
      setErrorMessage("Failed to submit review. Please try again later.");
      console.error("Error submitting review:", err);
    }
  };

  useEffect(() => {
    const fetchDetailTour = async () => {
      try {
        const resReviewTour = await axios.get(
          `${baseURL}/public/reviews/tours/${id}`
        );
        setReviewTour(resReviewTour.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchDetailTour();
  }, [id]);

  return (
    <div className="mt-8">
      <div className="flex items-center gap-2 text-lg mb-8 font-semibold text-primary">
        <FaHeart style={{ color: "#FF6A00" }} />
        <h3 style={{ fontSize: "24px" }}>Review</h3>
      </div>
      <div>
        <div className="w-full ">
          <div className="flex flex-row flex-wrap px-4 gap-6 bg-white border border-primary py-6 rounded-lg p-4">
            <div className="flex flex-col justify-center items-center px-4">
              <h2 className="text-2xl font-semibold">
                {reviewTour?.averageRating?.overall_rating
                  ? `${convertToIntegerAndRound(reviewTour.averageRating.overall_rating)} / 5`
                  : "Chưa có đánh giá"}
              </h2>
              <StarRatings
                rating={
                  reviewTour?.averageRating?.overall_rating
                    ? convertToIntegerAndRound(
                        reviewTour?.averageRating.overall_rating
                      )
                    : 0
                }
                starRatedColor="#FF6A00"
                numberOfStars={5}
                name="rating"
                starDimension="30px"
                starSpacing="5px"
              />
              <h5 className="text-sm text-gray-500 mt-2">
                {reviewTour?.averageRating.review_count} Reviews
              </h5>
            </div>
            <div className="flex flex-col justify-center gap-4 flex-1">
              <div className="flex items-center gap-4">
                <StarRatings
                  rating={
                    reviewTour?.averageRating?.foods_rating
                      ? convertToIntegerAndRound(
                          reviewTour?.averageRating.foods_rating
                        )
                      : 0
                  }
                  starRatedColor="#FF6A00"
                  numberOfStars={5}
                  name="rating"
                  starDimension="24px"
                  starSpacing="4px"
                />
                <p className="text-base">Food</p>
              </div>
              <div className="flex items-center gap-4">
                <StarRatings
                  rating={
                    reviewTour?.averageRating?.guides_rating
                      ? convertToIntegerAndRound(
                          reviewTour?.averageRating.guides_rating
                        )
                      : 0
                  }
                  starRatedColor="#FF6A00"
                  numberOfStars={5}
                  name="rating"
                  starDimension="24px"
                  starSpacing="4px"
                />
                <p className="text-base">Guide</p>
              </div>
              <div className="flex items-center gap-4">
                <StarRatings
                  rating={
                    reviewTour?.averageRating?.hotels_rating
                      ? convertToIntegerAndRound(
                          reviewTour?.averageRating.hotels_rating
                        )
                      : 0
                  }
                  starRatedColor="#FF6A00"
                  numberOfStars={5}
                  name="rating"
                  starDimension="24px"
                  starSpacing="4px"
                />
                <p className="text-base">Hotel</p>
              </div>
              <div className="flex items-center gap-4">
                <StarRatings
                  rating={
                    reviewTour?.averageRating?.quality_rating
                      ? convertToIntegerAndRound(
                          reviewTour?.averageRating.quality_rating
                        )
                      : 0
                  }
                  starRatedColor="#FF6A00"
                  numberOfStars={5}
                  name="rating"
                  starDimension="24px"
                  starSpacing="4px"
                />
                <p className="text-base">Quality</p>
              </div>
              <div className="flex items-center gap-4">
                <StarRatings
                  rating={
                    reviewTour?.averageRating?.safety_rating
                      ? convertToIntegerAndRound(
                          reviewTour?.averageRating.safety_rating
                        )
                      : 0
                  }
                  starRatedColor="#FF6A00"
                  numberOfStars={5}
                  name="rating"
                  starDimension="24px"
                  starSpacing="4px"
                />
                <p className="text-base">Safety</p>
              </div>
              <div className="flex items-center gap-4">
                <StarRatings
                  rating={
                    reviewTour?.averageRating?.services_rating
                      ? convertToIntegerAndRound(
                          reviewTour?.averageRating.services_rating
                        )
                      : 0
                  }
                  starRatedColor="#FF6A00"
                  numberOfStars={5}
                  name="rating"
                  starDimension="24px"
                  starSpacing="4px"
                />
                <p className="text-base">Service</p>
              </div>
            </div>
          </div>
        </div>

        {Array.isArray(reviewTour?.reviews) &&
          reviewTour.reviews.length > 0 && (
            <div className="mt-12 flex-1 text-center bg-white border border-primary rounded-2xl px-24 py-16 shadow-lg relative">
              <h3 className="font-bold pb-4" style={{ fontSize: "30px" }}>
                Customer review
              </h3>
              <div className="pb-4">
                <StarRatings
                  rating={convertToIntegerAndRound(
                    reviewTour?.reviews[currentIndex].average_rating
                  )}
                  starRatedColor="#FF6A00"
                  numberOfStars={5}
                  name="rating"
                  starDimension="30px"
                  starSpacing="5px"
                />
              </div>
              <p className="pb-4 text-left" style={{ fontSize: "20px" }}>
                {reviewTour?.reviews[currentIndex].comment}
              </p>

              <div className="flex items-center justify-center mt-4">
                <img
                  src={
                    reviewTour?.reviews[currentIndex].user_avatar ||
                    "/default-avatar.png"
                  }
                  alt="userReview Avatar"
                  className="w-12 h-12 rounded-full border border-gray-300 p-1"
                />
                <div className="w-4" />
                <div className="mr-4 text-left">
                  <h5>{reviewTour?.reviews[currentIndex].user_name}</h5>
                  <p>Traveler</p>
                </div>
              </div>

              <div className="absolute bottom-4 right-4 flex space-x-2">
                <button
                  onClick={handlePrev}
                  className="p-2 border border-gray-400 bg-white rounded-full hover:bg-primary flex items-center justify-center"
                >
                  <FaArrowLeft
                    className="text-gray-400 hover:text-white"
                    style={{ fontSize: "25px" }}
                  />
                </button>
                <button
                  onClick={handleNext}
                  className="p-2 border border-gray-400 bg-white rounded-full hover:bg-primary flex items-center justify-center"
                >
                  <FaArrowRight
                    className="text-gray-400 hover:text-white"
                    style={{ fontSize: "25px" }}
                  />
                </button>
              </div>
            </div>
          )}

        <div className="p-8 mt-12 rounded-lg border  border-primary bg-white">
          <h3 className="font-semibold">Write a review</h3>
          <div className="mt-6 mb-10 grid grid-cols-3 gap-4 flex-1 justify-items-center">
            {ratingCategories.map((category) => (
              <div key={category.key} className="flex items-center gap-4">
                <p className="text-base min-w-[100px] text-right">
                  {category.label}
                </p>
                <StarRatings
                  changeRating={(newRating) =>
                    handleRatingChange(category.key, newRating)
                  }
                  rating={
                    dataReviewRequest.ratings[
                      category.key as keyof typeof dataReviewRequest.ratings
                    ]
                  }
                  starRatedColor="#FF6A00"
                  numberOfStars={5}
                  name={`rating-${category.key}`}
                  starDimension="24px"
                  starSpacing="4px"
                />
              </div>
            ))}
          </div>
          <h5>Write a feedback</h5>
          {user ? (
            <div className="mt-6 items-center">
              <div className="flex w-full gap-4 mb-4">
                <input
                  className="flex-1 border border-gray-400 rounded-sm p-2 w-full"
                  type="text"
                  placeholder="Your name"
                  value={user.name}
                />
                <input
                  className="flex-1 border border-gray-400 rounded-sm p-2 w-full"
                  type="text"
                  placeholder="Your phone number"
                  value={user.phone_number}
                />
              </div>
              <input
                className="border border-gray-400 rounded-sm p-2 w-full mb-4"
                type="email"
                placeholder="Your email"
                value={user.email}
              />
              <textarea
                value={dataReviewRequest.comment}
                onChange={(e) =>
                  setDataReviewRequest({
                    ...dataReviewRequest,
                    comment: e.target.value,
                  })
                }
                className="border border-gray-400 rounded-sm p-2 w-full mb-4"
                placeholder="Your comment..."
                rows={8}
              />
              <div className="flex justify-center w-full">
                <button
                  onClick={handleCreateReview}
                  className="bg-primary hover:bg-orange-600 text-white text-[20px] rounded-xl font-bold uppercase p-4 px-8 items-center"
                >
                  Send review
                </button>
              </div>
            </div>
          ) : (
            <div className="mt-6 items-center">
              <div className="flex w-full gap-4 mb-4">
                <input
                  className="flex-1 border border-gray-400 rounded-sm p-2 w-full"
                  type="text"
                  placeholder="Your name"
                />
                <input
                  className="flex-1 border border-gray-400 rounded-sm p-2 w-full"
                  type="text"
                  placeholder="Your phone number"
                />
              </div>
              <input
                className="border border-gray-400 rounded-sm p-2 w-full mb-4"
                type="email"
                placeholder="Your email"
              />
              <textarea
                value={dataReviewRequest.comment}
                onChange={(e) =>
                  setDataReviewRequest({
                    ...dataReviewRequest,
                    comment: e.target.value,
                  })
                }
                className="border border-gray-400 rounded-sm p-2 w-full mb-4"
                placeholder="Your comment..."
                rows={8}
              />
              <div className="flex justify-center w-full">
                <button
                  onClick={handleCreateReview}
                  className="bg-primary text-[20px] rounded-xl hover:bg-orange-600 text-white rounded- font-bold uppercase p-4 px-8 items-center"
                >
                  Send review
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      {isSuccess === true && (
        <ModelNotification
          type="success"
          message="Thành công!"
          description={successMessage || "Thực hiện thao tác thành công!"}
          onClose={handleCloseNotification}
        />
      )}

      {isSuccess === false && errorMessage && (
        <ModelNotification
          type="error"
          message="Thất bại!"
          description={errorMessage}
          onClose={handleCloseNotification}
        />
      )}
    </div>
  );
};

export default Review;
