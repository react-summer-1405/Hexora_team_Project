import { createBrowserRouter } from "react-router-dom";
import LandingPage from "./../pages/LandingPage";
import MainLayout from "../Components/layouts/MainLayout";
import CoursesPage from "../pages/CoursesPage";
import CourseDetailPage from "../pages/CourseDetailPage";
import AuthLayout from "../Components/auth/authLayout/authLayout";
import LoginPage from "../pages/auth/login/LoginPage";
import LoginVerification from "../pages/auth/login/LoginVerification";
import ForgotPasswordPage from "../pages/auth/forget/ForgotPasswordPage";
import ResetPasswordPage from "../pages/auth/forget/ResetPasswordPage";
import RegisterPage from "../pages/auth/register/RegisterPage";
import RegisterVerificationPage from "../pages/auth/register/RegisterVerificationPage";
import RegisterInfoPage from "../pages/auth/register/RegisterInfoPage";
import BlogsPage from "../pages/BlogsPage";
import BlogDetailPage from "../pages/BlogDetailPage";
import NotFoundPage from "../pages/NotFoundPage";
import ContactUs from "../pages/ContactUsPage";
import DashboardLayout from "../Components/layouts/dashboard/DashboardLayout";
import DashboardPage from "../pages/dashboard/DashboardPage";
import MyCoursesPage from "../pages/myCourses/MyCoursesPage";
import MyReservationsPage from "../pages/MyReservations/MyReservationsPage";
import PaymentsPage from "../pages/PaymentsPage/PaymentsPage";
import FavoriteCoursesPage from "../pages/FavoriteCoursesPage/FavoriteCoursesPage";
import FavoriteBlogsPage from "../pages/FavoriteBlogsPage/FavoriteBlogsPage";
import ProfilePage from "../pages/ProfilePage/ProfilePage";
import SchedulePage from "../pages/mySchedule/SchedulePage";

const router = createBrowserRouter([
  { path: "*", element: <NotFoundPage /> },
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: "courses", element: <CoursesPage /> },
      { path: "courses/:id", element: <CourseDetailPage /> },
      { path: "blogs", element: <BlogsPage /> },
      { path: "blogs/:id", element: <BlogDetailPage /> },
      { path: "contactUs", element: <ContactUs /> },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "verification",
        element: <LoginVerification />,
      },
      {
        path: "forget-password",
        element: <ForgotPasswordPage />,
      },
      {
        path: "reset-password",
        element: <ResetPasswordPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        path: "register-verification",
        element: <RegisterVerificationPage />,
      },
      {
        path: "register-info",
        element: <RegisterInfoPage />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: "my-courses", element: <MyCoursesPage /> },
      { path: "my-reserve", element: <MyReservationsPage /> },
      { path: "payments", element: <PaymentsPage /> },
      { path: "my-FavoriteCourses", element: <FavoriteCoursesPage /> },
      { path: "my-FavoriteBlogs", element: <FavoriteBlogsPage /> },
      { path: "profile", element: <ProfilePage /> },
      { path: "schedule", element: <SchedulePage /> },
    ],
  },
]);

export default router;
