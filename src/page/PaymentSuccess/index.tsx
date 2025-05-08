import { baseURL } from "@/config/api";
import { Invoice, InvoiceDetails } from "@/types/Invoice";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import {
  FaCalendarAlt,
  FaCheckCircle,
  FaClock,
  FaDownload,
  FaHome,
  FaList,
  FaPlaneDeparture,
} from "react-icons/fa";
import { FaPerson } from "react-icons/fa6";
import { useNavigate, useSearchParams } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const PaymentSuccessPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const bookingID = searchParams.get("booking_id");
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [detailPayment, setDetailPayment] = useState<InvoiceDetails | null>(
    null
  );
  const pdfRef = useRef<HTMLDivElement>(null);

  const handleSumTourist = (
    num_adults: number,
    num_children_120_140: number,
    num_children_100_120: number
  ): number => {
    return num_adults + num_children_120_140 + num_children_100_120;
  };

  const handleNavHome = (): void => {
    navigate("/");
  };

  const formatPrice = (price: number): string => {
    const formattedPrice = price.toLocaleString("vi-VN");
    return `${formattedPrice}`;
  };

  const formattedDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
  };

  const handleDownloadInvoice = async () => {
    if (!pdfRef.current) return;

    const input = pdfRef.current;
    const canvas = await html2canvas(input, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const imgWidth = 210;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
    pdf.save(`invoice_${invoice?.user_name}_${invoice?.tour_title}.pdf`);
  };

  useEffect(() => {
    const token = localStorage.getItem("AccessToken");
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const fetchInvoice = async () => {
      try {
        const resInvoice = await axios.get(
          `${baseURL}/user/invoices/booking/${bookingID}`,
          { headers }
        );
        const parseDetails: InvoiceDetails = JSON.parse(
          resInvoice.data.invoice.details
        );
        setInvoice(resInvoice.data.invoice);
        setDetailPayment(parseDetails);
      } catch (err) {
        console.log(err);
      }
    };

    fetchInvoice();
  }, [bookingID]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="text-center max-w-xl items-center">
        <div className="text-[42px] mt-6 mb-3 flex justify-center">
          <FaCheckCircle className="text-green-600"></FaCheckCircle>
        </div>
        <h2 className="font-bold mb-6">Checkout Confirmed</h2>
        <p className="mb-2">We’ve sent all the details to your email.</p>
        <p>You can also view your booking in your account.</p>

        {/* Button section */}
        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={handleNavHome}
            className="bg-primary text-white rounded-lg flex items-center px-4 py-2"
          >
            <FaHome className="mr-2" />
            Back to Home
          </button>
          <button className="bg-primary text-white rounded-lg flex items-center px-4 py-2">
            View History
            <FaList className="ml-2" />
          </button>
        </div>
      </div>

      {/* Booking Summary */}
      <div
        ref={pdfRef}
        className="p-6 bg-white rounded-lg shadow-md w-full max-w-2xl my-12 border border-primary"
      >
        <p className="text-[16px] uppercase font-semibold flex">
          ID: #BP{bookingID}
        </p>
        <h2 className="font-bold mb-6 text-center">Booking Summary</h2>
        <p className="mb-4">
          By <em className="font-semibold">{invoice?.seller_name}</em>
        </p>
        <div className="border-t border-black mb-4"></div>
        <h4 className="text-lg font-semibold mb-2">{invoice?.tour_title}</h4>
        <p className="flex items-center text-gray-700 mb-4">
          <FaClock className="text-primary mr-2" /> {invoice?.duration}
        </p>
        <p className="flex items-center text-gray-700 mb-4">
          <FaPlaneDeparture className="text-primary mr-2" />{" "}
          {invoice?.departure_location}
        </p>
        <div className="border-t border-black mb-4"></div>
        <div className="grid grid-cols-2 gap-6 mb-4">
          <div className="flex flex-col">
            <p className="mb-1 ">Date</p>
            <h5 className="flex items-center gap-2 font-semibold">
              <FaCalendarAlt className="text-primary" />
              {invoice?.start_date
                ? new Date(invoice.start_date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : "Loading..."}
            </h5>
          </div>
          <div className="flex flex-col">
            <p className="mb-1 ">Tourist</p>
            <h5 className="flex items-center gap-2 font-semibold">
              <FaPerson className="text-primary" />
              {handleSumTourist(
                invoice?.num_adults || 0,
                invoice?.num_children_120_140 || 0,
                invoice?.num_children_100_120 || 0
              )}{" "}
              People
            </h5>
          </div>
        </div>

        <div className="border-t border-black my-6"></div>
        <div className="grid grid-cols-2">
          <div className="flex flex-col">
            <p className="">Payment Method</p>
            <h5 className="text-green-600 uppercase font-semibold">
              {detailPayment?.payment_method}
              <p className="text-[18px] text-black normal-case">
                at {formattedDateTime(detailPayment?.payment_date || "")}
              </p>
            </h5>
          </div>
          <div className="flex flex-col">
            <p className="">Status</p>
            <h5 className="text-green-600 font-semibold uppercase">
              Confirmed
            </h5>
          </div>
        </div>

        <div className="border-t border-black my-6"></div>
        <div className="grid grid-cols-2">
          <h5 className="font-semibold">Total Paid</h5>
          <h2 className="text-right font-semibold text-primary">
            {formatPrice(Number(invoice?.amount_due))}{" "}
            <span className="text-[18px]">VNĐ</span>
          </h2>
        </div>

        <div className="mt-6 flex justify-center">
          <button
            onClick={handleDownloadInvoice}
            className="bg-primary font-semibold text-white flex items-center px-4 py-2 rounded-lg"
          >
            <FaDownload className="mr-2" />
            Download Invoice
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
