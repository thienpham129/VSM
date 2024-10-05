import React from "react";

const AccountBooking = () => {
  return (
    <div className="no-bottom no-top zebra" id="content">
      <div id="top" />
      {/* section begin */}
      <section id="subheader" className="jarallax text-light">
        <img src="images/background/14.jpg" className="jarallax-img" alt="" />
        <div className="center-y relative text-center">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1>My Orders</h1>
              </div>
              <div className="clearfix" />
            </div>
          </div>
        </div>
      </section>
      {/* section close */}
      <section id="section-settings" className="bg-gray-100">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 mb30">
              <div className="card padding30 rounded-5">
                <div className="profile_avatar">
                  <div className="profile_img">
                    <img src="images/profile/1.jpg" alt="" />
                  </div>
                  <div className="profile_name">
                    <h4>
                      Monica Lucas
                      <span className="profile_username text-gray">
                        monica@rentaly.com
                      </span>
                    </h4>
                  </div>
                </div>
                <div className="spacer-20" />
                <ul className="menu-col">
                  <li>
                    <a href="account-dashboard.html">
                      <i className="fa fa-home" />
                      Dashboard
                    </a>
                  </li>
                  <li>
                    <a href="account-profile.html">
                      <i className="fa fa-user" />
                      My Profile
                    </a>
                  </li>
                  <li>
                    <a href="#" className="active">
                      <i className="fa fa-calendar" />
                      My Orders
                    </a>
                  </li>
                  <li>
                    <a href="account-favorite.html">
                      <i className="fa fa-car" />
                      My Favorite Cars
                    </a>
                  </li>
                  <li>
                    <a href="login.html">
                      <i className="fa fa-sign-out" />
                      Sign Out
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-9">
              <div className="card padding30 rounded-5 mb25">
                <h4>Scheduled Orders</h4>
                <table className="table de-table">
                  <thead>
                    <tr>
                      <th scope="col">
                        <span className="fs-12 text-gray">Order ID</span>
                      </th>
                      <th scope="col">
                        <span className="fs-12 text-gray">Car Name</span>
                      </th>
                      <th scope="col">
                        <span className="fs-12 text-gray">
                          Pick Up Location
                        </span>
                      </th>
                      <th scope="col">
                        <span className="fs-12 text-gray">
                          Drop Off Location
                        </span>
                      </th>
                      <th scope="col">
                        <span className="fs-12 text-gray">Pick Up Date</span>
                      </th>
                      <th scope="col">
                        <span className="fs-12 text-gray">Return Date</span>
                      </th>
                      <th scope="col">
                        <span className="fs-12 text-gray">Status</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <span className="d-lg-none d-sm-block">Order ID</span>
                        <div className="badge bg-gray-100 text-dark">
                          #01245
                        </div>
                      </td>
                      <td>
                        <span className="d-lg-none d-sm-block">Car Name</span>
                        <span className="bold">Ferrari Enzo</span>
                      </td>
                      <td>
                        <span className="d-lg-none d-sm-block">
                          Pick Up Location
                        </span>
                        Kentucky
                      </td>
                      <td>
                        <span className="d-lg-none d-sm-block">
                          Drop Off Location
                        </span>
                        Michigan
                      </td>
                      <td>
                        <span className="d-lg-none d-sm-block">
                          Pick Up Date
                        </span>
                        March 14, 2023
                      </td>
                      <td>
                        <span className="d-lg-none d-sm-block">
                          Return Date
                        </span>
                        March 16, 2023
                      </td>
                      <td>
                        <div className="badge rounded-pill bg-warning">
                          scheduled
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span className="d-lg-none d-sm-block">Order ID</span>
                        <div className="badge bg-gray-100 text-dark">
                          #01245
                        </div>
                      </td>
                      <td>
                        <span className="d-lg-none d-sm-block">Car Name</span>
                        <span className="bold">VW Polo</span>
                      </td>
                      <td>
                        <span className="d-lg-none d-sm-block">
                          Pick Up Location
                        </span>
                        Philadelphia
                      </td>
                      <td>
                        <span className="d-lg-none d-sm-block">
                          Drop Off Location
                        </span>
                        Washington
                      </td>
                      <td>
                        <span className="d-lg-none d-sm-block">
                          Pick Up Date
                        </span>
                        March 16, 2023
                      </td>
                      <td>
                        <span className="d-lg-none d-sm-block">
                          Return Date
                        </span>
                        March 18, 2023
                      </td>
                      <td>
                        <div className="badge rounded-pill bg-warning">
                          scheduled
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span className="d-lg-none d-sm-block">Order ID</span>
                        <div className="badge bg-gray-100 text-dark">
                          #01216
                        </div>
                      </td>
                      <td>
                        <span className="d-lg-none d-sm-block">Car Name</span>
                        <span className="bold">Toyota Rav 4</span>
                      </td>
                      <td>
                        <span className="d-lg-none d-sm-block">
                          Pick Up Location
                        </span>
                        Baltimore
                      </td>
                      <td>
                        <span className="d-lg-none d-sm-block">
                          Drop Off Location
                        </span>
                        Sacramento
                      </td>
                      <td>
                        <span className="d-lg-none d-sm-block">
                          Pick Up Date
                        </span>
                        March 19, 2023
                      </td>
                      <td>
                        <span className="d-lg-none d-sm-block">
                          Return Date
                        </span>
                        March 20, 2023
                      </td>
                      <td>
                        <div className="badge rounded-pill bg-warning">
                          scheduled
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="card padding30 rounded-5 mb25">
                <h4>Completed Orders</h4>
                <table className="table de-table">
                  <thead>
                    <tr>
                      <th scope="col">
                        <span className="fs-12 text-gray">Order ID</span>
                      </th>
                      <th scope="col">
                        <span className="fs-12 text-gray">Car Name</span>
                      </th>
                      <th scope="col">
                        <span className="fs-12 text-gray">
                          Pick Up Location
                        </span>
                      </th>
                      <th scope="col">
                        <span className="fs-12 text-gray">
                          Drop Off Location
                        </span>
                      </th>
                      <th scope="col">
                        <span className="fs-12 text-gray">Pick Up Date</span>
                      </th>
                      <th scope="col">
                        <span className="fs-12 text-gray">Return Date</span>
                      </th>
                      <th scope="col">
                        <span className="fs-12 text-gray">Status</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <span className="d-lg-none d-sm-block">Order ID</span>
                        <div className="badge bg-gray-100 text-dark">
                          #01236
                        </div>
                      </td>
                      <td>
                        <span className="d-lg-none d-sm-block">Car Name</span>
                        <span className="bold">Jeep Renegade</span>
                      </td>
                      <td>
                        <span className="d-lg-none d-sm-block">
                          Pick Up Location
                        </span>
                        New York
                      </td>
                      <td>
                        <span className="d-lg-none d-sm-block">
                          Drop Off Location
                        </span>
                        Los Angeles
                      </td>
                      <td>
                        <span className="d-lg-none d-sm-block">
                          Pick Up Date
                        </span>
                        March 2, 2023
                      </td>
                      <td>
                        <span className="d-lg-none d-sm-block">
                          Return Date
                        </span>
                        March 11, 2023
                      </td>
                      <td>
                        <div className="badge rounded-pill bg-success">
                          completed
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span className="d-lg-none d-sm-block">Order ID</span>
                        <div className="badge bg-gray-100 text-dark">
                          #01287
                        </div>
                      </td>
                      <td>
                        <span className="d-lg-none d-sm-block">Car Name</span>
                        <span className="bold">Hyundai Staria</span>
                      </td>
                      <td>
                        <span className="d-lg-none d-sm-block">
                          Pick Up Location
                        </span>
                        Nevada
                      </td>
                      <td>
                        <span className="d-lg-none d-sm-block">
                          Drop Off Location
                        </span>
                        New Mexico
                      </td>
                      <td>
                        <span className="d-lg-none d-sm-block">
                          Pick Up Date
                        </span>
                        March 6, 2023
                      </td>
                      <td>
                        <span className="d-lg-none d-sm-block">
                          Return Date
                        </span>
                        March 12, 2023
                      </td>
                      <td>
                        <div className="badge rounded-pill bg-success">
                          completed
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span className="d-lg-none d-sm-block">Order ID</span>
                        <div className="badge bg-gray-100 text-dark">
                          #01236
                        </div>
                      </td>
                      <td>
                        <span className="d-lg-none d-sm-block">Car Name</span>
                        <span className="bold">Range Rover</span>
                      </td>
                      <td>
                        <span className="d-lg-none d-sm-block">
                          Pick Up Location
                        </span>
                        Virginia
                      </td>
                      <td>
                        <span className="d-lg-none d-sm-block">
                          Drop Off Location
                        </span>
                        Oregon
                      </td>
                      <td>
                        <span className="d-lg-none d-sm-block">
                          Pick Up Date
                        </span>
                        March 2, 2023
                      </td>
                      <td>
                        <span className="d-lg-none d-sm-block">
                          Return Date
                        </span>
                        March 13, 2023
                      </td>
                      <td>
                        <div className="badge rounded-pill bg-success">
                          completed
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span className="d-lg-none d-sm-block">Order ID</span>
                        <div className="badge bg-gray-100 text-dark">
                          #01287
                        </div>
                      </td>
                      <td>
                        <span className="d-lg-none d-sm-block">Car Name</span>
                        <span className="bold">BMW M2</span>
                      </td>
                      <td>
                        <span className="d-lg-none d-sm-block">
                          Pick Up Location
                        </span>
                        Kansas City
                      </td>
                      <td>
                        <span className="d-lg-none d-sm-block">
                          Drop Off Location
                        </span>
                        Houston
                      </td>
                      <td>
                        <span className="d-lg-none d-sm-block">
                          Pick Up Date
                        </span>
                        March 1, 2023
                      </td>
                      <td>
                        <span className="d-lg-none d-sm-block">
                          Return Date
                        </span>
                        March 14, 2023
                      </td>
                      <td>
                        <div className="badge rounded-pill bg-success">
                          completed
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="card padding30 rounded-5 mb25">
                <h4>Cancelled Orders</h4>
                <table className="table de-table">
                  <thead>
                    <tr>
                      <th scope="col">
                        <span className="fs-12 text-gray">Order ID</span>
                      </th>
                      <th scope="col">
                        <span className="fs-12 text-gray">Car Name</span>
                      </th>
                      <th scope="col">
                        <span className="fs-12 text-gray">
                          Pick Up Location
                        </span>
                      </th>
                      <th scope="col">
                        <span className="fs-12 text-gray">
                          Drop Off Location
                        </span>
                      </th>
                      <th scope="col">
                        <span className="fs-12 text-gray">Pick Up Date</span>
                      </th>
                      <th scope="col">
                        <span className="fs-12 text-gray">Return Date</span>
                      </th>
                      <th scope="col">
                        <span className="fs-12 text-gray">Status</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <span className="d-lg-none d-sm-block">Order ID</span>
                        <div className="badge bg-gray-100 text-dark">
                          #01263
                        </div>
                      </td>
                      <td>
                        <span className="d-lg-none d-sm-block">Car Name</span>
                        <span className="bold">Mini Cooper</span>
                      </td>
                      <td>
                        <span className="d-lg-none d-sm-block">
                          Pick Up Location
                        </span>
                        San Fransisco
                      </td>
                      <td>
                        <span className="d-lg-none d-sm-block">
                          Drop Off Location
                        </span>
                        Chicago
                      </td>
                      <td>
                        <span className="d-lg-none d-sm-block">
                          Pick Up Date
                        </span>
                        March 8, 2023
                      </td>
                      <td>
                        <span className="d-lg-none d-sm-block">
                          Return Date
                        </span>
                        March 12, 2023
                      </td>
                      <td>
                        <div className="badge rounded-pill bg-danger">
                          cancelled
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span className="d-lg-none d-sm-block">Order ID</span>
                        <div className="badge bg-gray-100 text-dark">
                          #01263
                        </div>
                      </td>
                      <td>
                        <span className="d-lg-none d-sm-block">Car Name</span>
                        <span className="bold">Ford Raptor</span>
                      </td>
                      <td>
                        <span className="d-lg-none d-sm-block">
                          Pick Up Location
                        </span>
                        Georgia
                      </td>
                      <td>
                        <span className="d-lg-none d-sm-block">
                          Drop Off Location
                        </span>
                        Lousiana
                      </td>
                      <td>
                        <span className="d-lg-none d-sm-block">
                          Pick Up Date
                        </span>
                        March 8, 2023
                      </td>
                      <td>
                        <span className="d-lg-none d-sm-block">
                          Return Date
                        </span>
                        March 13, 2023
                      </td>
                      <td>
                        <div className="badge rounded-pill bg-danger">
                          cancelled
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AccountBooking;
