import banner from '../../assets/image/detail-tour/hue-4912504_1280 1.svg'
import { FaCalendarAlt, FaClock, FaPlaneDeparture, FaInfoCircle, FaStar, FaRoute, FaMoneyBillWave, FaHeart, FaClipboardList } from 'react-icons/fa';
import img1 from '../../assets/image/home/Cho-Hoi-An-2.jpg'
import img2 from '../../assets/image/home/Hoi-An-5.jpg'
import img3 from '../../assets/image/home/hcm.jpg'
import img4 from '../../assets/image/home/pq.jpg'
import img5 from '../../assets/image/home/pq2.jpg'
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

const DetailTour = () => {
    const { id } = useParams();
    console.log(id);

    useEffect(() => {

    },[] );

    return (
        <div >
            <div className='h-auto' style={{ backgroundImage: `url(${banner})`}}></div>
            <div className='flex flex-col md:flex-row gap-8 px-24 pt-6'>
                <div className='w-full md:w-3/4 space-y-2'>
                    <h1 className='uppercase font-bold'> MIỀN TRUNG 4N3Đ | CỐ ĐÔ HUẾ – ĐÀ NẴNG – BÀ NÀ HILL – PHỐ CỔ HỘI AN</h1>
                    <div className='flex flex-row pt-8'>
                        <div className='flex w-full md:w-1/10 items-center gap-2 text-lg text-gray-800'>
                            <FaClock style={{ color: '#FF6A00' }} />
                            <span>4N3Đ</span>
                        </div>
                        <div className='flex w-full md:w-9/10 text-center items-center gap-2 text-lg text-gray-800'>
                            <FaCalendarAlt style={{ color: '#FF6A00' }} />
                            <span>25/04/2025</span>
                        </div>
                    </div>
                        <div className='flex items-center gap-2 text-lg text-gray-800'>
                            <FaPlaneDeparture style={{ color: '#FF6A00' }} />
                            <span>Vietnam Airlines</span>
                        </div>
                </div>
                <div className='w-full md:w-1/4 items-center text-center pl-3'>
                    <h1 className='text-primary font-bold mb-4'>
                        7.000.000 <span className='text-2xl font-bold'>VNĐ</span>
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
                            src={img1}
                            alt="Large Tour"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="grid grid-cols-2 grid-rows-2 gap-4 h-[480px]">
                        {[img2, img3, img4, img5].map((img, index) => (
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
                <div className='flex items-center gap-2 text-lg font-semibold text-gray-800 mt-8'>
                    <FaInfoCircle style={{ color: '#FF6A00' }} />
                    <h3>Tổng Quan</h3>
                    <div>
                        <FaStar style={{ color: '#FF6A00' }} />
                        <h4>ĐIỂM NHẤN CHƯƠNG TRÌNH</h4>
                    </div>
                </div>
                    <div className='flex items-center gap-2 text-gray-700'>
                    <FaRoute style={{ color: '#FF6A00' }} />
                    <span>Chương trình</span>
                </div>
                    <div className='flex items-center gap-2 text-gray-700'>
                    <FaMoneyBillWave style={{ color: '#FF6A00' }} />
                    <span>Giá Tour & Phụ Thu Phòng Đơn</span>
                </div>
                    <div className='flex items-center gap-2 text-gray-700'>
                    <FaCalendarAlt style={{ color: '#FF6A00' }} />
                    <span>Danh Sách Ngày Khởi Hành</span>
                </div>
                    <div className='flex items-center gap-2 text-gray-700'>
                    <FaHeart style={{ color: '#FF6A00' }} />
                    <span>Có Thể Quý Khách Sẽ Thích</span>
                </div>
            </div>

            <div className='w-full md:w-1/3 space-y-4'>
                <div className='flex items-center gap-2 text-gray-700'>
                <FaClipboardList style={{ color: '#FF6A00' }} />
                <span>Thông tin cơ bản</span>
                </div>
            </div>
            </div>

        </div>
    );
};

export default DetailTour;