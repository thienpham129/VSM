import {
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  FormHelperText,
} from "@mui/material";

import { mockDataType } from "../../admin/data/mockData";

const CarForm = ({
  carDetails,
  setCarDetails,
  errors,
  validateField,
  handleImageChange,
}) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCarDetails({ ...carDetails, [name]: value });
    validateField(name, value);
  };

  return (
    <>
      <TextField
        autoFocus
        margin="dense"
        name="name"
        label="Name"
        type="text"
        fullWidth
        variant="outlined"
        value={carDetails.name}
        onChange={handleInputChange}
        error={!!errors.name}
        helperText={errors.name}
      />
      <TextField
        margin="dense"
        name="plateNumber"
        label="Plate Number"
        type="text"
        fullWidth
        variant="outlined"
        value={carDetails.plateNumber}
        onChange={handleInputChange}
        error={!!errors.plateNumber}
        helperText={errors.plateNumber}
      />
      <TextField
        margin="dense"
        name="yearOfManufacture"
        label="Year of Manufacture"
        type="number"
        fullWidth
        variant="outlined"
        value={carDetails.yearOfManufacture}
        onChange={handleInputChange}
        error={!!errors.yearOfManufacture}
        helperText={errors.yearOfManufacture}
      />
      <TextField
        margin="dense"
        name="color"
        label="Color"
        type="text"
        fullWidth
        variant="outlined"
        value={carDetails.color}
        onChange={handleInputChange}
        error={!!errors.color}
        helperText={errors.color}
      />
      <TextField
        margin="dense"
        name="manufactory"
        label="Manufactory"
        type="text"
        fullWidth
        variant="outlined"
        value={carDetails.manufactory}
        onChange={handleInputChange}
        error={!!errors.manufactory}
        helperText={errors.manufactory}
      />
      <FormControl fullWidth margin="dense" error={!!errors.price}>
        <InputLabel id="price-label">Price</InputLabel>
        <Select
          labelId="price-label"
          value={carDetails.price}
          onChange={(event) => {
            const value = event.target.value;
            setCarDetails({ ...carDetails, price: value });
            validateField("price", value);
          }}
          label="Price"
        >
          {mockDataType.map((type) => (
            <MenuItem key={type.id} value={type.price}>
              {`$${type.price.toLocaleString()}`}{" "}
            </MenuItem>
          ))}
        </Select>
        {errors.price && <FormHelperText>{errors.price}</FormHelperText>}
      </FormControl>
      <TextField
        margin="dense"
        name="image1"
        label="Upload Image Car 1"
        type="file"
        fullWidth
        variant="outlined"
        onChange={handleImageChange}
        inputProps={{ accept: "image/*" }}
        error={!!errors.image1}
        helperText={errors.image1}
      />
      <TextField
        margin="dense"
        name="image2"
        label="Upload Image Car 2"
        type="file"
        fullWidth
        variant="outlined"
        onChange={handleImageChange}
        inputProps={{ accept: "image/*" }}
        error={!!errors.image2}
        helperText={errors.image2}
      />
    </>
  );
};

export default CarForm;
