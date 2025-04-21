import { useState } from 'react';
import bg from '../../assets/image/home/bg_video.png';
import { FaPlay } from 'react-icons/fa';
import Modal from 'react-modal';
import '../../assets/scss/VideoIntro.css';

const VideoIntro = () => {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    return (
        <div 
            className='bg-center bg-no-repeat bg-cover'
            style={{
                backgroundImage: `url(${bg})`,
                backgroundSize: 'cover',
                height: '610px', 
                width: 'auto',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                paddingTop: '50px', 
                color: 'white' 
            }}
        >
            <h1 className='font-nothing_you_could_do' style={{ fontSize: '100px'}}>Enjoy Video</h1>
            <div 
                onClick={openModal} 
                className="play-button"
            >
                <FaPlay style={{ color: 'white', fontSize: '12px' }} /> 
            </div>

            <Modal 
                isOpen={isOpen}
                onRequestClose={closeModal}
                contentLabel="Video Modal"
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    },
                    content: {
                        top: '50%',
                        left: '50%',
                        right: 'auto',
                        bottom: 'auto',
                        transform: 'translate(-50%, -50%)',
                        backgroundColor: '#000',
                        border: 'none',
                        borderRadius: '10px',
                        padding: '0',
                    },
                }}
            >
                <button onClick={closeModal} style={{ color: 'white', background: 'none', border: 'none', fontSize: '20px', position: 'absolute', top: '10px', right: '10px' }}>X</button>
                <iframe 
                    width="900" 
                    height="507" 
                    src="https://www.youtube.com/embed/Au6LqK1UH8g" 
                    title="YouTube video player" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                ></iframe>
            </Modal>
        </div>
    );
};

export default VideoIntro;