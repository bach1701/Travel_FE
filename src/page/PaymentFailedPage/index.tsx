import { baseURL } from "@/config/api";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaCalendarAlt, FaClock, FaHome, FaPlaneDeparture, FaTimesCircle } from "react-icons/fa";
import { FaPerson } from "react-icons/fa6";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHotel } from '@fortawesome/free-solid-svg-icons';
import { Booking } from "@/types/Checkout";

const PaymentFailedPage = () => {

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const bookingID = searchParams.get('booking_id');
    const [dataPaymentFailed, setDataPaymentFailed] = useState<Booking | null>(null);

    const handleSumTourist = (num_adults: number, num_children_120_140: number, num_children_100_120: number ): number => {
        return num_adults + num_children_120_140 + num_children_100_120;
    }

    const handleNavHome =  (): void => {
        navigate('/');
    }

    const formatPrice = (price: number): string => {
        const formattedPrice = price.toLocaleString('vi-VN');
        return `${formattedPrice}`;
    };

      
    useEffect(()=> {

        const token  = localStorage.getItem('AccessToken')
        const headers = {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        };

        const fetchInvoice = async() => {
            try {
                const resPaymentFailed = await axios.get(`${baseURL}/user/bookings/${bookingID}`, { headers });
                setDataPaymentFailed(resPaymentFailed.data.booking);
                console.log(resPaymentFailed.data.booking);
            }
            catch (err) {
                console.log(err);
            }
        }
        fetchInvoice();

    }, [bookingID])

    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-4">
            <div className="text-center max-w-xl items-center">
                <div className="text-[42px] mt-6 mb-3 flex justify-center"><FaTimesCircle className="text-red-600"></FaTimesCircle></div>
                <h2 className="font-bold mb-6">Checkout Failed</h2>
                <p className="mb-2">Sorry, please check again.</p>

                {/* Button section */}
                <div className="flex justify-center gap-4 mt-6">
                <button onClick={handleNavHome} className="bg-primary text-white rounded-lg flex items-center px-4 py-2">
                    <FaHome className="mr-2" />
                    Back to Home
                </button>
                <button className="bg-primary text-white rounded-lg flex items-center px-4 py-2">
                    Back to Booking
                    <FontAwesomeIcon icon={faHotel} className="ml-2" />
                </button>
                </div>
            </div>

            {/* Booking Summary */}
            <div className="p-6 bg-white rounded-lg shadow-md w-full max-w-2xl my-12 border border-primary">
                <p className="text-[16px] uppercase font-semibold flex">ID: #BP{bookingID}</p>
                <h2 className="font-bold mb-6 text-center">Booking Summary</h2>
                <div className="border-t border-black mb-4"></div>
                <h4 className="text-lg font-semibold mb-2">{ dataPaymentFailed?.tour_title }</h4>
                <p className="flex items-center text-gray-700 mb-4">
                    <FaClock className="text-primary mr-2" /> 5N4Đ
                </p>
                <p className="flex items-center text-gray-700 mb-4">
                    <FaPlaneDeparture className="text-primary mr-2" /> { dataPaymentFailed?.departure_location }
                </p>
                <div className="border-t border-black mb-4"></div>
                <div className="grid grid-cols-2 gap-6 mb-4">
                    <div className="flex flex-col">
                        <p className="mb-1 ">Date</p>
                        <h5 className="flex items-center gap-2 font-semibold">
                            <FaCalendarAlt className="text-primary"/>
                            {dataPaymentFailed?.start_date ? new Date(dataPaymentFailed.start_date).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            }) : "Loading..."}
                        </h5>
                    </div>
                    <div className="flex flex-col">
                        <p className="mb-1 ">Tourist</p>
                        <h5 className="flex items-center gap-2 font-semibold">
                            <FaPerson className="text-primary"/>
                            { handleSumTourist(dataPaymentFailed?.num_adults || 0, dataPaymentFailed?.num_children_120_140 || 0, dataPaymentFailed?.num_children_100_120 || 0)} People
                        </h5>
                    </div>
                </div>

                <div className="border-t border-black my-6"></div>
                <div className="grid grid-cols-2">
                    <h5 className="font-semibold">Total</h5>
                    <h2 className="text-right font-semibold text-primary">{ formatPrice(Number(dataPaymentFailed?.total_price)) } <span className="text-[18px]">VNĐ</span></h2>
                </div>
                <div className="mt-2 flex justify-center">
                </div>
            </div>
        </div>
    );
};

export default PaymentFailedPage;


