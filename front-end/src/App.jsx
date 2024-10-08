import logo from "./logo.svg";
import "./App.css";
import AuthLayout from "components/layer/auth";
import HomePage from "pages/home";
import { Route, Routes, useNavigate } from "react-router-dom";
import { LOCATION } from "constants";
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


function App() {
  const navigate = useNavigate();

  const token = window.localStorage.getItem(DEFAULT.TOKEN);

  // useEffect(() => {
  //   if (token) {
  //     axiosClient.defaults.headers.Authorization = `Bearer ${token}`;
  //   } else {
  //     navigate(LOCATION.LOGIN);
  //   }
  // }, [navigate, token]);

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
          </Route>
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<AuthLayout />}>
            <Route path="home" element={<HomePage />} />
            <Route path="aboutUs" element={<AboutUs />} />
            <Route path="accountBooking" element={<AccountBooking />} />
            <Route path="contact" element={<Contact />} />
            <Route path="listCars" element={<ListCars />} />
            <Route path="profile" element={<Profile />} />
            <Route path="quickBooking" element={<QuickBooking />} />
            <Route path="booking" element={<Booking />} />
            <Route path="new" element={<News />} />
          </Route>
          {/* <Route path="*" element={<NotFoundPage />} /> */}
        </Routes>
      )}
    </>
  );
}

export default App;
