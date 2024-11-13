import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "../scenes/global/Topbar";
import Sidebar from "../scenes/global/Sidebar";
import Dashboard from "../scenes/dashboard";
import Team from "../scenes/team";
import CarAdmin from "scenes/car";
import Invoices from "../scenes/invoices";
import Contacts from "../scenes/contacts";
import VoucherAdmin from "scenes/voucher";
import ParkingLot from "scenes/parking";
import TypeCar from "scenes/type/typeCar";
import Bar from "../scenes/bar";
import Form from "../scenes/form";
import Line from "../scenes/line";
import Pie from "../scenes/pie";
import FAQ from "../scenes/faq";
import Geography from "../scenes/geography";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./adminTheme";
import Calendar from "../scenes/calendar/calendar";
import UserAdmin from "scenes/user";
import DriverAdmin from "scenes/driver/driverAdmin";
import DetailDriver from "scenes/driver/detail/detailDriver";
import DetailCar from "scenes/car/detailCar/detailCar";
import CreateCar from "scenes/car/create/createCar";
import Schedule from "scenes/schedule";
import AddSchedule from "scenes/schedule/addSchedule/AddSchedule";

function AdminApp() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="adminApp">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/voucher" element={<VoucherAdmin />} />
              <Route path="/user" element={<UserAdmin />} />
              <Route path="/driver" element={<DriverAdmin />} />
              <Route path="/driver/:id" element={<DetailDriver />} />
              <Route path="/schedule" element={<Schedule />} />
              <Route path="/schedule/create" element={<AddSchedule />} />
              <Route path="/parking" element={<ParkingLot />} />
              <Route path="/type" element={<TypeCar />} />
              <Route path="/car" element={<CarAdmin />} />
              <Route path="/car/create" element={<CreateCar />} />
              <Route path="/car/:id" element={<DetailCar />} />
              <Route path="/car/create" element={<CreateCar />} />
              <Route path="/team" element={<Team />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/form" element={<Form />} />
              <Route path="/bar" element={<Bar />} />
              <Route path="/pie" element={<Pie />} />
              <Route path="/line" element={<Line />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/geography" element={<Geography />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default AdminApp;
