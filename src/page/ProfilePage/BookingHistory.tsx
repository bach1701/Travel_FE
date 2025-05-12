import { baseURL } from "@/config/api";
import { UserBooking } from "@/types/UserProfile/UserBooking";
import axios from "axios";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useUserProfile } from "@/hooks/useUserProfile";
import ModalWriteReview from "./ModalWriteReview";
import ReactModal from "react-modal";
import { FaCross } from "react-icons/fa";

const BookingHistory = () => {
  const [historyBooking, setHistoryBooking] = useState<UserBooking[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isOpenModalReview, setIsOpenModalReview] = useState<boolean>(false);
  const [bookingReviewSelected, setBookingReviewSelected] = useState<
    number | null
  >(null);
  const navigator = useNavigate();

  const headers = {
    Authorization: `Bearer ${localStorage.getItem("AccessToken")}`,
    "Content-Type": "application/json",
  };

  const handleSumOfTourists = (
    adults: number,
    children_120_140: number,
    children_100_120: number
  ): number => {
    return adults + children_120_140 + children_100_120;
  };

  const formatPrice = (price: number): string => {
    const formattedPrice = price.toLocaleString("vi-VN");
    return `${formattedPrice}`;
  };

  const handleNavigateToInvoice = (bookingID: number): void => {
    navigator(`/payment/success?payment_method=stripe&booking_id=${bookingID}`);
  };

  const handleWriteReview = (bookingID: number): void => {
    setBookingReviewSelected(bookingID); // Lưu booking_id khi nút được click
    setIsOpenModalReview(true); // Mở modal
  };

  const handleCloseModalReview = (): void => {
    setIsOpenModalReview(false);
    setBookingReviewSelected(null);
  };

  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return "";
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    const fetchUserBooking = async () => {
      try {
        const resBooking = await axios.get(
          `${baseURL}/user/bookings/confirmed`,
          { headers }
        );
        setHistoryBooking(resBooking.data.bookings);
        console.log(resBooking.data.bookings);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserBooking();
  }, []);
  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center w-full h-[300px]">
          <ClipLoader color="#FF6A00" size={50} speedMultiplier={0.8} />
        </div>
      ) : (
        <div className="bg-white px-10 py-6">
          <div>
            <h2 className="font-semibold mb-6">My Booking Tour</h2>
            <p className="mb-4 text-gray-500 text-[20px]">
              View and manager your past and upcoming tours
            </p>
          </div>
          <div className=" rounded-xl border border-gray-300 bg-white">
            {historyBooking?.length > 0 ? (
              <table className="w-full table-auto rounded-xl">
                <thead className="bg-gray-100 rounded-xl">
                  <tr>
                    <th className="px-4 py-2 text-left">Tiêu Đề Tour</th>
                    <th className="px-4 py-2 text-left">Ngày Đặt</th>
                    <th className="px-4 py-2 text-left">Khởi Hành</th>
                    <th className="px-4 py-2 text-left">Số Khách</th>
                    <th className="px-4 py-2 text-left">Giá</th>
                    <th className="px-4 py-2 text-left">Hành Động</th>
                  </tr>
                </thead>
                <tbody>
                  {historyBooking.map((booking) => (
                    <tr
                      key={booking?.booking_id}
                      className="border-b border-gray-200"
                    >
                      <td className="px-4 py-2">
                        {booking.tour_title || "Không có tiêu đề"}
                      </td>
                      <td className="px-4 py-2">
                        {formatDate(booking.booking_date)}
                      </td>
                      <td className="px-4 py-2">
                        17/01/2003
                        {/* {booking.departure_date
                          ? format(new Date(booking.departure_date), 'dd/MM/yyyy', { locale: vi })
                          : "Không có"} */}
                      </td>
                      <td className="px-4 py-2">
                        {handleSumOfTourists(
                          booking.num_adults,
                          booking.num_children_120_140,
                          booking.num_children_100_120
                        )}
                      </td>
                      <td className="px-4 py-2">
                        {formatPrice(Number(booking.total_price))}
                      </td>
                      <td className="px-4 py-2">
                        <button
                          onClick={() =>
                            handleNavigateToInvoice(booking.booking_id)
                          }
                          className="bg-primary hover:bg-orange-700 text-white font-bold py-2 px-4 rounded mr-2 text-sm"
                        >
                          Xem hóa đơn
                        </button>
                        <button
                          onClick={() => handleWriteReview(booking.booking_id)}
                          className="bg-blue-500 mt-2 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded text-sm"
                        >
                          Viết đánh giá
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-gray-500">
                Bạn chưa có lịch sử đặt phòng nào.
              </p>
            )}
          </div>
        </div>
      )}
      <ReactModal
        isOpen={isOpenModalReview}
        onRequestClose={handleCloseModalReview}
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-md shadow-xl p-6 max-w-sm"
        overlayClassName="fixed top-0 left-0 right-0 bottom-0 bg-gray-500 opacity-75 flex justify-center items-center" // Cập nhật overlayClassName
        ariaHideApp={false}
      >
        <h2 className="text-lg font-semibold mb-4">Viết đánh giá tour</h2>
        {bookingReviewSelected !== null && (
          <ModalWriteReview id={bookingReviewSelected.toString()} />
        )}
        <button
          onClick={handleCloseModalReview}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          <FaCross size={20} />
        </button>
      </ReactModal>
    </>
  );
};

export default BookingHistory;
