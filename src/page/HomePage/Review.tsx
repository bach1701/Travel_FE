import img from '../../assets/image/home/golden-bridge.svg';
import ava from '../../assets/image/home/ava-default.svg';
import StarRatings from 'react-star-ratings';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'; 

const Review = () => {
    const user = [
        {
            ava: ava,
            name: 'Phạm Duy Lết',
            rule: 'Web Developer',
            rating: 5,
            review: 'Lorem ipsum dolor sit amet consectetur. Porta ullamcorper vitae sem nec sem feugiat volutpat. Lorem ipsum dolor sit amet consectetur. Porta ullamcorper vitae sem nec sem feugiat volutpat.'
        }
    ];

    return (
        <div className='flex items-stretch px-36 py-28'>
            <div className='flex-shrink-0'>
                <img src={img} alt="Golden Bridge" className='h-auto' />
            </div>
            <div className='w-10' /> 
            <div className='flex-1 text-center bg-white border-2 border-primary rounded-2xl px-24 py-16 shadow-lg relative'>
                <h3 className='font-bold pb-4' style={{ fontSize: '30px'}}>Customer review</h3>
                <div className='pb-4'>
                    <StarRatings
                        rating={user[0].rating}
                        starRatedColor="#FF6A00"
                        numberOfStars= {5}
                        name='rating'
                        starDimension="30px"
                        starSpacing="5px"
                    />
                </div>
                <p className='pb-4 text-left' style={{ fontSize: '20px'}}>{user[0].review}</p>
                <div className='flex items-center justify-center mt-4'>
                    <img src={user[0].ava} alt="User Avatar" className='w-12 h-12 rounded-full' />
                    <div className='w-4' /> 
                    <div className='mr-4 text-left'>
                        <h5>{user[0].name}</h5>
                        <p>{user[0].rule}</p>
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
        </div>
    );
};

export default Review;