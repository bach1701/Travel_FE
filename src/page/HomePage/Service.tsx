import React from 'react';
import icPlane from '../../assets/image/home/icon-service/plane.svg'
import icPerson from '../../assets/image/home/icon-service/person.svg'
import icBus from '../../assets/image/home/icon-service/bus.svg'
import icHotel from '../../assets/image/home/icon-service/hotel.svg'
import icTravel from '../../assets/image/home/icon-service/Travel.svg'
import icShip from '../../assets/image/home/icon-service/ship.svg'

const Service = () => {

    const services = [
        {
            caption: 'Flight tickets and VISA',
            description: 'Domestic and international airline ticket agent. Visa procedures for all countries.',
            icon: icPlane
        },
        {
            caption: 'Travel services',
            description: 'Including domestic and international tours, meetings, trade promotion, tourism logistics...',
            icon: icTravel 
        },
        {
            caption: 'Book hotel & resort',
            description: 'Great daily deals and flexible cancellation policies ensure you always have the perfect place to stay.',
            icon: icHotel
        },
        {
            caption: 'Car rental',
            description: 'Many choices of high quality 4-seat - 45-seat vehicles.',
            icon: icBus
        },
        {
            caption: 'Recreational activities',
            description: 'Explore the diverse recreational activities at your destination to make your trip more interesting and memorable.',
            icon: icShip
        },
        {
            caption: 'Support & Amenities',
            description: 'Our support team is available 24/7 to answer any questions you may have, ensuring your trip goes smoothly.',
            icon: icPerson
        },
    ];

    const firstRowServices = services.slice(0, 3); 
    const secondRowServices = services.slice(3); 

    return (
        <div className='px-36 text-center mt-24 pb-24 items-center'>
           <h2 className='pb-4 font-bold'>Our Services</h2>
           <h4 className='pb-8'>Services from travel agents will help you have the best journey!</h4>
           <div className='flex gap-12 mb-12'>
                {firstRowServices.map((service, index) => (
                    <div key={index} className='flex-1 flex flex-col items-center bg-white rounded-2xl shadow-lg border-2 border-primary'>
                        <img src={service.icon} className='mb-4 mt-8' alt={service.caption} />
                        <h3 className='mb-4 text-primary font-bold'>{service.caption}</h3>
                        <p className='mb-8 px-8' style={{ fontSize: '20px' }}>{service.description}</p>
                    </div>
                ))}
           </div>
           <div className='flex gap-12 mb-12'>
                {secondRowServices.map((service, index) => (
                    <div key={index} className='flex-1 flex flex-col items-center bg-white rounded-2xl shadow-lg border-2 border-primary'>
                        <img src={service.icon} className='mb-4 mt-8' alt={service.caption} />
                        <h3 className='mb-4 text-primary font-bold'>{service.caption}</h3>
                        <p className='mb-8 px-8' style={{ fontSize: '20px' }}>{service.description}</p>
                    </div>
                ))}
           </div>
        </div>
    );
};

export default Service;