import React, { useEffect, useState } from "react";
import NavBarProfile from "components/NavBarProfile";
import { getTokenFromLocalStorage } from "utils/tokenUtils";
import { root } from "helper/axiosClient";
import ReactPaginate from "react-paginate";
import { Modal, Button } from "react-bootstrap";

const AccountBooking = () => {
  const [tickets, setTickets] = useState([]);
  const [currentPage, setCurrentPage] = useState(0); // Trang hiện tại
  const ticketsPerPage = 5; // Số vé tối đa mỗi trang

  const [selectedTicket, setSelectedTicket] = useState(null); // Lưu trữ thông tin vé được chọn
  const [showModal, setShowModal] = useState(false); // Quản lý trạng thái modal

  useEffect(() => {
    getAllTicketOfUser();
  }, []);

  const getAllTicketOfUser = async () => {
    const token = getTokenFromLocalStorage();
    try {
      const response = await root.get(`/user/view-my-ticket`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("««««« response »»»»»", response.data);
      setTickets(response.data);
    } catch (error) {
      console.error("Error fetching tickets:", error);
    }
  };

  const handleViewDetails = (ticket) => {
    setSelectedTicket(ticket);
    setShowModal(true);
    console.log("««««« ticket »»»»»", ticket);
  };

  const closeModal = () => {
    setShowModal(false); // Ẩn modal
    setSelectedTicket(null);
  };

  /// Tính toán vé hiển thị
  const indexOfLastTicket = (currentPage + 1) * ticketsPerPage;
  const indexOfFirstTicket = indexOfLastTicket - ticketsPerPage;
  const currentTickets = tickets.slice(indexOfFirstTicket, indexOfLastTicket);

  // Hàm xử lý thay đổi trang
  const handlePageClick = (data) => {
    const selectedPage = data.selected;
    setCurrentPage(selectedPage);
  };


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
                <h1>Lịch sử đặt vé</h1>
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
                <h4>Lịch sử đặt vé</h4>
                {currentTickets.length > 0 ? (
                  <>
                    <table className="table de-table">
                      <thead>
                        <tr>
                          <th scope="col">
                            <span className="fs-12 text-gray">ID Vé</span>
                          </th>
                          <th scope="col">
                            <span className="fs-12 text-gray">TÊN XE</span>
                          </th>
                          <th scope="col">
                            <span className="fs-12 text-gray">Loại xe</span>
                          </th>
                          <th scope="col">
                            <span className="fs-12 text-gray">TUYẾN ĐƯỜNG</span>
                          </th>
                          <th scope="col">
                            <span className="fs-12 text-gray">
                              NGÀY KHỞI HÀNH
                            </span>
                          </th>
                          <th scope="col">
                            <span className="fs-12 text-gray">
                              GIỜ XUẤT PHÁT
                            </span>
                          </th>

                          <th scope="col">
                            <span className="fs-12 text-gray">TRẠNG THÁI</span>
                          </th>

                          <th scope="col">
                            <span className="fs-12 text-gray"></span>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentTickets.map((ticket) => (
                          <tr key={ticket.ticketId}>
                            <td>
                              <span className="d-lg-none d-sm-block">
                                ID VÉ
                              </span>
                              <div className="badge bg-gray-100 text-dark">
                                #{ticket.ticketId}
                              </div>
                            </td>
                            <td>
                              <span className="d-lg-none d-sm-block">
                                TÊN XE
                              </span>
                              <span className="bold">
                                {ticket.schedules?.car?.name ||
                                  "Không có dữ liệu"}
                              </span>
                            </td>
                            <td>
                              <span className="d-lg-none d-sm-block">
                                Loại xe
                              </span>
                              {ticket.schedules?.car?.type?.numSeat ||
                                "Không có dữ liệu"}{" "}
                              chỗ
                            </td>
                            <td>
                              <span className="d-lg-none d-sm-block">
                                TUYẾN ĐƯỜNG
                              </span>
                              {ticket.startLocation} - {ticket.stopLocation}
                            </td>
                            <td>
                              <span className="d-lg-none d-sm-block">
                                NGÀY KHỞI HÀNH
                              </span>
                              {new Date(ticket.startTime).toLocaleDateString(
                                "vi-VN"
                              )}
                            </td>
                            <td>
                              <span className="d-lg-none d-sm-block">
                                GIỜ XUẤT PHÁT
                              </span>
                              {new Date(ticket.startTime).toLocaleTimeString(
                                "vi-VN"
                              )}
                            </td>

                            <td>
                              {ticket.paid ? (
                                <div className="badge rounded-pill bg-success" style={{padding: '9px', fontSize : '13px'}}>
                                  Đã thanh toán
                                </div>
                              ) : (
                                <div className="badge rounded-pill bg-danger" style={{padding: '8px', fontSize : '11px'}}>
                                  Chưa thanh toán
                                </div>
                              )}
                            </td>
                            <td>
                              {/* <div className="badge bg-gray-100 detail_ticket">
                                Xem chi tiết vé
                              </div> */}
                              <button
                                className="badge bg-gray-100 detail_ticket"
                                onClick={() => handleViewDetails(ticket)}
                                style={{ border: "none" }}
                              >
                                Xem chi tiết vé
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    <ReactPaginate
                      breakLabel={"..."}
                      nextLabel=">"
                      previousLabel="<"
                      pageCount={Math.ceil(tickets.length / ticketsPerPage)} // Tổng số trang
                      marginPagesDisplayed={2}
                      pageRangeDisplayed={5}
                      onPageChange={handlePageClick} // Hàm xử lý khi chuyển trang
                      containerClassName={"pagination"}
                      activeClassName={"active"}
                    />
                  </>
                ) : (
                  <p>No tickets found.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Modal hiển thị chi tiết vé */}
      <Modal
        show={showModal}
        onHide={closeModal}
        centered // Vertically centered
        size="lg" // Tùy chỉnh kích thước modal
      >
        <Modal.Header closeButton>
          <Modal.Title>Chi tiết vé đã đặt</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedTicket && (
            <div className="row">
              <p className="col-md-4 form-group">
                <strong>Họ và tên:</strong>
              </p>
              <div className="col-md-8 form-group ">
                {selectedTicket.fullName || "Không có dữ liệu"}
              </div>
              <p className="col-md-4 form-group">
                <strong>Số điện thoại:</strong>{" "}
              </p>
              <div className="col-md-8 form-group">
                {selectedTicket.phoneNumber || "Không có dữ liệu"}
              </div>
              <p className="col-md-4 form-group">
                <strong>Email:</strong>
              </p>
              <div className="col-md-8 form-group ">
                {selectedTicket.email || "Không có dữ liệu"}
              </div>
              <p className="col-md-4 form-group">
                <strong>Ghi chú:</strong>{" "}
              </p>
              <div className="col-md-8 form-group ">
                {selectedTicket.note || "Không có dữ liệu"}
              </div>
              <p className="col-md-4 form-group">
                <strong>Địa chỉ điểm đi:</strong>{" "}
              </p>
              <div className="col-md-8 form-group ">
                {selectedTicket.detailAddressToPickUp || "Không có dữ liệu"}
              </div>
              <p className="col-md-4 form-group">
                <strong>Địa chỉ điểm đến:</strong>{" "}
              </p>
              <div className="col-md-8 form-group ">
                {selectedTicket.detailAddressDropOff || "Không có dữ liệu"}
              </div>
              <p className="col-md-4 form-group">
                <strong>Ghế đã chọn:</strong>{" "}
              </p>
              <div className="col-md-8 form-group ">
                {selectedTicket.selectedSeat.join(", ")}
              </div>
              <p className="col-md-4 form-group">
                <strong>Tổng tiền:</strong>{" "}
              </p>
              <div className="col-md-8 form-group ">
                {selectedTicket.totalPrice.toLocaleString("vi-VN")} VNĐ
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AccountBooking;
