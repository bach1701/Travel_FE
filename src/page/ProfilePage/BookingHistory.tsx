import { baseURL } from "@/config/api";
import { UserBooking } from "@/types/UserProfile/UserBooking";
import axios from "axios";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import ModalWriteReview from "./ModalWriteReview";
import ReactModal from "react-modal";
import { IoMdClose } from "react-icons/io";
import { Pagination } from "antd";
import "antd/dist/reset.css";

const BookingHistory = () => {
  const [historyBooking, setHistoryBooking] = useState<UserBooking[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isOpenModalReview, setIsOpenModalReview] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(6);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [totalItem, setTotalItem] = useState<number>(0);
  const [bookingReviewSelected, setBookingReviewSelected] = useState<
    [number, number] | null
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

  const handleWriteReview = (tour_id: number, departure_id: number): void => {
    setBookingReviewSelected([tour_id, departure_id]);
    setIsOpenModalReview(true);
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
          {
            headers,
            params: {
              page: currentPage,
              limit: pageSize,
            },
          }
        );

        setHistoryBooking(resBooking.data.bookings);
        setTotalItem(resBooking.data.pagination.totalItems);
        setTotalPage(resBooking.data.pagination.totalPages);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserBooking();
  }, [currentPage, pageSize]);

  const customModalClasses = {
    overlay:
      "fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center",
    content:
      "relative mx-auto bg-white p-6 rounded-lg shadow-lg outline-none w-11/12 max-w-3xl max-h-[90vh] overflow-auto",
  };

  const handlePageChange = (page: number): void => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (value: number): void => {
    setPageSize(value);
    setCurrentPage(1);
  };

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
                    <th className="px-4 py-2 text-left">Booking ID</th>
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
                        #B&P_{booking.booking_id || "Không có tiêu đề"}
                      </td>
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
                          disabled={booking.booking_date < booking.start_date}
                          onClick={() =>
                            handleWriteReview(
                              booking.tour_id,
                              booking.departure_id
                            )
                          }
                          className={`
                            mt-2 font-bold py-2 px-4 rounded text-sm
                            ${
                              booking.booking_date < booking.start_date
                                ? "bg-gray-300 text-gray-500 cursor-not-allowed opacity-50"
                                : "bg-blue-500 hover:bg-blue-600 text-white"
                            }
                          `}
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
          <div className="mt-6 flex justify-center">
            {totalPage >= 1 && (
              <Pagination
                current={currentPage}
                total={totalItem}
                pageSize={pageSize}
                onChange={handlePageChange}
                pageSizeOptions={["6", "9", "12"]}
                showSizeChanger
                onShowSizeChange={(_item, size) => handlePageSizeChange(size)}
                itemRender={(_page, type, originalElement) => {
                  if (type === "prev") {
                    return <a>Previous</a>;
                  }
                  if (type === "next") {
                    return <a>Next</a>;
                  }
                  return originalElement;
                }}
              />
            )}
          </div>
        </div>
      )}
      <ReactModal
        isOpen={isOpenModalReview}
        onRequestClose={handleCloseModalReview}
        className={customModalClasses.content}
        overlayClassName={customModalClasses.overlay}
        ariaHideApp={false}
        contentLabel="Modal Write Review"
      >
        <div className="relative">
          <button
            onClick={handleCloseModalReview}
            className="absolute top-0 right-0 text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <IoMdClose size={36} />
          </button>
          <div className="mt-4">
            {bookingReviewSelected !== null && (
              <ModalWriteReview
                tour_id={bookingReviewSelected[0].toString()}
                departure_id={bookingReviewSelected[1].toString()}
                review_id="none"
                onReviewSubmitted={handleCloseModalReview}
              />
            )}
          </div>
        </div>
      </ReactModal>
    </>
  );
};

export default BookingHistory;
