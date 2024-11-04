import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import CarForm from "./carForm";

const CarDialog = ({
  open,
  handleClose,
  carDetails,
  setCarDetails,
  errors,
  validateField,
  handleImageChange,
  handleCreate,
}) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Tạo Mới Car</DialogTitle>
      <DialogContent>
        <CarForm
          carDetails={carDetails}
          setCarDetails={setCarDetails}
          errors={errors}
          validateField={validateField}
          handleImageChange={handleImageChange}
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          sx={{ backgroundColor: "gray", color: "white" }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleCreate}
          sx={{ backgroundColor: "green", color: "white" }}
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CarDialog;
