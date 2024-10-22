import React from "react";

const Footer = () => {
  return (
      <footer className="text-light">
        <div className="container">
          <div className="row g-custom-x">
            <div className="col-lg-3">
              <div className="widget">
                <h5>About Rentaly</h5>
                <p>
                  Where quality meets affordability. We understand the
                  importance of a smooth and enjoyable journey without the
                  burden of excessive costs. That's why we have meticulously
                  crafted our offerings to provide you with top-notch vehicles
                  at minimum expense.
                </p>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="widget">
                <h5>Contact Info</h5>
                <address className="s1">
                  <span>
                    <i className="id-color fa fa-map-marker fa-lg" />
                    08 W 36th St, New York, NY 10001
                  </span>
                  <span>
                    <i className="id-color fa fa-phone fa-lg" />
                    +1 333 9296
                  </span>
                  <span>
                    <i className="id-color fa fa-envelope-o fa-lg" />
                    <a href="mailto:contact@example.com">contact@example.com</a>
                  </span>
                  <span>
                    <i className="id-color fa fa-file-pdf-o fa-lg" />
                    <a href="#">Download Brochure</a>
                  </span>
                </address>
              </div>
            </div>
            <div className="col-lg-3">
              <h5>Quick Links</h5>
              <div className="row">
                <div className="col-lg-6">
                  <div className="widget">
                    <ul>
                      <li>
                        <a href="#">About</a>
                      </li>
                      <li>
                        <a href="#">Blog</a>
                      </li>
                      <li>
                        <a href="#">Careers</a>
                      </li>
                      <li>
                        <a href="#">News</a>
                      </li>
                      <li>
                        <a href="#">Partners</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="widget">
                <h5>Social Network</h5>
                <div className="social-icons">
                  <a href="#">
                    <i className="fa fa-facebook fa-lg" />
                  </a>
                  <a href="#">
                    <i className="fa fa-twitter fa-lg" />
                  </a>
                  <a href="#">
                    <i className="fa fa-linkedin fa-lg" />
                  </a>
                  <a href="#">
                    <i className="fa fa-pinterest fa-lg" />
                  </a>
                  <a href="#">
                    <i className="fa fa-rss fa-lg" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="subfooter">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="de-flex">
                  <div className="de-flex-col">
                    <a href="/home">
                      Copyright 2024 - Rentaly by Designesia
                    </a>
                  </div>
                  <ul className="menu-simple">
                    <li>
                      <a href="#">Terms &amp; Conditions</a>
                    </li>
                    <li>
                      <a href="#">Privacy Policy</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
  );
};

export default Footer;
