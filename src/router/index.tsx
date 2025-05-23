import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "../page/Login";
import RegisterPage from "../page/Register";
import HomePage from "../page/HomePage";
import PublicRoute from "./PublicRoute";
import MainLayout from "../layouts/mainLayout";
import AboutPage from "../page/AboutPage";
import TourPage from "@/page/TourPage";
import DetailTour from "@/page/DetailTour";
import CheckoutPage from "@/page/CheckoutPage";
import ContactPage from "@/page/ContactPage";
import PaymentSuccessPage from "@/page/PaymentSuccess";
import PaymentFailedPage from "@/page/PaymentFailedPage";
import ProfilePage from "@/page/ProfilePage";
import DestinationPage from "@/page/Destination";
import ResetPassword from "@/page/ResetPassword";
import TypeResetPassword from "@/page/ResetPassword/TypeResetPassword";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route
          path="/reset-password/:tokenReset"
          element={<TypeResetPassword />}
        />
        <Route
          path="/profile"
          element={
            <MainLayout>
              <ProfilePage />
            </MainLayout>
          }
        />
        <Route
          path="/profile/booking-history"
          element={
            <MainLayout>
              <ProfilePage />
            </MainLayout>
          }
        />
        <Route
          path="/profile/review-history"
          element={
            <MainLayout>
              <ProfilePage />
            </MainLayout>
          }
        />
        <Route
          path="/profile/account-setting"
          element={
            <MainLayout>
              <ProfilePage />
            </MainLayout>
          }
        />

        <Route
          path="/"
          element={
            <MainLayout>
              <HomePage />
            </MainLayout>
          }
        />
        <Route
          path="/about"
          element={
            <MainLayout>
              <AboutPage />
            </MainLayout>
          }
        />
        <Route
          path="/destination"
          element={
            <MainLayout>
              <DestinationPage />
            </MainLayout>
          }
        />
        <Route
          path="/tour"
          element={
            <MainLayout>
              <TourPage />
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
        <Route
          path="/contact"
          element={
            <MainLayout>
              <ContactPage />
            </MainLayout>
          }
        />
        <Route
          path="/payment/success"
          element={
            <MainLayout>
              <PaymentSuccessPage />
            </MainLayout>
          }
        />
        <Route
          path="/payment/failed"
          element={
            <MainLayout>
              <PaymentFailedPage />
            </MainLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
