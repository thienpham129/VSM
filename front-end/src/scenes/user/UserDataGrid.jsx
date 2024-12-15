import { DataGrid, GridToolbar } from "@mui/x-data-grid";

const UserDataGrid = ({ rows, columns, onBanUnban }) => {
  return (
    <DataGrid
      rows={rows}
      columns={columns}
      components={{ Toolbar: GridToolbar }}
      onCellClick={onBanUnban}
    />
  );
};

export default UserDataGrid;