import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const ParkingLotDialog = ({ open, onClose, parkingLot, onConfirm }) => {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Nhập tên bãi đỗ xe."),
    location: Yup.string().required("Nhập địa điểm bãi đỗ xe."),
    capacity: Yup.number()
      .required("Nhập sức chứa của bãi đỗ xe.")
      .positive("Sức chứa bãi đỗ phải lớn hơn 0.")
      .integer("Sức chứa bãi đỗ phải lớn hơn 0."),
  });

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>
        {parkingLot.id ? "Cập Nhập Bãi Đỗ Xe" : "Tạo Mới Bãi Đỗ Xe"}
      </DialogTitle>
      <DialogContent>
        <Formik
          initialValues={parkingLot}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            onConfirm(values);
          }}
        >
          {({ handleChange, handleBlur, errors, touched }) => (
            <Form>
              <Field
                as={TextField}
                name="name"
                label="Tên Bãi Đỗ"
                fullWidth
                margin="dense"
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.name && !!errors.name}
                helperText={touched.name && errors.name}
              />

              <Field
                as={TextField}
                name="location"
                label="Địa Điểm"
                fullWidth
                margin="dense"
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.location && !!errors.location}
                helperText={touched.location && errors.location}
              />

              <Field
                as={TextField}
                name="capacity"
                label="Sức Chứa"
                type="number"
                fullWidth
                margin="dense"
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.capacity && !!errors.capacity}
                helperText={touched.capacity && errors.capacity}
              />

              <DialogActions>
                <Button
                  onClick={onClose}
                  sx={{
                    backgroundColor: "gray",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "darkgray",
                    },
                  }}
                >
                  Hủy
                </Button>
                <Button
                  type="submit"
                  sx={{
                    backgroundColor: "green",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "darkgreen",
                    },
                  }}
                >
                  {parkingLot.id ? "Cập nhập" : "Tạo mới"}
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default ParkingLotDialog;