import "./App.css";
import AuthLayout from "components/layer/auth";
import HomePage from "pages/home";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
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
import RestPassword from "pages/resetPassword";
import ImageUploadFile from "components/ImageUploadFile";
import BranchAndBound from "pages/Driver/testBranhAndBound";
import ScheduleNotAssignment from "pages/Driver/scheduleNotAssignment";
import { getTokenFromLocalStorage } from "utils/tokenUtils";
import { useEffect, useState } from "react";

// import RequireAuth from "RequireAuth";
import AdminRoute from "admin/AdminRoute";
import ProfileDriver from "pages/Driver/ProfileDriver";
import PaymentSuccess from "pages/PaymentSuccess";
// import Page403 from "Page403";

function App() {
  const token = getTokenFromLocalStorage();
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const location = useLocation();
  const [checkNavigated, setCheckNavigated] = useState(false);

  // useEffect(() => {
  //   if (token) {
  //     if (role === "ROLE_ADMIN") {
  //       navigate("/admin/dashboard");
  //     }
  //   }
  // }, []);

  useEffect(() => {
    if (
      location.pathname === "/driver/schedule" ||
      location.pathname === "/driver/parking" ||
      location.pathname === "/driver/map" ||
      location.pathname === "/driver/profile" ||
      location.pathname === "/driver/scheduleNotAssignment"
    ) {
      document.body.style.overflowX = "hidden";
      document.body.style.overflowY = "auto";
    } else {
      document.body.style.overflowX = "visible";
      document.body.style.overflowY = "visible";
    }
  }, [location]);

  return (
    <>
      {!token ? (
        <Routes>
          <Route path="/" element={<NonAuthLayout />}>
            <Route index element={<HomePage />} />
            <Route path="home" element={<HomePage />} />
            <Route path="login" element={<Login />} />
            <Route path="aboutUs" element={<AboutUs />} />
            <Route path="accountBooking" element={<AccountBooking />} />
            <Route path="contact" element={<Contact />} />
            <Route path="listCars" element={<ListCars />} />
            <Route path="new" element={<News />} />
            <Route path="booking" element={<Booking />} />
            <Route path="OTP" element={<OTP />} />
            <Route path="identify" element={<ForgetPassword />} />
            <Route path="bookingTicket" element={<BookingTicket />} />
            <Route path="methodPayment" element={<MethodPayment />} />
            <Route path="reset_password" element={<RestPassword />} />
          </Route>
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<AuthLayout />}>
            <Route index element={<HomePage />} />
            <Route path="home" element={<HomePage />} />
            <Route path="aboutUs" element={<AboutUs />} />
            <Route path="accountBooking" element={<AccountBooking />} />
            <Route path="changePassword" element={<ChangePassword />} />
            <Route path="contact" element={<Contact />} />
            <Route path="listCars" element={<ListCars />} />
            <Route path="profile" element={<Profile />} />
            <Route path="booking" element={<Booking />} />
            <Route path="new" element={<News />} />
            <Route path="OTP" element={<OTP />} />
            <Route path="bookingTicket" element={<BookingTicket />} />
            <Route path="methodPayment" element={<MethodPayment />} />
            <Route path="paymentSuccess" element={<PaymentSuccess />} />
          </Route>
        </Routes>
      )}
      <Routes>
        <Route path="branchAndBound" element={<BranchAndBound />} />
        <Route path="/driver" element={<SidebarDriver />}>
          <Route
            path="/driver/scheduleNotAssignment"
            element={<ScheduleNotAssignment />}
          />
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
