import { DataGrid, GridToolbar } from "@mui/x-data-grid";

const CarTable = ({ rows, columns }) => {
  return (
    <DataGrid
      rows={rows}
      columns={columns}
      components={{ Toolbar: GridToolbar }}
    />
  );
};

export default CarTable;
