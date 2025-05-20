import TourCardItem from "@/components/TourCardItem";
import { baseURL } from "@/config/api";
import { TourResponse } from "@/types/Pagination";
import { Tour } from "@/types/Tour";
import axios from "axios";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";

const PopularTour = () => {
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPopularTour = async () => {
      try {
        const response = await axios.get<TourResponse>(
          `${baseURL}/public/tours/search`
        );
        const { tours } = response.data;
        setTours(tours.slice(0, 3));
      } catch (err) {
        console.error("Lỗi khi lấy danh sách tour:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPopularTour();
  }, []);

  return (
    <div className="my-24 px-4 md:px-24">
      <div className="text-center">
        <h2 className="font-bold text-black pb-4">Popular Tour</h2>
        <h4 className="text-black text-lg pb-8" style={{ fontSize: "24px" }}>
          Our Top 3 Most Popular Tours
        </h4>
      </div>
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <ClipLoader color="#FF6A00" size={50} speedMultiplier={0.8} />
        </div>
      ) : (
        <div className="flex flex-wrap justify-center gap-10 px-4">
          {tours.map((tour) => (
            <div
              key={tour.tour_id}
              className="w-full sm:w-[calc(50%-16px)] lg:w-[calc(33.333%-16px)] xl:w-[350px]"
            >
              <TourCardItem tour={tour} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PopularTour;
