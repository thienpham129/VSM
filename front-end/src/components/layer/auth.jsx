import React from "react";
import { Outlet } from "react-router-dom";

import Header from "./header";
import Footer from "./footer";


function AuthLayout() {
  return (
    <div id="wrapper">
      <div id="de-preloader"></div>

      <Header />


      <Outlet />

      <Footer />
    </div>
  );
}

export default AuthLayout;
