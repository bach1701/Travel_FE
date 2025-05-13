import { Tour } from "@/types/Tour";
import { useEffect, useState } from "react";
import TourCardItem from "@/components/TourCardItem";
import {
  FaCalendarAlt,
  FaChevronDown,
  FaChevronUp,
  FaMapMarkerAlt,
  FaUser,
} from "react-icons/fa";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import CustomRadioButton from "@/components/ui/CustomRadioButton";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchLocations } from "../../redux/locationSlice";
import { RootState, AppDispatch } from "../../redux/store";
import { destinationRegionMap } from "@/utils/locationRegions";
import { baseURL } from "@/config/api";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { Pagination } from "antd";
import "antd/dist/reset.css";

const TourPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const searchParamsDestination = searchParams.get("destination");
  const searchParamsDate = searchParams.get("date");
  const searchParamsDuration = searchParams.get("duration");
  const searchParamsRegion = searchParams.get("region");
  const searchParamsDeparture = searchParams.get("departure");

  const [region, setRegion] = useState<number | null>(
    searchParamsRegion ? parseInt(searchParamsRegion) : 0
  );
  const [departureDate, setDepartureDate] = useState<string>(
    searchParamsDate || ""
  );
  const [showDurationOptions, setShowDurationOptions] = useState(false);
  const [duration, setDuration] = useState(searchParamsDuration);
  const [showPeopleOptions, setShowPeopleOptions] = useState(false);
  const [people, setPeople] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000000]);
  const [selectedDeparture, setSelectedDeparture] = useState<string>(
    searchParamsDeparture || ""
  );
  const [selectedDestination, setSelectedDestination] = useState<string>(
    searchParamsDestination || ""
  );
  const [listTours, setListTours] = useState<Tour[]>([]);
  const [noResult, setNoResult] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(6);
  const [totalItem, setTotalItem] = useState<number>(0);
  const [totalPage, setTotalPage] = useState<number>(0);

  const dispatch = useDispatch<AppDispatch>();
  const { departureLocations, destinations } = useSelector(
    (state: RootState) => state.location
  );

  const handleRegionChange = (newRegion: number) => {
    if (region !== newRegion) {
      setRegion(newRegion);
      setSelectedDestination("");
    } else {
      setRegion(newRegion);
    }
  };

  useEffect(() => {
    dispatch(fetchLocations());
  }, [dispatch]);

  const filteredDestinations = region
    ? destinations.filter((dest) => destinationRegionMap[dest] === region)
    : destinations;

  useEffect(() => {
    const fetchTour = async () => {
      try {
        const params: any = {
          availability: true,
          min_price: priceRange[0],
          max_price: priceRange[1],
          page: currentPage,
          limit: pageSize,
        };

        if (region !== 0) {
          params.region = region;
        }

        if (selectedDestination !== "") {
          params.destination = selectedDestination;
        }

        if (selectedDeparture !== "") {
          params.departure_location = selectedDeparture;
        }

        if (duration) {
          params.duration_range = duration;
        }

        if (departureDate) {
          params.departure_date = departureDate;
        }

        if (people !== "") {
          params.people_range = people;
        }

        const queryString = new URLSearchParams(params).toString();
        navigate(`/tour?${queryString}`);

        const res = await axios.get(`${baseURL}/public/tours/search`, {
          params: params,
        });
        const { tours } = res.data;
        setListTours(tours);
        setNoResult(false);
        setTotalItem(res.data.pagination.totalItems);
        setTotalPage(res.data.pagination.totalPages);
      } catch (err: any) {
        if (
          axios.isAxiosError(err) &&
          err.response?.data?.message === "No tours found"
        ) {
          setListTours([]);
          setNoResult(true);
        } else {
          console.error(err);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchTour();
  }, [
    region,
    selectedDestination,
    selectedDeparture,
    priceRange,
    duration,
    people,
    departureDate,
    navigate,
    currentPage,
    pageSize,
  ]);

  const handlePageChange = (page: number): void => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (value: number): void => {
    setCurrentPage(1);
    setPageSize(value);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filter Side */}
        <div className="w-full md:w-1/4 space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="space-y-4">
              <p
                className="text-sm font-medium mb-1"
                style={{ fontSize: "20px" }}
              >
                Khu vực
              </p>
              <CustomRadioButton
                label="Cả nước"
                value={1}
                checked={region === 0}
                onChange={() => handleRegionChange(0)}
              />
              <CustomRadioButton
                label="Miền Bắc"
                value={1}
                checked={region === 1}
                onChange={() => handleRegionChange(1)}
              />
              <CustomRadioButton
                label="Miền Trung"
                value={2}
                checked={region === 2}
                onChange={() => handleRegionChange(2)}
              />
              <CustomRadioButton
                label="Miền Nam"
                value={3}
                checked={region === 3}
                onChange={() => handleRegionChange(3)}
              />

              <div className="border-b border-gray-300" />

              <div className="">
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ fontSize: "20px" }}
                >
                  Điểm khởi hành
                </label>
                <div className="flex items-center border rounded-md p-2">
                  <FaMapMarkerAlt
                    style={{ color: "#FF6A00", marginRight: "8px" }}
                  />
                  <select
                    style={{ color: "#666" }}
                    className="w-full outline-none"
                    value={selectedDeparture}
                    onChange={(e) => setSelectedDeparture(e.target.value)}
                  >
                    <option value="">Tất cả</option>
                    {departureLocations.map((loc) => (
                      <option key={loc} value={loc}>
                        {loc}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ fontSize: "20px" }}
                >
                  Điểm đến
                </label>
                <div className="flex items-center border rounded-md p-2">
                  <FaMapMarkerAlt
                    style={{ color: "#FF6A00", marginRight: "8px" }}
                  />
                  <select
                    style={{ color: "#666" }}
                    className="w-full outline-none"
                    value={selectedDestination}
                    onChange={(e) => setSelectedDestination(e.target.value)}
                  >
                    <option value="">Tất cả</option>
                    {filteredDestinations.map((dest) => (
                      <option key={dest} value={dest}>
                        {dest}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ fontSize: "20px" }}
                >
                  Ngày khởi hành
                </label>
                <div className="flex items-center border rounded-md p-2">
                  <FaCalendarAlt
                    style={{ color: "#FF6A00", marginRight: "8px" }}
                  />
                  <input
                    type="date"
                    className="w-full outline-none"
                    value={departureDate}
                    onChange={(e) => setDepartureDate(e.target.value)}
                    style={{ color: "#666" }}
                  />
                </div>
              </div>

              <div className="border-b border-gray-300" />

              <div className="relative pt-2">
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ fontSize: "20px" }}
                >
                  Số người
                </label>
                <div className="flex items-center border rounded-md p-2 justify-between">
                  <div className="flex items-center">
                    <FaUser style={{ color: "#FF6A00", marginRight: "8px" }} />
                    <span style={{ color: "#666" }}>
                      {people || "Chọn số người"}
                    </span>
                  </div>
                  <button
                    onClick={() => setShowPeopleOptions(!showPeopleOptions)}
                    className="ml-2 text-gray-500 hover:text-black"
                  >
                    {showPeopleOptions ? <FaChevronUp /> : <FaChevronDown />}
                  </button>
                </div>
                {showPeopleOptions && (
                  <div
                    className="mt-2 grid grid-cols-2 gap-2"
                    style={{ color: "#666" }}
                  >
                    {["1 người", "2 người", "3-5 người", "5+ người"].map(
                      (option) => (
                        <button
                          key={option}
                          className={`border p-2 rounded-md hover:bg-orange-100 ${people === option ? "bg-orange-200 font-semibold" : ""}`}
                          onClick={() => {
                            if (people === option) {
                              setPeople("");
                            } else {
                              setPeople(option);
                            }
                          }}
                        >
                          {option}
                        </button>
                      )
                    )}
                  </div>
                )}
              </div>

              <div className="relative">
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ fontSize: "20px" }}
                >
                  Số ngày
                </label>
                <div className="flex items-center border rounded-md p-2 justify-between">
                  <div className="flex items-center">
                    <FaCalendarAlt
                      style={{ color: "#FF6A00", marginRight: "8px" }}
                    />
                    <span style={{ color: "#666" }}>
                      {duration || "Chọn số ngày"}
                    </span>
                  </div>
                  <button
                    onClick={() => setShowDurationOptions(!showDurationOptions)}
                    className="ml-2 text-gray-500 hover:text-black"
                  >
                    {showDurationOptions ? <FaChevronUp /> : <FaChevronDown />}
                  </button>
                </div>
                {showDurationOptions && (
                  <div
                    className="mt-2 grid grid-cols-2 gap-2 "
                    style={{ color: "#666" }}
                  >
                    {["1-3 ngày", "3-5 ngày", "5-7 ngày", "7+ ngày"].map(
                      (option) => (
                        <button
                          key={option}
                          className={`border p-2 rounded-md hover:bg-orange-100 ${duration === option ? "bg-orange-200 font-semibold" : ""}`}
                          onClick={() => {
                            if (duration === option) {
                              setDuration("");
                            } else {
                              setDuration(option);
                            }
                          }}
                        >
                          {option}
                        </button>
                      )
                    )}
                  </div>
                )}
              </div>

              <div className="border-b border-gray-300 py-2" />

              <div className="mt-6">
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ fontSize: "20px" }}
                >
                  Khoảng giá
                </label>
                <div className="flex justify-between text-sm mb-2">
                  <span>{priceRange[0].toLocaleString("vi-VN")} VNĐ</span>
                  <span>{priceRange[1].toLocaleString("vi-VN")} VNĐ</span>
                </div>
                <Slider
                  range
                  min={0}
                  max={50000000}
                  step={500000}
                  defaultValue={priceRange}
                  onChange={(value) => setPriceRange(value as [number, number])}
                  trackStyle={[{ backgroundColor: "#FF6A00" }]}
                  handleStyle={[
                    { borderColor: "#FF6A00" },
                    { borderColor: "#FF6A00" },
                  ]}
                />
              </div>
            </div>
          </div>
        </div>
        {/* List Tour */}
        {isLoading ? (
          <div className="flex justify-center items-center w-full h-[300px]">
            <ClipLoader color="#FF6A00" size={50} speedMultiplier={0.8} />
          </div>
        ) : (
          <div className="w-full md:w-3/4">
            {noResult ? (
              <h2 className="text-xl text-gray-600 px-4">
                Không có kết quả tìm kiếm phù hợp.
              </h2>
            ) : (
              <div className="flex flex-wrap px-4 gap-6">
                {listTours.map((tour) => (
                  <div
                    key={tour.tour_id}
                    className="w-full sm:w-[calc(50%-16px)] lg:w-[calc(33.333%-16px)] xl:w-[330px]"
                  >
                    <TourCardItem tour={tour} />
                  </div>
                ))}
              </div>
            )}
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
      </div>
    </div>
  );
};

export default TourPage;
