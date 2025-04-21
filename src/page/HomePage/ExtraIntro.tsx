import destination from '../../assets/image/home/icon-extra-intro/Destina.svg'
import partner from '../../assets/image/home/icon-extra-intro/Partner.svg'
import human from '../../assets/image/home/icon-extra-intro/Human.svg'
import bg from '../../assets/image/home/subcribe.jpeg'


const ExtraIntro = () => {

    const Information = [
        {
            icon: destination,
            num: '100+',
            description: 'Destination'
        },
        {
            icon: partner,
            num: '50K',
            description: 'Customers are satisfied'
        },
        {
            icon: human,
            num: '20+',
            description: 'Trusted Operation'
        }
    ];
    return (
        <div className='relative flex bg-cover bg-no-repeat bg-center gap-16 py-10 px-36' style={{ backgroundImage: `url(${bg})`, height: 'auto' }}>
            <div className='absolute inset-0 bg-gray-600 opacity-60'></div>
            {Information.map((info, index) => (
                <div className=' relative flex-1 flex flex-col items-center text-center text-white content-center justify-center' key={index}>
                    <img className='pb-2' src={info.icon}></img>
                    <h4 className='font-bold' style={{ fontSize: '30px'}}>{info.num}</h4>
                    <p style={{ fontSize: '20px'}}>{info.description}</p>
                </div>
            ))}
        </div>
    );
};

export default ExtraIntro;

