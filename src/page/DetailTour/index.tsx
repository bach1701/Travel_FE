import banner from '../../assets/image/detail-tour/hue-4912504_1280 1.svg'
import { FaCalendarAlt, FaClock, FaPlaneDeparture, FaInfoCircle, FaStar, FaRoute, FaMoneyBillWave, FaHeart, FaClipboardList, FaChevronUp, FaChevronDown } from 'react-icons/fa';
import img1 from '../../assets/image/home/Cho-Hoi-An-2.jpg'
import img2 from '../../assets/image/home/Hoi-An-5.jpg'
import img3 from '../../assets/image/home/hcm.jpg'
import img4 from '../../assets/image/home/pq.jpg'
import img5 from '../../assets/image/home/pq2.jpg'
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { baseURL } from '@/config/api';
import { Tour, TourDeparture, TourImage, TourItinerary } from '@/types/Tour';

const DetailTour = () => {

    const { id } = useParams();
    const [tour, setTour] = useState<Tour | null>(null);
    const [itinerary, setItinerary] = useState<TourItinerary []>([]);
    const [image, setImage] = useState<TourImage []>([]);
    const [departures, setDepartures] = useState<TourDeparture []>([]);
    const [showPlans, setShowPlans] = useState<{ [key: number]: boolean }>({});

    const togglePlan = (index: number) => {
        setShowPlans((prev) => ({
          ...prev,
          [index]: !prev[index],
        }));
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

    return (
        <div >
            <div className='h-auto' style={{ backgroundImage: `url(${banner})`}}></div>
            <div className='flex flex-col md:flex-row gap-8 px-24 pt-6'>
                <div className='w-full md:w-3/4 space-y-2'>
                    <h1 className='uppercase font-bold'>{tour?.title}</h1>
                    <div className='flex flex-row pt-8'>
                        <div className='flex w-full md:w-1/10 items-center gap-2 text-lg text-gray-800'>
                            <FaClock style={{ color: '#FF6A00' }} />
                            <span>{tour?.duration}</span>
                        </div>
                        <div className='flex w-full md:w-9/10 text-center items-center gap-2 text-lg text-gray-800'>
                            <FaCalendarAlt style={{ color: '#FF6A00' }} />
                            <span>{departures[0]?.start_date}</span>
                        </div>
                    </div>
                        <div className='flex items-center gap-2 text-lg text-gray-800'>
                            <FaPlaneDeparture style={{ color: '#FF6A00' }} />
                            <span>Vietnam Airlines</span>
                        </div>
                </div>
                <div className='w-full md:w-1/4 items-center text-center pl-3'>
                    <h1 className='text-primary font-bold mb-4'>
                        {departures[0]?.price_adult} <span className='text-2xl font-bold'>VNĐ</span>
                    </h1>
                    <button
                        className='bg-primary text-white font-bold py-3 px-6 w-[85%] text-2xl hover:bg-orange-600 transition duration-300'
                    >
                        Đặt Ngay
                    </button>
                </div>
            </div>

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

            <div className='flex flex-col md:flex-row gap-8 px-24 pt-1'>
                <div className='w-full md:w-2/3 space-y-4'>
                    <div className='mt-8 mb-8'>
                        <div className='flex items-center gap-2 text-lg font-semibold text-primary'>
                            <FaInfoCircle style={{ color: '#FF6A00' }} />
                            <h3 style={{ fontSize: '24px' }}>Tổng Quan</h3>
                        </div>
                        {tour && (
                            <div
                                className="prose max-w-full mt-2 p-2 px-6"
                                dangerouslySetInnerHTML={{ __html: tour.description }}
                            />
                        )}
                    </div>
                    <div className='mt-8 mb-8'>
                        <div className='flex items-center gap-2 text-lg font-semibold text-primary' >
                            <FaRoute style={{ color: '#FF6A00' }} />
                            <h3 className='text-center' style={{ fontSize: '24px' }}>Chương trình</h3>
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
                    <div className='pt-8 mb-8'>
                        <div className='flex items-center gap-2 text-lg font-semibold text-primary'>
                            <FaMoneyBillWave style={{ color: '#FF6A00' }} />
                            <h3 style={{ fontSize: '24px' }}>Giá Tour</h3>
                        </div>

                        <div className='flex justify-between mt-2'>
                            <p className='font-semibold' style={{ fontSize: '18px '}}>Khách hàng</p>
                            <p className='font-semibold'  style={{ fontSize: '18px '}}>Giá tour</p>
                        </div>

                        <div className='border border-black my-1 mb-4' />

                        {[
                            { label: 'Người lớn', price:  departures[0]?.price_adult },
                            { label: 'Trẻ em (120cm-140cm)', price:  departures[0]?.price_child_120_140 },
                            { label: 'Trẻ em (100cm-120cm)', price:  departures[0]?.price_child_100_120 },
                            { label: 'Em bé', price: 'Free' },
                        ].map((item, index) => (
                            <div
                            key={index}
                            className='flex items-baseline gap-2 py-1'
                            >
                            <p className='whitespace-nowrap text-gray-800'  style={{ fontSize: '16px '}}>{item.label}</p>
                            <div className='flex-grow border-b-2 border-dotted border-black' />
                            <p className='whitespace-nowrap text-gray-800'  style={{ fontSize: '16px '}}>{item.price}</p>
                            </div>
                        ))}
                    </div>
                    <div className='mt-8 mb-8'>
                        <div className='flex items-center gap-2 text-lg font-semibold text-primary'>
                            <FaCalendarAlt style={{ color: '#FF6A00' }} />
                            <h3 style={{ fontSize: '24px' }}>Danh Sách Ngày Khởi Hành</h3>
                        </div>
                    </div>
                    <div className='mt-8'>
                        <div className='flex items-center gap-2 text-lg font-semibold text-primary'>
                            <FaHeart style={{ color: '#FF6A00' }} />
                            <h3 style={{ fontSize: '24px' }}>Có Thể Quý Khách Sẽ Thích</h3>
                        </div>
                    </div>
                </div>

                <div className='w-full md:w-1/3 space-y-4'>
                    <div className='flex flex-col gap-2 shadow-orange-300 bg-white mt-8 p-8 text-left rounded-lg border border-primary ml-20'>
                        <div className='flex items-center gap-2'>
                        <FaClipboardList style={{ color: '#FF6A00' }} className="text-xl" />
                        <h4 className='font-semibold text-lg text-[18px]'>Thông tin cơ bản</h4>
                        </div>
                        <div>
                        <ul className='pb-8'>
                            <li className='pb-2'>Khởi hành: {departures[0]?.start_date}</li>
                            <li>Thời gian: {tour?.duration}</li>
                        </ul>
                        <h2 className='text-center pb-8 font-semibold text-primary'>
                            {departures[0]?.price_adult} <span className='text-[16px]'>VNĐ</span>
                        </h2>
                        <button className='items-center bg-primary shadow-lg text-white w-full rounded-md p-4 text-2xl'>
                            Đặt ngay
                        </button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default DetailTour;