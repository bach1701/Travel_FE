import React from 'react';
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
