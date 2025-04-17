import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from '../page/Login';
import RegisterPage from '../page/Register';
import HomePage from '../page/HomePage';
import PublicRoute from './PublicRoute';
import MainLayout from '../layouts/mainLayout';
import AboutPage from '../page/AboutPage';

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
                    path='/about' 
                    element={
                        <MainLayout>
                            <AboutPage />
                        </MainLayout>
                    }
                />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter