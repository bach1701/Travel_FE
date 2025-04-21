import IntroImage from '../../assets/image/home/PersonIntro.svg';
import BackgroundIntro from '../../assets/image/home/bgIntro.svg';

const Intro = () => {
    return (
        <div className='relative h-[900px] w-full overflow-hidden'>
            <img
                src={BackgroundIntro}
                alt="Background"
                className='absolute w-full h-full object-cover object-center'
                style={{
                    objectPosition: 'center'
                }}
            /> 
             <div 
                className='absolute inset-0 z-0'
                style={{
                    background: 'linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 100%)'
                }}
            ></div>
            <div className='absolute inset-0 bg-opacity-20 z-0'></div>
            <div className='flex flex-col md:flex-row pr-32 pl-28 relative z-10 h-full'>
                <div className='flex-1 flex items-center'>
                    <div className='h-full w-auto flex items-center'>
                        <img 
                            src={IntroImage} 
                            alt="Intro" 
                            className='h-[70%] w-auto object-contain'
                        />
                    </div>
                </div>
                <div className='flex-1 pl-28 pt-36'>
                    <div>
                        <h3 className='text-primary pb-4' style={{ fontSize: '32px' }}>Welcome to our website</h3>
                        <h3 className='font-bold pb-4' style={{ fontSize: '32px' }}>We are the best company for <br /> your visit</h3>
                        <p className='text-left pb-8' style={{ fontSize: '18px'}}>After decades of experience, and a whole life in Lucca, we offer you the most complete tourism service in the city. In addition to having bikes and rickshaws to have as much fun as you want, you have the choice of tour guides with whom to tour and drivers for your every need! We offer packages in the way that you get the most at the lowest price. Book with us and we will always be available for you!</p>
                    </div>
                    <div className='flex gap-12'>
                        <div className='flex-1 shadow-lg p-6 bg-white rounded-2xl border-primary'>
                            <h1 className='text-primary pb-3'>12K+</h1>
                            <h4 className='text-gray-400' style={{fontSize: '20px'}}>Success Journey</h4>
                        </div>
                        <div className='flex-1 shadow-lg p-6 bg-white rounded-2xl'>
                            <h1 className='text-primary pb-3'>16+</h1>
                            <h4 className='text-gray-400' style={{fontSize: '20px'}}>Awards Winning</h4>
                        </div>
                        <div className='flex-1 shadow-lg p-6 bg-white rounded-2xl'>
                            <h1 className='text-primary pb-3'>3+</h1>
                            <h4 className='text-gray-400' style={{fontSize: '20px'}}>Years of Experience</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Intro;