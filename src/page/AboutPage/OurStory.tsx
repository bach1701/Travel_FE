import building from '../../assets/image/about/building.svg'
import { FaArrowRight, FaPaperPlane } from 'react-icons/fa';
import cop from '../../assets/image/about/cop.svg'
import member from '../../assets/image/about/member.svg'
import value from '../../assets/image/about/value.svg'
import method from '../../assets/image/about/methodpay.svg'


const OurStory = () => {
    return (
        <div className=''>
            <div className='p-36 flex w-full'>
                <div className=' w-3/5 pr-12'>
                    <button className='bg-orange-500 uppercase font-bold text-white py-2 px-4 rounded-lg flex items-center justify-center mb-14'>
                        <FaPaperPlane className='mr-2' /> 
                        GET TO KNOW US
                    </button>
                    <div className=''>
                        <h2 className='text-center font-semibold mb-8'>Our story</h2>
                        <p className='text-[18px] pb-8'>Founded in 2010, Wanderlust began with a simple mission: to help people experience the world in new and meaningful ways. What started as a small team of travel enthusiasts has grown into a  global community of explorers and adventurers.</p>
                        <p className='text-[18px] pb-8'>Over the years, we've helped thousands of travelers discover hidden gems, connect with local cultures, and create memories that last a lifetime. Our journey continues as we explore new destinations and create unique experiences for our community.</p>
                        <button className='bg-orange-500 uppercase font-bold text-white py-2 px-4 rounded-lg flex items-center justify-center'>
                        Read more
                        <FaArrowRight className='ml-2' /> 
                        </button>
                    </div>
                </div>
                <div className='w-2/5 bg-cover bg-no-repeat rounded-lg' style={{ backgroundImage: `url(${building})`, width: '430px', height: '500px' }}>
                </div>
            </div>
            <div className="w-full h-[800px] bg-cover bg-no-repeat rounded-lg mb-24" style={{ backgroundImage: `url(${cop})` }}></div>
            <div className='px-24'>
                <div className="w-full h-[860px] bg-cover bg-no-repeat rounded-lg mb-24" style={{ backgroundImage: `url(${member})` }}></div>
                <div className="w-full h-[600px] bg-cover bg-no-repeat rounded-lg mb-24" style={{ backgroundImage: `url(${value})` }}></div>
                <div className="w-full h-[250px] bg-cover bg-no-repeat rounded-lg mb-24" style={{ backgroundImage: `url(${method})` }}></div>
            </div>
        </div>
    );
};

export default OurStory;