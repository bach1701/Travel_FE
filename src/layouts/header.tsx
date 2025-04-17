import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/image/header/logo-header.jpg'
import { useUserProfile } from '../hooks/useUserProfile';

const Header: React.FC = () => {
    
    const navigate = useNavigate();
    const user = useUserProfile();
    const location = useLocation();

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
          if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target as Node)
          ) {
            setDropdownOpen(false);
          }
        };
    
        document.addEventListener("mousedown", handleClickOutside);
    
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, []);

    const handleLogout = () => {
        localStorage.removeItem("AccessToken");
        navigate('/login');
    };

    return (
        <header className='fixed top-0 left-0 w-full h-[96px] bg-white shadow-md z-50 flex items-center justify-between px-8'>
            <div className="flex items-center">
                <img
                src={logo}
                alt="Avatar"
                className="w-24 h-24 rounded-full cursor-pointer"
                onClick={() => navigate('/')}
                />
            </div>
            <nav className="flex-1 flex justify-center space-x-10 font-medium text-gray-700 text-[20px]">
                <Link
                    to="/"
                    className={`px-2 transition hover:text-primary ${
                        location.pathname === '/' ? 'text-primary' : ''
                    }`}
                >
                    Home
                </Link>
                <Link
                    to="/about"
                    className={`px-2 transition hover:text-primary ${
                        location.pathname === '/about' ? 'text-primary' : ''
                    }`}
                >
                    About
                </Link>
                <Link
                    to="/destinations"
                    className={`px-2 transition hover:text-primary ${
                        location.pathname === '/destinations' ? 'text-primary' : ''
                    }`}
                >
                    Destination
                </Link>
                <Link
                    to="/tours/popular"
                    className={`px-2 transition hover:text-primary ${
                        location.pathname === '/tours/popular' ? 'text-primary' : ''
                    }`}
                >
                    Popular Tour
                </Link>
                <Link
                    to="/blog"
                    className={`px-2 transition hover:text-primary ${
                        location.pathname === '/blog' ? 'text-primary' : ''
                    }`}
                >
                    Blog
                </Link>
                <Link
                    to="/contact"
                    className={`px-2 transition hover:text-primary ${
                        location.pathname === '/contact' ? 'text-primary' : ''
                    }`}
                >
                    Contact
                </Link>
            </nav>

            {user ? (
                <div className="relative" ref={dropdownRef}>
                <button
                    className="flex items-center gap-2 focus:outline-none"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                    <img
                    src={user.avatar_url}
                    alt="User Avatar"
                    className="w-12 h-12 rounded-full object-cover"
                    />
                    <span className="font-medium text-gray-700">{user.name}</span>
                </button>

                {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg py-2 z-50">
                        <Link
                            to="/profile"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-[16px]"
                        >
                            Profile
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 text-[16px]"
                        >
                            Logout
                        </button>
                    </div>
                )}
                </div>
            ) : (
                <div className="flex items-center space-x-4 text-[18px]">
                <Link
                    to="/login"
                    className="text-gray-700 hover:text-primary font-medium transition"
                >
                    Login
                </Link>
                <Link
                    to="/register"
                    className="text-white bg-primary hover:bg-orange-600 px-4 py-2 rounded-lg transition"
                >
                    Register
                </Link>
                </div>
            )}
        </header>
    );
};

export default Header;