import "./App.css";
import AuthLayout from "components/layer/auth";
import HomePage from "pages/home";
import { Route, Routes } from "react-router-dom";
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
import Voucher from "pages/voucher";
import AdminApp from "admin/AdminApp";
import OTP from "pages/OTP";
import BookingTicket from "pages/bookingTicket";
import MethodPayment from "pages/methodPayment";
import ForgetPassword from "pages/forgetPassword";

function App() {
  const token = window.localStorage.getItem(DEFAULT.TOKEN);
  

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
            <Route path="home" element={<HomePage />} />
            <Route path="aboutUs" element={<AboutUs />} />
            <Route path="accountBooking" element={<AccountBooking />} />
            <Route path="changePassword" element={<ChangePassword />} />
            <Route path="contact" element={<Contact />} />
            <Route path="listCars" element={<ListCars />} />
            <Route path="profile" element={<Profile />} />
            <Route path="quickBooking" element={<QuickBooking />} />
            <Route path="booking" element={<Booking />} />
            <Route path="new" element={<News />} />
            <Route path="voucher" element={<Voucher />} />
            <Route path="OTP" element={<OTP />} />
            <Route path="bookingTicket" element={<BookingTicket />} />
            <Route path="methodPayment" element={<MethodPayment />} />

          </Route>
        </Routes>
      )}
      <Routes>
        <Route path="/admin/*" element={<AdminApp />} />
      </Routes>
    </>
  );
}

export default App;
