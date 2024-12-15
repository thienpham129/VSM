import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import Header from "../../components/Header";
import { request } from "admin/helpers/axios_helper";

const Team = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Sử dụng request thay vì axios.get
        const response = await request("get", "/admin/types");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Box m="20px">
      <Header title="TEAM" subtitle="Managing the Team Members" />
      {data ? <div>{JSON.stringify(data)}</div> : <p>Loading data...</p>}
    </Box>
  );
};

export default Team;
