import logo from '../assets/image/footer/logo.svg';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaPaperPlane } from 'react-icons/fa';

const Footer = () => {
    return (
        <div className='h-auto pt-4 text-center text-white' style={{ backgroundColor: '#282B35' }}>
            <img src={logo} className='h-24 px-4' alt="Logo" />
            <div className='flex px-16'>
                <div className='flex-1' style={{ fontSize: '20px'}}>
                    <h4 className='mb-6 font-bold'>Contact</h4>
                    <div className='flex items-center gap-2 my-3'>
                        <FaMapMarkerAlt className='flex-shrink-0 mr-1' style={{ color: '#FF6A00' }} />
                        <p>87 Nguyễn Lương Bằng, Đà Nẵng</p>
                    </div>
                    <div className='flex items-center gap-2 my-3'>
                        <FaPhone className='flex-shrink-0 mr-1' style={{ color: '#FF6A00' }} />
                        <p>1900 1922</p>
                    </div>
                    <div className='flex items-center gap-2 my-3'>
                        <FaEnvelope className='flex-shrink-0 mr-1' style={{ color: '#FF6A00' }} />
                        <p>travelwithbachnphat@gmail.com</p>
                    </div>
                </div>
                <div className='flex-1' style={{ fontSize: '20px'}}>
                    <h4 className='mb-6 font-bold'>Company</h4>
                    <p className='my-3'>Giới thiệu</p>
                    <p className='my-3'>Tours & dịch vụ</p>
                    <p className='my-3'>Tin tức</p>
                    <p className='my-3'>Tuyển dụng</p>
                    <p className='my-3'>Đối tác</p>
                    <p className='my-3'>Chính sách & quy định</p>
                </div>
                <div className='flex-1' style={{ fontSize: '20px'}}>
                    <h4 className='mb-6 font-bold'>Send email to administrator</h4>
                    <div className='flex items-center mt-2'>
                        <input 
                            type="email" 
                            placeholder="Type your email" 
                            className='w-full p-2 rounded-md bg-gray-700 text-white border border-gray-600'
                        />
                        <button className='flex items-center justify-center bg-orange-500 text-white py-2 px-4 rounded-lg ml-2'>
                            Send
                            <FaPaperPlane className='ml-2' />
                        </button>
                    </div>
                    <textarea 
                        placeholder="Message..." 
                        className='w-full p-2 mt-2 rounded-md bg-gray-700 text-white border border-gray-600' 
                        rows={4}
                    />
                </div>
            </div>
            <div className='border-t border-gray-600 w-full'></div>
            <div className='py-4 text-center text-gray-400 text-sm'>
                Copyright © 2025 All rights reserved | This template is made by BachHangA
            </div>
        </div>
    );
};

export default Footer;