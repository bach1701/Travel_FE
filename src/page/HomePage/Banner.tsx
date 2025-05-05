import { Fade } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import banner1 from "../../assets/image/home/banner.jpeg";
import banner2 from "../../assets/image/home/pq2.jpg";
import banner3 from "../../assets/image/home/hcm.jpg";
import styled from 'styled-components';
import { FaMapMarkerAlt, FaCalendarAlt, FaSearch } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLocations } from '../../redux/locationSlice';
import { RootState, AppDispatch } from '../../redux/store';
import { useNavigate } from 'react-router-dom';

const fadeImages = [
  {
    url: `${banner1}`,
    caption: 'Phu Quoc',
    discription: 'hello'
  },
  {
    url: `${banner2}`,
    caption: 'Phu Quoc',
    discription: 'hello'
  },
  {
    url: `${banner3}`,
    caption: 'Ho Chi Minh city',
    discription: 'hello'
  }
];

const SearchButton = styled.button`
  padding: 14px;
  background-color: white;
  color: #FF6A00;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  aspect-ratio: 1/1;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #FFF5F0;
    transform: scale(1.05);
  }
`;

const Slideshow = () => {

  const navigate = useNavigate();

  const [selectedDeparture, setSelectedDeparture] = useState('');
  const [selectedDestination, setSelectedDestination] = useState('');
  const [selectedDayDeparture, setSelectedDayDeparture] = useState('');
  const [selectedDuration, setSelectedDuration] = useState('');

  const dispatch = useDispatch<AppDispatch>();
  const { departureLocations, destinations,  } = useSelector(
    (state: RootState) => state.location
  );

  const handleSearch = (): void => {
    const params = new URLSearchParams();
  
    if (selectedDeparture) params.append('departure', selectedDeparture);
    if (selectedDestination) params.append('destination', selectedDestination);
    if (selectedDayDeparture) params.append('date', selectedDayDeparture);
    if (selectedDuration) params.append('duration', selectedDuration);
  
    navigate(`/tour?${params.toString()}`);
  };
  

  useEffect(() => {
    dispatch(fetchLocations());
  }, [dispatch]);

  return (
    <div style={{ position: 'relative' }}>
      <div className="slide-container">
        <Fade>
          {fadeImages.map((fadeImage, index) => (
            <div key={index} style={{ height: '850px', display: 'flex', position: 'relative'}}>
              <img 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                src={fadeImage.url} 
                alt={fadeImage.caption} 
              />
              <div className='font-nothing_you_could_do'
                style={{
                position: 'absolute',
                top: '30%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                color: 'white',
                fontSize: '150px',
                textShadow: '0 2px 4px rgba(0,0,0,0.5)',
                zIndex: 2,
                textAlign: 'center',
                width: '100%',
              }}>
                {fadeImage.caption}
              </div>
              <div className='font-mono uppercase'
                style={{
                position: 'absolute',
                top: '40%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                color: 'white',
                fontSize: '22px',
                textShadow: '0 2px 4px rgba(0,0,0,0.5)',
                zIndex: 2,
                textAlign: 'center',
                width: '100%',
              }}>
                Every destination is a story
              </div>
            </div>
          ))}
        </Fade>
      </div>

      <div style={{
        position: 'absolute',
        top: '500px',
        left: '130px',
        right: '130px',
        backgroundColor: 'white',
        borderRadius: '20px',
        padding: '20px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        gap: '12px',
        zIndex: 10,
        alignItems: 'center',
        border: '2px solid #FF6A00',
      }}>

        <div style={{ flex: 1, position: 'relative' }}>
          <div style={{ position: 'relative' }}>
            <FaMapMarkerAlt style={{
              position: 'absolute',
              left: '15px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#FF6A00'
            }} />
            <select
              value={selectedDeparture}
              onChange={(e) => setSelectedDeparture(e.target.value)}
              style={{
                width: '100%',
                padding: '14px 14px 14px 45px',
                border: '1px solid #000',
                borderRadius: '10px',
                fontSize: '16px',
                outline: 'none',
                color: '#666'
              }}
            >
              <option value="">Chọn điểm khởi hành</option>
              {departureLocations.map((loc) => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>
        </div>

        <div style={{ flex: 1, position: 'relative' }}>
          <div style={{ position: 'relative' }}>
            <FaMapMarkerAlt style={{
              position: 'absolute',
              left: '15px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#FF6A00'
            }} />
            <select
              value={selectedDestination}
              onChange={(e) => setSelectedDestination(e.target.value)}
              style={{
                width: '100%',
                padding: '14px 14px 14px 45px',
                border: '1px solid #000',
                borderRadius: '10px',
                fontSize: '16px',
                outline: 'none',
                color: '#666'
              }}
            >
              <option value="">Chọn điểm đến</option>
              {destinations.map((dest) => (
                <option key={dest} value={dest}>{dest}</option>
              ))}
            </select>
          </div>
        </div>


        <div style={{ flex: 1, position: 'relative' }}>
          <div style={{ position: 'relative' }}>
            <FaCalendarAlt style={{
              position: 'absolute',
              left: '15px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#FF6A00'
            }} />
            <input 
              value={selectedDayDeparture}
              onChange={(e) => setSelectedDayDeparture(e.target.value)}
              type="text" 
              placeholder="Departure date"
              onFocus={(e) => (e.target.type = 'date')}
              onBlur={(e) => (e.target.type = 'text')}
              style={{
                width: '100%',
                padding: '14px 14px 14px 45px',
                border: '1px solid #000',
                borderRadius: '10px',
                fontSize: '16px',
                outline: 'none',
                color: '#666'
              }}
            />
          </div>
        </div>

        {/* <div style={{ flex: 1, position: 'relative' }}>
          <div style={{ position: 'relative' }}>
            <FaCalendarAlt style={{
              position: 'absolute',
              left: '15px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#FF6A00'
            }} />
            <input 
              type="text" 
              placeholder="Number of days"
              onFocus={(e) => (e.target.type = 'number')}
              onBlur={(e) => (e.target.type = 'text')}
              style={{
                width: '100%',
                padding: '14px 14px 14px 45px',
                border: '1px solid #000',
                borderRadius: '10px',
                fontSize: '16px',
                outline: 'none'
              }}
            />
          </div>
        </div> */}

        <div style={{ flex: 1, position: 'relative' }}>
          <div style={{ position: 'relative' }}>
            <FaCalendarAlt
              style={{
                position: 'absolute',
                left: '15px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#FF6A00'
              }}
            />
            <select
              value={selectedDuration}
              onChange={(e) => setSelectedDuration(e.target.value)}
              style={{
                width: '100%',
                padding: '14px 14px 14px 45px',
                border: '1px solid #000',
                borderRadius: '10px',
                fontSize: '16px',
                outline: 'none',
                color: '#666'
              }}
            >
              <option value="">Chọn số ngày</option>
              <option value="1-3 ngày">1-3 ngày</option>
              <option value="3-5 ngày">3-5 ngày</option>
              <option value="5-7 ngày">5-7 ngày</option>
              <option value="7+ ngày">7+ ngày</option>
            </select>
          </div>
        </div>


        <div style={{ flex: 0.1 }}>
            <SearchButton onClick={handleSearch}>
                <FaSearch size={30} style={{ color: '#FF6A00' }} />
            </SearchButton>
        </div>
      </div>
    </div>
  );
};

export default Slideshow;