import React, { useEffect, useState } from 'react';
import { Tour } from '@/types/Tour';
import axios from 'axios';
import TourCard from '../../components/TourCard';
import PopularTour from './PopularTour';
import Destination from './Destination';
import VideoIntro from './VideoIntro';
import Service from './Service';
import Banner from './Banner';
import Subscribe from './Subscribe';
import Intro from './Intro';
import ExtraIntro from './ExtraIntro';
import Review from './Review';

const HomePage: React.FC = () => {
  // const [tours, setTours] = useState<Tour[]>([]);
  // const [loading, setLoading] = useState(true);
  // const baseURL = import.meta.env.VITE_API_URL;

  // useEffect(() => {
  //   const fetchTours = async() => {
  //     try {
  //       const response = await axios.get<Tour[]>(`${baseURL}/public/tours/search`);
  //       setTours(response.data);
  //     } catch (error) {
  //       console.error('Lỗi khi lấy danh sách tour:', error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchTours();
  // }, []);

  return (
    <>
      <section>
        <Banner/> 
      </section>
      <section>
        <Destination/> 
      </section>
      <section>
        <Subscribe/> 
      </section>
      <section>
        <PopularTour/> 
      </section>
      <section>
        <Intro/> 
      </section>
      <section>
        <Service/> 
      </section>
      <section>
        <ExtraIntro/> 
      </section>
      <section>
        <Review/> 
      </section>
      <section>
        <VideoIntro/> 
      </section>
    </>
  );
};

export default HomePage;
