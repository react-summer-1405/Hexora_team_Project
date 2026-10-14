import { createBrowserRouter } from "react-router-dom";
import LandingPage from "./../pages/LandingPage";
import MainLayout from "../Components/layouts/MainLayout";
import AuthLayout from "../Components/auth/authLayout/authLayout";
import LoginPage from "../pages/auth/login/LoginPage";
import LoginVerification from "../pages/auth/login/LoginVerification";
import ForgotPasswordPage from "../pages/auth/forget/ForgotPasswordPage";
import ResetPasswordPage from "../pages/auth/forget/ResetPasswordPage";
import RegisterPage from "../pages/auth/register/RegisterPage";
import RegisterVerificationPage from "../pages/auth/register/RegisterVerificationPage";
import RegisterInfoPage from "../pages/auth/register/RegisterInfoPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [{ index: true, element: <LandingPage /> }],
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
]);

export default router;
