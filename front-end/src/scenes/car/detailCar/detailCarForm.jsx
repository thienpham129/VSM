import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useEffect, useState } from "react";

const DetailCarForm = ({ initialValues, handleFormSubmit }) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [imagePreviews, setImagePreviews] = useState([]);

  // Xác thực các trường nhập liệu
  const checkoutSchema = yup.object().shape({
    name: yup.string().required("Tên xe là bắt buộc"),
    plateNumber: yup.string().required("Biển số xe là bắt buộc"),
    color: yup.string().required("Màu xe là bắt buộc"),
    manufactory: yup.string().required("Nhà sản xuất là bắt buộc"),
    yearOfManufacture: yup
      .number()
      .required("Năm sản xuất là bắt buộc")
      .integer("Năm phải là số nguyên"),
    dayMaintenance: yup.string().required("Ngày bảo trì là bắt buộc"),
    numSeat: yup
      .number()
      .required("Số ghế là bắt buộc")
      .integer("Số ghế phải là số nguyên"),
    price: yup
      .number()
      .required("Giá xe là bắt buộc")
      .positive("Giá phải là số dương"),
    parking: yup.string().nullable(),
    images: yup
      .array()
      .of(
        yup.object().shape({
          imageUrl: yup
            .string()
            .url("Đường dẫn ảnh không hợp lệ")
            .required("Ảnh là bắt buộc"),
        })
      )
      .required("Cần có ít nhất một ảnh"),
  });

  // Khởi tạo các hình ảnh từ initialValues
  useEffect(() => {
    const initialImagePreviews = initialValues.images.map(
      (image) => image.imageUrl
    );
    setImagePreviews(initialImagePreviews);
  }, [initialValues.images]);

  const handleImageChange = (event, index) => {
    const file = event.currentTarget.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Cập nhật giá trị hình ảnh và trạng thái hình ảnh xem trước
        setImagePreviews((prev) => {
          const newPreviews = [...prev];
          newPreviews[index] = reader.result; // Cập nhật hình ảnh xem trước tương ứng
          return newPreviews;
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={initialValues}
      validationSchema={checkoutSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(2, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 2" },
            }}
          >
            <TextField
              fullWidth
              variant="filled"
              label="ID Xe"
              value={initialValues.carId}
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField
              fullWidth
              variant="filled"
              label="Tên Xe"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.name}
              name="name"
              error={!!touched.name && !!errors.name}
              helperText={touched.name && errors.name}
            />
            <TextField
              fullWidth
              variant="filled"
              label="Biển Số Xe"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.plateNumber}
              name="plateNumber"
              error={!!touched.plateNumber && !!errors.plateNumber}
              helperText={touched.plateNumber && errors.plateNumber}
            />
            <TextField
              fullWidth
              variant="filled"
              label="Màu Xe"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.color}
              name="color"
              error={!!touched.color && !!errors.color}
              helperText={touched.color && errors.color}
            />
            <TextField
              fullWidth
              variant="filled"
              label="Nhà Sản Xuất"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.manufactory}
              name="manufactory"
              error={!!touched.manufactory && !!errors.manufactory}
              helperText={touched.manufactory && errors.manufactory}
            />
            <TextField
              fullWidth
              variant="filled"
              label="Năm Sản Xuất"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.yearOfManufacture}
              name="yearOfManufacture"
              error={!!touched.yearOfManufacture && !!errors.yearOfManufacture}
              helperText={touched.yearOfManufacture && errors.yearOfManufacture}
            />
            <TextField
              fullWidth
              variant="filled"
              label="Ngày Bảo Trì"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.dayMaintenance}
              name="dayMaintenance"
              error={!!touched.dayMaintenance && !!errors.dayMaintenance}
              helperText={touched.dayMaintenance && errors.dayMaintenance}
            />
            <TextField
              fullWidth
              variant="filled"
              label="Số Ghế"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.numSeat}
              name="numSeat"
              error={!!touched.numSeat && !!errors.numSeat}
              helperText={touched.numSeat && errors.numSeat}
            />
            <TextField
              fullWidth
              variant="filled"
              label="Giá Xe"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.price}
              name="price"
              error={!!touched.price && !!errors.price}
              helperText={touched.price && errors.price}
            />
            <TextField
              fullWidth
              variant="filled"
              label="Thông Tin Bãi Đỗ"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.parking}
              name="parking"
              error={!!touched.parking && !!errors.parking}
              helperText={touched.parking && errors.parking}
            />
          </Box>

          {/* Thêm Hình Ảnh */}
          <TextField
            margin="dense"
            name="image1"
            label="Thêm Hình Ảnh 1"
            type="file"
            fullWidth
            variant="outlined"
            onChange={(event) => handleImageChange(event, 0)} // Gọi hàm với chỉ số 0 cho hình ảnh 1
            inputProps={{ accept: "image/*" }}
            error={!!errors.image1}
            helperText={errors.image1}
          />
          <TextField
            margin="dense"
            name="image2"
            label="Thêm Hình Ảnh 2"
            type="file"
            fullWidth
            variant="outlined"
            onChange={(event) => handleImageChange(event, 1)} // Gọi hàm với chỉ số 1 cho hình ảnh 2
            inputProps={{ accept: "image/*" }}
            error={!!errors.image2}
            helperText={errors.image2}
          />

          {/* Hiển thị hình ảnh đã chọn */}
          <Box
            display="grid"
            gridTemplateColumns="repeat(2, 1fr)"
            gap="10px"
            mt="20px"
          >
            {imagePreviews.map(
              (imageSrc, index) =>
                imageSrc && (
                  <Box key={index} display="flex" justifyContent="center">
                    <img
                      src={imageSrc}
                      alt={`Hình ảnh ${index + 1}`}
                      style={{
                        width: "100%",
                        height: "auto",
                        objectFit: "cover",
                      }}
                    />
                  </Box>
                )
            )}
          </Box>

          <Box display="flex" justifyContent="end" mt="20px">
            <Button type="submit" color="secondary" variant="contained">
              Cập Nhật Thông Tin
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default DetailCarForm;
