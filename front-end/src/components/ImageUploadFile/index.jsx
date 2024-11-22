import { root } from "helper/axiosClient";
import React, { useState } from "react";
import { getTokenFromLocalStorage } from "utils/tokenUtils";

const ImageUploadFile = () => {
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null); // Để hiển thị hình ảnh trước khi upload

  const getFile = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setFilePreview(URL.createObjectURL(selectedFile)); // Tạo URL tạm thời cho ảnh để hiển thị
  };

  const handleUpdateImage = async () => {
    if (!file) {
      alert("Vui lòng chọn ảnh để tải lên.");
      return;
    }

    const token = getTokenFromLocalStorage();
    const formData = new FormData();
    formData.append("urlImage", file); // Đưa tệp vào FormData dưới trường "urlImage"

    try {
      const response = await root.post(`/user/update-my-info`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        alert("Cập nhật ảnh đại diện thành công!");
        console.log('««««« response »»»»»', response.data);
      }
    } catch (error) {
      console.log("Lỗi khi cập nhật ảnh đại diện:", error);
      alert("Có lỗi xảy ra khi cập nhật ảnh đại diện.");
    }
  };

  return (
    <div>
      <input type="file" onChange={getFile} />
      {filePreview && <img src={filePreview} alt="Preview" style={{ width: "100px", height: "100px" }} />}
      <button className="image-upload-button" onClick={handleUpdateImage}>
        Upload
      </button>
    </div>
  );
};

export default ImageUploadFile;
