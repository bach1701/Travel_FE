import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from '../page/Login';
import RegisterPage from '../page/Register';
import HomePage from '../page/HomePage';
import PublicRoute from './PublicRoute';
import MainLayout from '../layouts/mainLayout';
import AboutPage from '../page/AboutPage';
import TourPage from '@/page/TourPage';
import DetailTour from '@/page/DetailTour';
import CheckoutPage from '@/page/CheckoutPage';

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route 
                    path='/login' 
                    element={
                        <PublicRoute>
                            <LoginPage />
                        </PublicRoute>
                    }
                />
                <Route 
                    path='/register' 
                    element={
                    <RegisterPage/>
                    } 
                />
                <Route 
                    path='/' 
                    element={
                        <MainLayout>
                            <HomePage />
                        </MainLayout>
                    }
                />
                <Route 
                    path='/tour' 
                    element={
                        <MainLayout>
                            <TourPage />
                        </MainLayout>
                    }
                />
                <Route 
                    path='/about' 
                    element={
                        <MainLayout>
                            <AboutPage />
                        </MainLayout>
                    }
                />
                <Route 
                    path="/tour/detail-tour/:id"
                    element={
                        <MainLayout>
                            <DetailTour />
                        </MainLayout>
                    }
                />
                <Route 
                    path="/tour/detail-tour/:id/departure/:id_depa/checkout"
                    element={
                        <MainLayout>
                            <CheckoutPage />
                        </MainLayout>
                    }
                />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter