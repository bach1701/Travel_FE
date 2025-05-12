import { baseURL } from "@/config/api";
import { useUserProfile } from "@/hooks/useUserProfile";
import { ReviewRequest } from "@/types/ReviewRequest";
import axios from "axios";
import { useState } from "react";
import StarRatings from "react-star-ratings";
import { ReviewResponse } from "../TourPage/ReviewType";
import ModelNotification from "@/components/ModelNotification";

const ModalWriteReview = ({ id }: { id: string }) => {
  const { user } = useUserProfile();
  const [isSuccess, setIsSuccess] = useState<Boolean | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [, setReviewTour] = useState<ReviewResponse | null>(null);

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

  const handleCloseNotification = () => {
    setIsSuccess(null);
    setErrorMessage(null);
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

  return (
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

export default ModalWriteReview;
