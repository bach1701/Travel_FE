import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from '../page/Login';
import RegisterPage from '../page/Register';
import HomePage from '../page/HomePage';
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';

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
                        <ProtectedRoute>
                            <HomePage />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter