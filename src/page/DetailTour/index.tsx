import banner from '../../assets/image/detail-tour/hue-4912504_1280 1.svg'
import { FaCalendarAlt, FaClock, FaPlaneDeparture, FaInfoCircle, FaRoute, FaMoneyBillWave, FaHeart, FaClipboardList, FaChevronUp, FaChevronDown, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { baseURL } from '@/config/api';
import { Tour, TourDeparture, TourImage, TourItinerary } from '@/types/Tour';
import TourCardItem from '@/components/TourCardItem';
import StarRatings from 'react-star-ratings';
import ava from '../../assets/image/home/ava-default.svg';


const DetailTour = () => {

    const { id } = useParams();
    const [tour, setTour] = useState<Tour | null>(null);
    const [itinerary, setItinerary] = useState<TourItinerary []>([]);
    const [image, setImage] = useState<TourImage []>([]);
    const [departures, setDepartures] = useState<TourDeparture []>([]);
    const [showPlans, setShowPlans] = useState<{ [key: number]: boolean }>({});
    const [listTours, setListTours] = useState<Tour[]>([]);
    const [departuresChoose, setDeparturesChoose] = useState<TourDeparture | null>(null);


    const userReview = [
        {
            ava: ava,
            name: 'Phạm Duy Lết',
            rule: 'Web Developer',
            rating: 5,
            review: 'Lorem ipsum dolor sit amet consectetur. Porta ullamcorper vitae sem nec sem feugiat volutpat. Lorem ipsum dolor sit amet consectetur. Porta ullamcorper vitae sem nec sem feugiat volutpat.'
        }
    ];

    const rating = [
        {
            label: 'Service',
            rating: 5,

        },
        {
            label: 'Guides',
            rating: 4,

        },
        {
            label: 'Quality',
            rating: 5,

        },
        {
            label: 'Safety',
            rating: 4,

        },
        {
            label: 'Food',
            rating: 5,

        },
        {
            label: 'Hotel',
            rating: 5,

        },
    ];

    const dataReview = {
        rating : [
            {
                rating: 0,
                label: 'Service'
            },
            {
                rating: 0,
                label: 'Guides'
            },
            {
                rating: 0,
                label: 'Quality'
            },
            {
                rating: 0,
                label: 'Safety'
            },
            {
                rating: 0,
                label: 'Food'
            },
            {
                rating: 0,
                label: 'Hotel'
            },
        ],
        name: '',
        phone: '',
        email: '',
        comment: ''
    };
    
    const navigate = useNavigate();

    const togglePlan = (index: number) => {
        setShowPlans((prev) => ({
          ...prev,
          [index]: !prev[index],
        }));
    };

    const handleClickOrderNow: () => void = () => {
        navigate(`${window.location.pathname}/departure/${departuresChoose?.departure_id}/checkout`);
    };

    const formatPrice = (price: number): string => {
        const formattedPrice = price.toLocaleString('vi-VN');
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

    useEffect(() => {
        const fetchDetailTour = async() => {
            try {
                const response = await axios.get(`${baseURL}/public/tours/${id}`);
                setTour(response.data);
                setItinerary(response.data.itinerary);
                setImage(response.data.images);
                setDepartures(response.data.departures);
                console.log(tour, itinerary);
            }
            catch (err) {
                console.log(err)
            }
        };

        fetchDetailTour();
    },[id]);

    const getRandomTours = (tours: Tour[], count: number) => {
        const shuffled = tours.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    };

    const handleChooseDeparture = (day: TourDeparture): void => {
        setDeparturesChoose(day);
    }

    useEffect(() => {
        const fetchTour = async() => {
            try {
                const res = await axios.get(`${baseURL}/public/tours/search`);
                const tours = res.data.tours;
                const randomTours = getRandomTours(tours, 4);
                setListTours(randomTours);
                console.log('list tour -',randomTours);
            }
            catch (err) {
                console.error(err);
            }
        };

        fetchTour();
    },[]);

    return (
        <div >
            <div className='h-auto' style={{ backgroundImage: `url(${banner})`}}></div>
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
                        {[image[1]?.image_url, image[2]?.image_url, image[0]?.image_url, image[4]?.image_url].map((img, index) => (
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

            <div className='flex flex-col md:flex-row gap-8 px-24 pt-12'>
                <div className='w-full md:w-3/4 space-y-2'>
                    <div>    
                        <h1 className='uppercase font-bold'>{tour?.title}</h1>
                        <div className='flex flex-row pt-8'>
                            <div className='flex w-full md:w-1/10 items-center gap-2 text-lg text-gray-800'>
                                <FaClock style={{ color: '#FF6A00' }} />
                                <span>{tour?.duration}</span>
                            </div>
                            <div className='flex w-full md:w-9/10 text-center items-center gap-2 text-lg text-gray-800'>
                                <FaCalendarAlt style={{ color: '#FF6A00' }} />
                                {departures.slice(0, 3).map((day, key) => (
                                    <button onClick={() => handleChooseDeparture(day)} key={key} className='rounded-md px-2 text-white bg-primary'>
                                        {formatDate(day?.start_date)}
                                    </button>
                                ))}
                                <button className='rounded-md px-2 text-white bg-primary w-[80px]'>...</button>
                            </div>
                        </div>
                        <div className='flex items-center gap-2 text-lg text-gray-800'>
                            <FaPlaneDeparture style={{ color: '#FF6A00' }} />
                            <span>Vietnam Airlines</span>
                        </div>
                    </div>
                    <div>
                        <div className='flex flex-col md:flex-row gap-8 pt-1'>
                            <div className='w-full'>
                                <div className='mt-8 mb-8'>
                                    <div className='flex items-center gap-2 text-lg font-semibold text-primary'>
                                        <FaInfoCircle style={{ color: '#FF6A00' }} />
                                        <h3 style={{ fontSize: '24px' }}>Overview</h3>
                                    </div>
                                    {tour && (
                                        <div
                                            className="prose max-w-full mt-2 p-2 px-6"
                                            dangerouslySetInnerHTML={{ __html: tour.description }}
                                        />
                                    )}
                                </div>
                                <div className='border border-primary mx-6 mb-10'></div>
                                <div className='mt-8 mb-8'>
                                    <div className='flex items-center gap-2 text-lg font-semibold text-primary' >
                                        <FaRoute style={{ color: '#FF6A00' }} />
                                        <h3 className='text-center' style={{ fontSize: '24px' }}>Plan</h3>
                                    </div>

                                    {itinerary.map((itine, index) => (
                                        <div key={index} className=' border-gray-400 border p-2 mt-6'>
                                            <div key={index} className='flex items-center justify-between border-gray-400 p-4'>
                                                <h5 className='text-gray-800 font-semibold' style={{ fontSize: '16px' }}>Ngày {itine.day_number}: {itine.title}</h5>
                                                <button
                                                onClick={() => togglePlan(index)}
                                                className='hover:text-black flex items-center'
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
                                                dangerouslySetInnerHTML={{ __html: itine.description }}
                                                />
                                            )}
                                        </div>
                                    ))}
                                </div>
                                <div className='border border-primary mx-6 mt-12 mb-6'></div>
                                
                                <div className='pt-8 mb-8'>
                                    <div className='flex items-center gap-2 text-lg font-semibold text-primary'>
                                        <FaMoneyBillWave style={{ color: '#FF6A00' }} />
                                        <h3 style={{ fontSize: '24px' }}>Price</h3>
                                    </div>

                                    <div className='flex justify-between mt-2'>
                                        <p className='font-semibold' style={{ fontSize: '18px '}}>Tourist</p>
                                        <p className='font-semibold'  style={{ fontSize: '18px '}}>Price</p>
                                    </div>

                                    <div className='border border-black my-1 mb-4' />

                                    {[
                                        { label: 'Người lớn', price:  departures[0]?.price_adult },
                                        { label: 'Trẻ em (120cm-140cm)', price:  departures[0]?.price_child_120_140 },
                                        { label: 'Trẻ em (100cm-120cm)', price:  departures[0]?.price_child_100_120 },
                                        { label: 'Em bé', price: '0' },
                                    ].map((item, index) => (
                                        <div
                                        key={index}
                                        className='flex items-baseline gap-2 py-1'
                                        >
                                        <p className='whitespace-nowrap text-gray-800'  style={{ fontSize: '16px '}}>{item.label}</p>
                                        <div className='flex-grow border-b-2 border-dotted border-black' />
                                        <p className='whitespace-nowrap text-gray-800'  style={{ fontSize: '16px '}}>{item.price} VNĐ</p>
                                        </div>
                                    ))}
                                </div>
                                <div className='border border-primary mx-6 mt-12 mb-12'></div>
                                <div className='mt-8 mb-8'>
                                    <div className='flex items-center gap-2 text-lg font-semibold text-primary'>
                                        <FaCalendarAlt style={{ color: '#FF6A00' }} />
                                        <h3 style={{ fontSize: '24px' }}>Departure Date List</h3>
                                    </div>
                                </div>
                                <div className='border border-primary mx-6 mt-12 mb-12'></div>
                                <div className='mt-8'>
                                    <div className='flex items-center gap-2 text-lg mb-8 font-semibold text-primary'>
                                        <FaHeart style={{ color: '#FF6A00' }} />
                                        <h3 style={{ fontSize: '24px' }}>Review</h3>
                                    </div>
                                    <div>
                                        <div className="w-full ">
                                            <div className="flex flex-row flex-wrap px-4 gap-6 bg-white border border-primary py-6 rounded-lg p-4">
                                                <div className="flex flex-col justify-center items-center px-4">
                                                    <h2 className="text-2xl font-semibold">4,8/5</h2>
                                                    <StarRatings
                                                        rating={userReview[0].rating}
                                                        starRatedColor="#FF6A00"
                                                        numberOfStars={5}
                                                        name="rating"
                                                        starDimension="30px"
                                                        starSpacing="5px"
                                                    />
                                                <h5 className="text-sm text-gray-500 mt-2">299+ Reviews</h5>
                                                </div>
                                                <div className="flex flex-col justify-center gap-4 flex-1">
                                                    {rating.map((rate, index) => (
                                                        <div key={index} className="flex items-center gap-4">
                                                            <StarRatings
                                                                rating={rate.rating}
                                                                starRatedColor="#FF6A00"
                                                                numberOfStars={5}
                                                                name="rating"
                                                                starDimension="24px"
                                                                starSpacing="4px"
                                                            />
                                                            <p className="text-base">{rate.label}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        <div className='mt-12 flex-1 text-center bg-white border border-primary rounded-2xl px-24 py-16 shadow-lg relative'>
                                            <h3 className='font-bold pb-4' style={{ fontSize: '30px'}}>Customer review</h3>
                                            <div className='pb-4'>
                                                <StarRatings
                                                    rating={userReview[0].rating}
                                                    starRatedColor="#FF6A00"
                                                    numberOfStars= {5}
                                                    name='rating'
                                                    starDimension="30px"
                                                    starSpacing="5px"
                                                />
                                            </div>
                                            <p className='pb-4 text-left' style={{ fontSize: '20px'}}>{userReview[0].review}</p>
                                            <div className='flex items-center justify-center mt-4'>
                                                <img src={userReview[0].ava} alt="userReview Avatar" className='w-12 h-12 rounded-full' />
                                                <div className='w-4' /> 
                                                <div className='mr-4 text-left'>
                                                    <h5>{userReview[0].name}</h5>
                                                    <p>{userReview[0].rule}</p>
                                                </div>
                                            </div>
                                            <div className='absolute bottom-4 right-4 flex space-x-2'>
                                                <button className='p-2 border border-gray-400 bg-white rounded-full hover:bg-primary flex items-center justify-center'>
                                                    <FaArrowLeft className='text-gray-400 hover:text-white' style={{ fontSize: '25px' }} />
                                                </button>
                                                <button className='p-2 border border-gray-400 bg-white rounded-full hover:bg-primary flex items-center justify-center'>
                                                    <FaArrowRight className='text-gray-400 hover:text-white' style={{ fontSize: '25px' }} />
                                                </button>
                                            </div>
                                        </div>

                                        <div className='p-8 mt-12 rounded-lg border  border-primary bg-white'>
                                            <h3 className='font-semibold'>Write a review</h3>
                                            <div className="mt-6 mb-10 grid grid-cols-3 gap-4 flex-1 justify-items-center">
                                                {dataReview.rating.map((rate, index) => (
                                                    <div key={index} className="flex items-center gap-4">
                                                    <p className="text-base min-w-[100px] text-right">{rate.label}</p>
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
                                            <div className='mt-6 items-center'>
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
                                                    <button className="bg-primary text-white rounded- font-semibold uppercase p-4 px-8 items-center">
                                                    Send review
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div className='border border-primary mx-6 mt-12 mb-12'></div>
                            </div>
                        </div>
                    </div>
                    
                </div>
                <div className='w-full md:w-1/4 space-y-4'>
                    <div className='flex flex-col gap-2 shadow-orange-300 bg-white p-8 text-left rounded-lg border border-primary'>
                        <div className='flex items-center gap-2'>
                            <FaClipboardList style={{ color: '' }} className="text-xl" />
                            <h4 className='font-semibold text-lg text-[18px]'>Basic information</h4>
                        </div>
                        <div>
                            <ul className='pb-8'>
                                <li className='pb-2'>Depart: {departuresChoose?.start_date}</li>
                                <li>Duration: {tour?.duration}</li>
                            </ul>
                            <h2 className='text-center font-semibold text-primary'>
                                {formatPrice(Number(departuresChoose?.price_adult))}  
                                <span className='text-[16px]'> VNĐ</span>
                            </h2>
                            <div className="border border-primary mt-4 mb-8 w-[100%] items-center text-center justify-center"></div>
                            <button onClick={handleClickOrderNow} className='uppercase font-semibold items-center bg-primary shadow-lg text-white w-full rounded-md p-4 text-2xl'>
                                Book Now
                            </button>
                        </div>
                    </div>
                </div>
                
            </div>
            <div className=' px-24 pb-12'>
                <div className='flex items-center gap-2 text-lg mb-8 font-semibold text-primary'>
                    <FaHeart style={{ color: '#FF6A00' }} />
                    <h3 style={{ fontSize: '24px' }}>You May Also Like</h3>
                </div>
                <div>
                    <div className='w-full items-center justify-between'>
                        <div className='flex flex-wrap px-4 gap-4'>
                            {listTours.map((tour) => (
                                <div key={tour.tour_id} className='w-full sm:w-[calc(50%-16px)] lg:w-[calc(33.333%-16px)] xl:w-[330px]'>
                                    <TourCardItem tour={tour} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailTour;