// DetailCarHeader.jsx
import { Typography } from "@mui/material";
import Header from "../../../components/Header";
import { useNavigate } from "react-router-dom";

const DetailCarHeader = () => {
  const navigate = useNavigate();

  return (
    <Header
      title="Thông Tin Chi Tiết Xe"
      subtitle={
        <Typography>
          <span
            style={{ color: "blue", cursor: "pointer", fontSize: "18px" }}
            onClick={() => navigate("/admin/car")}
          >
            Danh Sách Xe
          </span>
          <span style={{ fontSize: "18px" }}> / Chi Tiết Xe</span>
        </Typography>
      }
    />
  );
};

export default DetailCarHeader;
