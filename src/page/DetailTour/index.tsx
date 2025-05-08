import banner from "../../assets/image/detail-tour/hue-4912504_1280 1.svg";
import {
  FaCalendarAlt,
  FaClock,
  FaPlaneDeparture,
  FaInfoCircle,
  FaRoute,
  FaMoneyBillWave,
  FaHeart,
  FaClipboardList,
  FaChevronUp,
  FaChevronDown,
  FaArrowRight,
} from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseURL } from "@/config/api";
import { Tour, TourDeparture, TourImage, TourItinerary } from "@/types/Tour";
import TourCardItem from "@/components/TourCardItem";
import BookNowButton from "@/components/ui/ButtonPrimary";
import { ClipLoader } from "react-spinners";
import Review from "./Review";

const DetailTour = () => {
  const { id } = useParams<{ id: string }>();
  const tourId = id || "";
  const [tour, setTour] = useState<Tour | null>(null);
  const [itinerary, setItinerary] = useState<TourItinerary[]>([]);
  const [image, setImage] = useState<TourImage[]>([]);
  const [departures, setDepartures] = useState<TourDeparture[]>([]);
  const [showPlans, setShowPlans] = useState<{ [key: number]: boolean }>({});
  const [listTours, setListTours] = useState<Tour[]>([]);
  const [departuresChoose, setDeparturesChoose] =
    useState<TourDeparture | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  const togglePlan = (index: number) => {
    setShowPlans((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleClickOrderNow: () => void = () => {
    navigate(
      `${window.location.pathname}/departure/${departuresChoose?.departure_id}/checkout`
    );
  };

  const handleClickBookNow = (day: TourDeparture): void => {
    navigate(
      `${window.location.pathname}/departure/${day.departure_id}/checkout`
    );
  };

  const formatPrice = (price: number): string => {
    const formattedPrice = price.toLocaleString("vi-VN");
    return `${formattedPrice}`;
  };

  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return "";
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const extractNights = (duration: string): number => {
    const match = duration.match(/(\d+)\s*đêm/);
    if (match) {
      return parseInt(match[1], 10);
    }
    return 0;
  };

  const calculateEndDate = (startDateStr: string, nights: number): string => {
    const startDate = new Date(startDateStr);
    if (isNaN(startDate.getTime())) return "";
    startDate.setDate(startDate.getDate() + nights);
    return formatDate(startDate.toISOString().split("T")[0]);
  };

  useEffect(() => {
    const fetchDetailTour = async () => {
      try {
        const resDetailTour = await axios.get(`${baseURL}/public/tours/${id}`);
        setTour(resDetailTour.data);
        setItinerary(resDetailTour.data.itinerary);
        setImage(resDetailTour.data.images);
        setDepartures(resDetailTour.data.departures);
        setDeparturesChoose(resDetailTour.data.departures[0]);
        console.log(resDetailTour.data.departures);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetailTour();
  }, [id]);

  const getRandomTours = (tours: Tour[], count: number) => {
    const shuffled = tours.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const handleChooseDeparture = (day: TourDeparture): void => {
    setDeparturesChoose(day);
  };

  useEffect(() => {
    const fetchTour = async () => {
      try {
        const res = await axios.get(`${baseURL}/public/tours/search`);
        const tours = res.data.tours;
        const randomTours = getRandomTours(tours, 4);
        setListTours(randomTours);
        console.log("list tour -", randomTours);
      } catch (err) {
        console.error(err);
      }
    };

    fetchTour();
  }, []);

  return (
    <div>
      {isLoading ? (
        <div className="flex justify-center items-center w-full h-[300px]">
          <ClipLoader color="#FF6A00" size={50} speedMultiplier={0.8} />
        </div>
      ) : (
        <>
          <div
            className="h-auto"
            style={{ backgroundImage: `url(${banner})` }}
          ></div>
          <div className="px-24 pt-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2 h-[480px]">
                <img
                  src={image[3]?.image_url}
                  alt="Large Tour"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-2 grid-rows-2 gap-4 h-[480px]">
                {[
                  image[1]?.image_url,
                  image[2]?.image_url,
                  image[0]?.image_url,
                  image[4]?.image_url,
                ].map((img, index) => (
                  <div key={index} className="h-full">
                    <img
                      src={img}
                      alt={`Tour image ${index + 2}`}
                      className="w-full h-full object-cover "
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-8 px-24 pt-12">
            <div className="w-full md:w-3/4 space-y-2">
              <div>
                <h1 className="uppercase font-bold">{tour?.title}</h1>
                <div className="flex flex-row pt-8">
                  <div className="flex w-full md:w-1/10 items-center gap-2 text-lg text-gray-800">
                    <FaClock style={{ color: "#FF6A00" }} />
                    <span>{tour?.duration}</span>
                  </div>
                  <div className="flex w-full md:w-9/10 text-center items-center gap-2 text-lg text-gray-800">
                    <FaCalendarAlt style={{ color: "#FF6A00" }} />
                    {departures.slice(0, 3).map((day, key) => (
                      <button
                        onClick={() => handleChooseDeparture(day)}
                        key={key}
                        className="rounded-md  hover:bg-orange-600 px-2 text-white bg-primary"
                      >
                        {formatDate(day?.start_date)}
                      </button>
                    ))}
                    <button className="hover:bg-orange-600 rounded-md px-2 text-white bg-primary w-[80px]">
                      ...
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-lg text-gray-800">
                  <FaPlaneDeparture style={{ color: "#FF6A00" }} />
                  <span>Vietnam Airlines</span>
                </div>
              </div>
              <div>
                <div className="flex flex-col md:flex-row gap-8 pt-1">
                  <div className="w-full">
                    <div className="mt-8 mb-8">
                      <div className="flex items-center gap-2 text-lg font-semibold text-primary">
                        <FaInfoCircle style={{ color: "#FF6A00" }} />
                        <h3 style={{ fontSize: "24px" }}>Overview</h3>
                      </div>
                      {tour && (
                        <div
                          className="prose max-w-full mt-2 p-2 px-6"
                          dangerouslySetInnerHTML={{ __html: tour.description }}
                        />
                      )}
                    </div>
                    <div className="border border-primary mx-6 mb-10"></div>
                    <div className="mt-8 mb-8">
                      <div className="flex items-center gap-2 text-lg font-semibold text-primary">
                        <FaRoute style={{ color: "#FF6A00" }} />
                        <h3
                          className="text-center"
                          style={{ fontSize: "24px" }}
                        >
                          Plan
                        </h3>
                      </div>

                      {itinerary.map((itine, index) => (
                        <div
                          key={index}
                          className=" border-gray-400 border p-2 mt-6"
                        >
                          <div
                            key={index}
                            className="flex items-center justify-between border-gray-400 p-4"
                          >
                            <h5
                              className="text-gray-800 font-semibold"
                              style={{ fontSize: "16px" }}
                            >
                              Ngày {itine.day_number}: {itine.title}
                            </h5>
                            <button
                              onClick={() => togglePlan(index)}
                              className="hover:text-black flex items-center"
                            >
                              {showPlans[index] ? (
                                <FaChevronUp className="text-xl" />
                              ) : (
                                <FaChevronDown className="text-xl" />
                              )}
                            </button>
                          </div>
                          {showPlans[index] && (
                            <div
                              className="prose max-w-full mt-4 p-4"
                              dangerouslySetInnerHTML={{
                                __html: itine.description,
                              }}
                            />
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="border border-primary mx-6 mt-12 mb-6"></div>

                    <div className="pt-8 mb-8">
                      <div className="flex items-center gap-2 text-lg font-semibold text-primary">
                        <FaMoneyBillWave style={{ color: "#FF6A00" }} />
                        <h3 style={{ fontSize: "24px" }}>Price</h3>
                      </div>

                      <div className="flex justify-between mt-2">
                        <p
                          className="font-semibold"
                          style={{ fontSize: "18px " }}
                        >
                          Tourist
                        </p>
                        <p
                          className="font-semibold"
                          style={{ fontSize: "18px " }}
                        >
                          Price
                        </p>
                      </div>

                      <div className="border border-black my-1 mb-4" />

                      {[
                        {
                          label: "Người lớn",
                          price: departuresChoose?.price_adult,
                        },
                        {
                          label: "Trẻ em (120cm-140cm)",
                          price: departuresChoose?.price_child_120_140,
                        },
                        {
                          label: "Trẻ em (100cm-120cm)",
                          price: departuresChoose?.price_child_100_120,
                        },
                        { label: "Em bé", price: "0" },
                      ].map((item, index) => (
                        <div
                          key={index}
                          className="flex items-baseline gap-2 py-1"
                        >
                          <p
                            className="whitespace-nowrap text-gray-800"
                            style={{ fontSize: "16px " }}
                          >
                            {item.label}
                          </p>
                          <div className="flex-grow border-b-2 border-dotted border-black" />
                          <p
                            className="whitespace-nowrap text-gray-800"
                            style={{ fontSize: "16px " }}
                          >
                            {formatPrice(Number(item.price))} VNĐ
                          </p>
                        </div>
                      ))}
                    </div>
                    <div className="border border-primary mx-6 mt-12 mb-12"></div>
                    <div className="mt-8 mb-8">
                      <div className="flex items-center gap-2 text-lg font-semibold text-primary">
                        <FaCalendarAlt style={{ color: "#FF6A00" }} />
                        <h3 style={{ fontSize: "24px" }}>
                          Departure Date List
                        </h3>
                      </div>
                      <div className="flex flex-col text-black mt-12">
                        {departures.map((dep, index) => (
                          <div
                            key={index}
                            className="flex flex-row border rounded overflow-hidden mb-4 border-black"
                          >
                            <div className="flex items-center text-center justify-between gap-2 flex-[2] p-3 border-r border-black">
                              <h5>{formatDate(dep.start_date)}</h5>
                              <FaArrowRight />
                              <h5>
                                {calculateEndDate(
                                  dep.start_date,
                                  extractNights(tour?.duration ?? "")
                                )}
                              </h5>
                            </div>
                            <div className="flex items-center justify-center flex-1 p-3 border-r border-black">
                              <h5>
                                {formatPrice(Number(dep.price_adult))}{" "}
                                <span className="text-[18px]">VNĐ</span>
                              </h5>
                            </div>
                            <div className="flex items-center justify-center flex-1 p-3">
                              <BookNowButton
                                className="w-full text-[32px] h-[40px]"
                                onClick={() => handleClickBookNow(dep)}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="border border-primary mx-6 mt-12 mb-12"></div>

                    <Review id={tourId}></Review>
                    <div className="border border-primary mx-6 mt-12 mb-12"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/4 space-y-4">
              <div className="flex flex-col gap-2 shadow-orange-300 bg-white p-8 text-left rounded-lg border border-primary">
                <div className="flex items-center gap-2">
                  <FaClipboardList style={{ color: "" }} className="text-xl" />
                  <h4 className="font-semibold text-lg text-[18px]">
                    Basic information
                  </h4>
                </div>
                <div>
                  <ul className="pb-8">
                    <li className="pb-2">
                      Depart: {departuresChoose?.start_date}
                    </li>
                    <li>Duration: {tour?.duration}</li>
                  </ul>
                  <h2 className="text-center font-semibold text-primary">
                    {formatPrice(Number(departuresChoose?.price_adult))}
                    <span className="text-[16px]"> VNĐ</span>
                  </h2>
                  <div className="border border-primary mt-4 mb-8 w-[100%] items-center text-center justify-center"></div>
                  <BookNowButton
                    className="w-full text-[30px] h-[48px]"
                    onClick={handleClickOrderNow}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className=" px-24 pb-12">
            <div className="flex items-center gap-2 text-lg mb-8 font-semibold text-primary">
              <FaHeart style={{ color: "#FF6A00" }} />
              <h3 style={{ fontSize: "24px" }}>You May Also Like</h3>
            </div>
            <div>
              <div className="w-full items-center justify-between">
                <div className="flex flex-wrap px-4 gap-4">
                  {listTours.map((tour) => (
                    <div
                      key={tour.tour_id}
                      className="w-full sm:w-[calc(50%-16px)] lg:w-[calc(33.333%-16px)] xl:w-[330px]"
                    >
                      <TourCardItem tour={tour} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DetailTour;
