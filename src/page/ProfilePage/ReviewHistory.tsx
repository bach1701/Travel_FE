import StarRatings from "react-star-ratings";
import defaultImage from "../../assets/image/destination/halong.svg";
import { FaEdit, FaEye, FaPlaneDeparture, FaTrash } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseURL } from "@/config/api";
import { TourDetails, UserReview } from "@/types/UserReview";
import ReactModal from "react-modal";
import { IoMdClose } from "react-icons/io";
import ModalWriteReview from "./ModalWriteReview";
import ModelNotification from "@/components/ModelNotification";
import { ClipLoader } from "react-spinners";

const ReviewHistory = () => {
  const [userReviews, setUserReviews] = useState<UserReview[] | null>(null);
  const [isOpenModalReview, setIsOpenModalReview] = useState<boolean>(false);
  const [tourImages, setTourImages] = useState<{ [tourId: number]: string }>(
    {}
  );
  const [tourSellerName, setTourSellerName] = useState<{
    [tourId: number]: string;
  }>({});
  const [bookingReviewSelected, setBookingReviewSelected] = useState<
    [number, number, number] | null
  >(null);
  const [isSuccess, setIsSuccess] = useState<Boolean | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchUserReview = async () => {
    const accessToken = localStorage.getItem("AccessToken");
    try {
      const resUserReview = await axios.get(`${baseURL}/user/reviews`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setUserReviews(resUserReview.data.reviews);
    } catch (err: any) {
      console.log(err);
      setErrorMessage("Không thể tải lại danh sách đánh giá.");
      setIsSuccess(false);
    }
  };

  useEffect(() => {
    fetchUserReview();
  }, []);

  useEffect(() => {
    const fetchTourImage = async (tourId: number) => {
      try {
        const resTourDetails = await axios.get(
          `${baseURL}/public/tours/${tourId}`
        );
        const tourData = resTourDetails.data;
        const tourDetail: TourDetails = {
          tour_id: tourData.id,
          image_url: tourData.images && tourData.images[0]?.image_url,
          seller_name: tourData.seller?.name,
        };

        setTourImages((prevImages) => ({
          ...prevImages,
          [tourId]: tourDetail.image_url || defaultImage,
        }));
        setTourSellerName((prevSeller) => ({
          ...prevSeller,
          [tourId]: tourDetail.seller_name || "Viet Travel",
        }));
      } catch (error) {
        console.error(`Failed to fetch details for tour ID ${tourId}:`, error);
        setTourImages((prevImages) => ({
          ...prevImages,
          [tourId]: defaultImage,
        }));
      } finally {
        setIsLoading(false);
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

  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return "";
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleCloseModalReview = (shouldRefetch: boolean = false): void => {
    setIsOpenModalReview(false);
    setBookingReviewSelected(null);
    if (shouldRefetch) {
      fetchUserReview();
    }
  };

  const handleDeleteReview = async (reviewId: number): Promise<void> => {
    try {
      const accessToken = localStorage.getItem("AccessToken");
      const resDelete = await axios.delete(
        `${baseURL}/user/reviews/${reviewId}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      console.log("Review deleted:", resDelete.data);
      await fetchUserReview();
      setSuccessMessage("Đánh giá đã được xóa thành công.");
      setIsSuccess(true);
    } catch (err: any) {
      console.log("Error deleting review:", err);
      setErrorMessage("Không thể xóa đánh giá. Vui lòng thử lại sau.");
      setIsSuccess(false);
    }
  };

  const handleEditReview = (
    reviewID: number,
    tour_id: number,
    departure_id: number
  ): void => {
    setBookingReviewSelected([tour_id, departure_id, reviewID]);
    setIsOpenModalReview(true);
  };

  const handleCloseNotification = () => {
    setIsSuccess(null);
    setErrorMessage(null);
  };

  const customModalClasses = {
    overlay:
      "fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center",
    content:
      "relative mx-auto bg-white p-6 rounded-lg shadow-lg outline-none w-11/12 max-w-3xl max-h-[90vh] overflow-auto",
  };

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center w-full h-[300px]">
          <ClipLoader color="#FF6A00" size={50} speedMultiplier={0.8} />
        </div>
      ) : (
        <>
          <div className="bg-white py-6 px-8 rounded-md shadow-md">
            <h2 className="text-xl font-semibold mb-4">My Review</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
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
                      {formatDate(userReview.departure_date)}
                    </p>
                    <p>by {tourSellerName[userReview.tour_id]}</p>
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
                        at {formatDate(userReview.timestamp)}
                      </p>
                    </div>
                    <p className="h-[56px] relative my-3 text-gray-700 text-[16px] line-clamp-3">
                      {userReview.comment}
                    </p>
                  </div>
                  <div className="border-t border-gray-300 flex justify-end font-semibold text-sm">
                    <button className="flex items-center text-primary hover:text-orange-700 py-3 px-4">
                      <FaEye className="mr-2" />
                      Detail
                    </button>
                    <button
                      onClick={() =>
                        handleEditReview(
                          userReview.review_id,
                          userReview.tour_id,
                          userReview.departure_id
                        )
                      }
                      className="flex items-center text-blue-500 hover:text-blue-700 py-3 px-4"
                    >
                      <FaEdit className="mr-2" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteReview(userReview.review_id)}
                      className="flex items-center text-red-600 hover:text-red-700 py-3 px-4"
                    >
                      <FaTrash className="mr-2" />
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <ReactModal
            isOpen={isOpenModalReview}
            onRequestClose={() => handleCloseModalReview(false)}
            className={customModalClasses.content}
            overlayClassName={customModalClasses.overlay}
            ariaHideApp={false}
            contentLabel="Modal Write Review"
          >
            <div className="relative">
              <button
                onClick={() => handleCloseModalReview(false)}
                className="absolute top-0 right-0 text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <IoMdClose size={36} />
              </button>
              <div className="mt-4">
                {bookingReviewSelected !== null && (
                  <ModalWriteReview
                    tour_id={bookingReviewSelected[0].toString()}
                    departure_id={bookingReviewSelected[1].toString()}
                    review_id={bookingReviewSelected[2].toString()}
                    onReviewSubmitted={() => handleCloseModalReview(true)}
                  />
                )}
              </div>
            </div>
          </ReactModal>
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
        </>
      )}
    </>
  );
};

export default ReviewHistory;
