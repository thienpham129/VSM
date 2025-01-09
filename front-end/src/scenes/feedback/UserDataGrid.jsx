import { DataGrid, GridToolbar } from "@mui/x-data-grid";

const UserDataGrid = ({ rows, columns }) => {
  return (
    <DataGrid
      rows={rows}
      columns={columns}
      components={{ Toolbar: GridToolbar }}
    />
  );
};

export default UserDataGrid;