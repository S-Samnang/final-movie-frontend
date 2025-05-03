import "./App.css";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import HomePage from "./pages/Home/HomePage";
import LoginPage from "./pages/Login/LoginPage";
import RegisterPage from "./pages/Login/RegisterPage";
import UpcomingPage from "./pages/Category/UpcomingPage";
import NowPlayingPage from "./pages/Category/NowPlayingPage";
import Navbar from "./component/Navbar";
import Footer from "./component/Footer";
import PrivateRoute from "./component/PrivateRoute";
import PopularPage from "./pages/Category/PopularPage";
import MovieDetail from "./pages/Detail/MovieDetail";
import SearchPage from "./pages/Category/SerachPage";
import SocialLoginRedirect from "./component/SocialLoginRedirect";
import RedirectToBackpack from "./component/RedirectToBackpack";
import FavoriteModal from "./component/FavoriteModal";
import ForgotPasswordPage from "./pages/Login/ForgotPasswordPage";
import ResetPasswordPage from "./pages/Login/ResetPasswordPage";
import ActorDetail from "./pages/Detail/ActorDetail";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            {/* Child routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/upcoming" element={<UpcomingPage />} />
            {/* <Route path="/moviedetail" element={<MovieDetail />} /> */}
            <Route path="/popular" element={<PopularPage />} />
            <Route path="/nowplaying" element={<NowPlayingPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/movie/:id" element={<MovieDetail />} />
            <Route path="/actor/:id" element={<ActorDetail />} />

            <Route
              path="/favorites"
              element={
                <PrivateRoute>
                  <FavoriteModal />
                </PrivateRoute>
              }
            />
          </Route>
          <Route path="/" element={<LoginLayout />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/social-login" element={<SocialLoginRedirect />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />  
          </Route>

          {/* admin route */}
          <Route
            path="/admin"
            element={
              <PrivateRoute allowedRoles={["admin"]}>
                <RedirectToBackpack />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

function MainLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

function LoginLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
