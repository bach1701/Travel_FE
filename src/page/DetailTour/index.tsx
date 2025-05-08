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
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseURL } from "@/config/api";
import { Tour, TourDeparture, TourImage, TourItinerary } from "@/types/Tour";
import TourCardItem from "@/components/TourCardItem";
import StarRatings from "react-star-ratings";
import { ReviewResponse } from "../TourPage/ReviewType";
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
  const [reviewTour, setReviewTour] = useState<ReviewResponse | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const dataReview = {
    rating: [
      {
        rating: 0,
        label: "Service",
      },
      {
        rating: 0,
        label: "Guides",
      },
      {
        rating: 0,
        label: "Quality",
      },
      {
        rating: 0,
        label: "Safety",
      },
      {
        rating: 0,
        label: "Food",
      },
      {
        rating: 0,
        label: "Hotel",
      },
    ],
    name: "",
    phone: "",
    email: "",
    comment: "",
  };

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
        const resReviewTour = await axios.get(
          `${baseURL}/public/reviews/tours/${id}`
        );
        setReviewTour(resReviewTour.data);
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
                    {/* <div className="mt-8">
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
                                          reviewTour?.averageRating
                                            .guides_rating
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
                                          reviewTour?.averageRating
                                            .hotels_rating
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
                                          reviewTour?.averageRating
                                            .quality_rating
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
                                          reviewTour?.averageRating
                                            .safety_rating
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
                                          reviewTour?.averageRating
                                            .services_rating
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
                              <h3
                                className="font-bold pb-4"
                                style={{ fontSize: "30px" }}
                              >
                                Customer review
                              </h3>
                              <div className="pb-4">
                                <StarRatings
                                  rating={convertToIntegerAndRound(
                                    reviewTour?.reviews[currentIndex]
                                      .average_rating
                                  )}
                                  starRatedColor="#FF6A00"
                                  numberOfStars={5}
                                  name="rating"
                                  starDimension="30px"
                                  starSpacing="5px"
                                />
                              </div>
                              <p
                                className="pb-4 text-left"
                                style={{ fontSize: "20px" }}
                              >
                                {reviewTour?.reviews[currentIndex].comment}
                              </p>

                              <div className="flex items-center justify-center mt-4">
                                <img
                                  src={
                                    reviewTour?.reviews[currentIndex]
                                      .user_avatar || "/default-avatar.png"
                                  }
                                  alt="userReview Avatar"
                                  className="w-12 h-12 rounded-full border border-gray-300 p-1"
                                />
                                <div className="w-4" />
                                <div className="mr-4 text-left">
                                  <h5>
                                    {
                                      reviewTour?.reviews[currentIndex]
                                        .user_name
                                    }
                                  </h5>
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
                            {dataReview.rating.map((rate, index) => (
                              <div
                                key={index}
                                className="flex items-center gap-4"
                              >
                                <p className="text-base min-w-[100px] text-right">
                                  {rate.label}
                                </p>
                                <StarRatings
                                  rating={rate.rating}
                                  starRatedColor="#FF6A00"
                                  numberOfStars={5}
                                  name="rating"
                                  starDimension="24px"
                                  starSpacing="4px"
                                />
                              </div>
                            ))}
                          </div>
                          <h5>Write a feedback</h5>
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
                              className="border border-gray-400 rounded-sm p-2 w-full mb-4"
                              placeholder="Your comment..."
                              rows={8}
                            />
                            <div className="flex justify-center w-full">
                              <button className="bg-primary hover:bg-orange-600 text-white rounded- font-semibold uppercase p-4 px-8 items-center">
                                Send review
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div> */}
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
