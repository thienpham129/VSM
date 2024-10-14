import NavBarProfile from "components/NavBarProfile";
import React from "react";

const Voucher = () => {
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
              <NavBarProfile />
            </div>
            <div className="col-lg-9">
              <div className="card padding30 rounded-5 mb25">
                <h4>Vouchers</h4>
                <table className="table de-table">
                  <thead>
                    <tr>
                      <th scope="col">
                        <span className="fs-12 text-gray">Voucher ID</span>
                      </th>
                      <th scope="col">
                        <span className="fs-12 text-gray">Code</span>
                      </th>
                      <th scope="col">
                        <span className="fs-12 text-gray">Discount</span>
                      </th>
                      <th scope="col">
                        <span className="fs-12 text-gray">Expired Date</span>
                      </th>
                      <th scope="col">
                        <span className="fs-12 text-gray">IsValid</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <div className="badge bg-gray-100 text-dark">
                          #01245
                        </div>
                      </td>
                      <td>
                        <span className="bold">Ferrari Enzo</span>
                      </td>

                      <td>
                        10%
                      </td>
                      <td>
                        
                        March 16, 2023
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
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Voucher;
