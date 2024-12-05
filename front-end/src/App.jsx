import "./App.css";
import AuthLayout from "components/layer/auth";
import HomePage from "pages/home";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Login from "pages/login";
import AboutUs from "pages/aboutUs";
import NonAuthLayout from "components/layer/nonAuth";
import AccountBooking from "pages/accountBooking";
import Contact from "pages/contact";
import ListCars from "pages/listCars";
import Profile from "pages/profile";
import QuickBooking from "pages/quickBooking";
import { DEFAULT } from "constants";
import Booking from "pages/booking";
import News from "pages/newAndBlog";
import ChangePassword from "pages/changePassword";
import AdminApp from "admin/AdminApp";
import OTP from "pages/OTP";
import BookingTicket from "pages/bookingTicket";
import MethodPayment from "pages/methodPayment";
import ForgetPassword from "pages/forgetPassword";
import SidebarDriver from "pages/Driver/SidebarDriver";
import Schedule from "pages/Driver/schedule";
import Parking from "pages/Driver/Parking";
import Map from "pages/Driver/Map";
import ImageUploadFile from "components/ImageUploadFile";
import { getTokenFromLocalStorage } from "utils/tokenUtils";
import AdminRoute from "admin/AdminRoute";
import { useEffect } from "react";
import ProfileDriver from "pages/Driver/ProfileDriver";
// import Page403 from "Page403";

function App() {
  // const token = window.localStorage.getItem(DEFAULT.TOKEN);

  const token = getTokenFromLocalStorage();
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  useEffect(() => {
    if (token) {
      if (role === "ROLE_ADMIN") {
        navigate("/admin/dashboard");
        // window.location.reload();
      }
    }
  }, []);

  return (
    <>
      {!token ? (
        <Routes>
          <Route path="/" element={<NonAuthLayout />}>
            <Route path="home" element={<HomePage />} />
            <Route path="login" element={<Login />} />
            <Route path="aboutUs" element={<AboutUs />} />
            <Route path="accountBooking" element={<AccountBooking />} />
            <Route path="contact" element={<Contact />} />
            <Route path="listCars" element={<ListCars />} />
            <Route path="quickBooking" element={<QuickBooking />} />
            <Route path="new" element={<News />} />
            <Route path="booking" element={<Booking />} />
            <Route path="OTP" element={<OTP />} />
            <Route path="identify" element={<ForgetPassword />} />
            <Route path="bookingTicket" element={<BookingTicket />} />
            <Route path="methodPayment" element={<MethodPayment />} />
          </Route>
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<AuthLayout />}>
            <Route
              path="home"
              element={<HomePage departureTime="10:00:00" />}
            />
            <Route path="aboutUs" element={<AboutUs />} />
            <Route path="accountBooking" element={<AccountBooking />} />
            <Route path="changePassword" element={<ChangePassword />} />
            <Route path="contact" element={<Contact />} />
            <Route path="listCars" element={<ListCars />} />
            <Route path="profile" element={<Profile />} />
            <Route path="quickBooking" element={<QuickBooking />} />
            <Route path="booking" element={<Booking />} />
            <Route path="new" element={<News />} />
            <Route path="OTP" element={<OTP />} />
            <Route path="bookingTicket" element={<BookingTicket />} />
            <Route path="methodPayment" element={<MethodPayment />} />
          </Route>
        </Routes>
      )}
      <Routes>
        <Route path="/driver" element={<SidebarDriver />}>
          <Route path="/driver/schedule" element={<Schedule />} />
          <Route path="/driver/parking" element={<Parking />} />
          <Route path="/driver/map" element={<Map />} />
          <Route path="/driver/profile" element={<ProfileDriver />} />
        </Route>
      </Routes>
      <Routes>
        <Route
          path="/admin/*"
          element={
            <AdminRoute>
              <AdminApp />
            </AdminRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
