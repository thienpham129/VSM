import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import Header from "../../components/Header";
import axios from "axios";

const Team = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/admin/types", {
          headers: {
            Authorization:
              "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyIiwiYSI6WyJST0xFX0FETUlOIl0sImUiOiJ0ZXN0QGdtYWlsLmNvbSIsImV4cCI6MTczMDU1NTU3Nn0.c7_V9KRERHKZ-7PRyyVGUhLEzeE6_0S8hwNzbYfr80I",
          },
        });
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
