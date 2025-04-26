import { Tour } from '@/types/Tour';
import { useEffect, useState } from 'react';
import TourCardItem from '@/components/TourCardItem';
import { FaCalendarAlt, FaChevronDown, FaChevronUp, FaMapMarkerAlt, FaUser } from 'react-icons/fa';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import CustomRadioButton from '@/components/ui/CustomRadioButton';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLocations } from '../../redux/locationSlice';
import { RootState, AppDispatch } from '../../redux/store';
import { destinationRegionMap } from '@/utils/locationRegions';
import { Pagination } from '@/types/Pagination';
import { baseURL } from '@/config/api';


const TourPage = () => {

    const [region, setRegion] = useState<number | null>(null);
    const [departureDate, setDepartureDate] = useState('');
    const [showDurationOptions, setShowDurationOptions] = useState(false);
    const [duration, setDuration] = useState('');
    const [showPeopleOptions, setShowPeopleOptions] = useState(false);
    const [people, setPeople] = useState('');
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000000]);
    const [selectedDeparture, setSelectedDeparture] = useState('');
    const [selectedDestination, setSelectedDestination] = useState('');
    const [listTours, setListTours] = useState<Tour[]>([]);
    const [, setPagination] = useState<Pagination | null>(null);

    const dispatch = useDispatch<AppDispatch>();
    const { departureLocations, destinations,  } = useSelector(
      (state: RootState) => state.location
    );

    const handleRegionChange = (newRegion: number) => {
        if (region !== newRegion) {
            setRegion(newRegion);
            setSelectedDestination('');
        } else {
            setRegion(newRegion); 
        }
    };
    

    useEffect(() => {
        dispatch(fetchLocations());
    }, [dispatch]);

    const filteredDestinations = region ?
        destinations.filter((dest) => destinationRegionMap[dest] === region)
        :destinations;

    useEffect(() => {
        const fetchTour = async() => {
            try {
                const params: any = {
                    availability: true,
                    min_price: priceRange[0],
                    max_price: priceRange[1],
                };
    
                if (region !== 0) {
                    params.region = region;
                }
    
                if (selectedDestination !== '') {
                    params.destination = selectedDestination;
                }
    
                if (duration) {
                    params.duration_range = duration;
                }

                if(people !== '') {
                    params.people_range = people;
                }
                const res = await axios.get(`${baseURL}/public/tours/search`, {
                    params: params
                });
                const { tours, pagination } = res.data;
                setListTours(tours);
                console.log('param -',params);
                console.log('list tour -',listTours);
                setPagination(pagination);
            }
            catch (err) {
                console.error(err);
            }
        };

        fetchTour();
    },[region, selectedDestination, priceRange, duration, people, departureDate]);

    return (
        <div className='container mx-auto px-4 py-8'>
            <div className='flex flex-col md:flex-row gap-8'>
                {/* Filter Side */}
                <div className='w-full md:w-1/4 space-y-6'>
                    <div className='bg-white p-6 rounded-lg shadow-md'>
                        <div className='space-y-4'>
                            <p className="text-sm font-medium mb-1" style={{ fontSize: '20px'}}>Khu vực</p>
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
                                <label className='block text-sm font-medium mb-2' style={{ fontSize: '20px' }}>Điểm khởi hành</label>
                                <div className='flex items-center border rounded-md p-2'>
                                    <FaMapMarkerAlt style={{ color: '#FF6A00', marginRight: '8px' }} />
                                    <select
                                        style={{ color: '#666'}}
                                        className='w-full outline-none'
                                        value={selectedDeparture}
                                        onChange={(e) => setSelectedDeparture(e.target.value)}>
                                        <option value="">Tất cả</option>
                                        {departureLocations.map((loc) => (
                                            <option key={loc} value={loc}>{loc}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className='block text-sm font-medium mb-2' style={{ fontSize: '20px' }}>Điểm đi</label>
                                <div className='flex items-center border rounded-md p-2'>
                                    <FaMapMarkerAlt style={{ color: '#FF6A00', marginRight: '8px' }} />
                                    <select
                                        style={{ color: '#666'}}
                                        className='w-full outline-none'
                                        value={selectedDestination}
                                        onChange={(e) => setSelectedDestination(e.target.value)}>
                                        <option value=''>Tất cả</option>
                                        {filteredDestinations.map((dest) => (
                                            <option key={dest} value={dest}>{dest}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className='block text-sm font-medium mb-2' style={{ fontSize: '20px' }}>Ngày khởi hành</label>
                                <div className='flex items-center border rounded-md p-2'>
                                    <FaCalendarAlt style={{ color: '#FF6A00', marginRight: '8px' }} />
                                    <input
                                    type='date'
                                    className='w-full outline-none'
                                    value={departureDate}
                                    onChange={(e) => setDepartureDate(e.target.value)}
                                    style={{ color: '#666'}}
                                    />
                                </div>
                            </div>

                            <div className="border-b border-gray-300" />

                            <div className='relative pt-2'>
                                <label className='block text-sm font-medium mb-2' style={{ fontSize: '20px' }}>Số người</label>
                                <div className='flex items-center border rounded-md p-2 justify-between'>
                                    <div className='flex items-center'>
                                    <FaUser style={{ color: '#FF6A00', marginRight: '8px' }} />
                                    <span style={{ color: '#666'}}>{people || 'Chọn số người'}</span>
                                    </div>
                                    <button
                                    onClick={() => setShowPeopleOptions(!showPeopleOptions)}
                                    className='ml-2 text-gray-500 hover:text-black'>
                                    {showPeopleOptions ? <FaChevronUp /> : <FaChevronDown />}
                                    </button>
                                </div>
                                {showPeopleOptions && (
                                    <div className='mt-2 grid grid-cols-2 gap-2' style={{ color: '#666'}}>
                                    {['1 người', '2 người', '3-5 người', '5+ người'].map((option) => (
                                        <button
                                        key={option}
                                        className={`border p-2 rounded-md hover:bg-orange-100 ${people === option ? 'bg-orange-200 font-semibold' : ''}`}
                                        onClick={() => {
                                            if (people === option) {
                                            setPeople('');
                                            } else {
                                            setPeople(option);
                                            }
                                        }}>
                                        {option}
                                        </button>
                                    ))}
                                    </div>
                                )}
                            </div>

                            <div className='relative'>
                                <label className='block text-sm font-medium mb-2' style={{ fontSize: '20px' }}>Số ngày</label>
                                <div className='flex items-center border rounded-md p-2 justify-between'>
                                    <div className='flex items-center'>
                                    <FaCalendarAlt style={{ color: '#FF6A00', marginRight: '8px' }} />
                                    <span style={{ color: '#666'}}>{duration || 'Chọn số ngày'}</span>
                                    </div>
                                    <button
                                    onClick={() => setShowDurationOptions(!showDurationOptions)}
                                    className='ml-2 text-gray-500 hover:text-black'>
                                    {showDurationOptions ? <FaChevronUp /> : <FaChevronDown />}
                                    </button>
                                </div>
                                {showDurationOptions && (
                                    <div className='mt-2 grid grid-cols-2 gap-2 ' style={{ color: '#666'}}>
                                        {['1-3 ngày', '3-5 ngày', '5-7 ngày', '7+ ngày'].map((option) => (
                                            <button
                                            key={option}
                                            className={`border p-2 rounded-md hover:bg-orange-100 ${duration === option ? 'bg-orange-200 font-semibold' : ''}`}
                                            onClick={() => {
                                                if (duration === option) {
                                                    setDuration('');
                                                } else {
                                                    setDuration(option);
                                                }
                                            }}>
                                            {option}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="border-b border-gray-300 py-2" />

                            <div className="mt-6">
                                <label className="block text-sm font-medium mb-2" style={{ fontSize: '20px'}}>Khoảng giá</label>
                                <div className="flex justify-between text-sm mb-2">
                                    <span>{priceRange[0].toLocaleString('vi-VN')} VNĐ</span>
                                    <span>{priceRange[1].toLocaleString('vi-VN')} VNĐ</span>
                                </div>
                                <Slider
                                    range
                                    min={0}
                                    max={50000000}
                                    step={500000}
                                    defaultValue={priceRange}
                                    onChange={(value) => setPriceRange(value as [number, number])}
                                    trackStyle={[{ backgroundColor: '#FF6A00' }]}
                                    handleStyle={[
                                    { borderColor: '#FF6A00' },
                                    { borderColor: '#FF6A00' }
                                    ]}
                                />
                            </div>

                        </div>
                    </div>
                </div>
                {/* List Tour */}
                <div className='w-full md:w-3/4'>
                    <div className='flex flex-wrap px-4 gap-6'>
                        {listTours.map((tour) => (
                            <div key={tour.tour_id} className='w-full sm:w-[calc(50%-16px)] lg:w-[calc(33.333%-16px)] xl:w-[330px]'>
                                <TourCardItem tour={tour} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TourPage;