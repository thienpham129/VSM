import { request } from "admin/helpers/axios_helper";

// Lấy danh sách bãi đỗ xe
export const getParkings = async () => {
  try {
    const response = await request("GET", "/admin/parkings");
    // Định dạng lại dữ liệu nếu cần
    return response.data.map((parking) => ({
      id: parking.id,
      name: parking.name,
      location: parking.location,
      capacity: parking.capacity,
      numCar: parking.numCar,
      empty: parking.empty,
    }));
  } catch (error) {
    console.error("Error fetching parking lots:", error);
    throw error; // Ném lại lỗi để xử lý ở component
  }
};

// Tạo mới một bãi đỗ xe
export const createParking = async (data) => {
  try {
    const response = await request("POST", "/admin/parking", {
      name: data.name,
      location: data.location,
      capacity: data.capacity,
    });
    return {
      id: response.data.id, // Giả định API trả về id
      name: response.data.name,
      location: response.data.location,
      capacity: response.data.capacity,
      numCar: 0, // Mặc định
      empty: response.data.capacity > 0, // Giả định nếu capacity > 0 thì empty
    };
  } catch (error) {
    console.error("Error creating parking lot:", error);
    throw error; // Ném lại lỗi để xử lý ở component
  }
};

// Cập nhật một bãi đỗ xe
export const updateParking = async (id, data) => {
  try {
    const response = await request("PUT", `/admin/parking/${id}`, {
      name: data.name,
      location: data.location,
      capacity: data.capacity,
    });
    return {
      id: response.data.id, // Giả định API trả về id
      name: response.data.name,
      location: response.data.location,
      capacity: response.data.capacity,
      numCar: response.data.numCar, // Cập nhật theo dữ liệu trả về
      empty: response.data.capacity > response.data.numCar, // Giả định trạng thái empty
    };
  } catch (error) {
    console.error("Error updating parking lot:", error);
    throw error; // Ném lại lỗi để xử lý ở component
  }
};

// Xóa một bãi đỗ xe
export const deleteParking = async (id) => {
  try {
    await request("DELETE", `/admin/parking/${id}`);
  } catch (error) {
    console.error("Error deleting parking lot:", error);
    throw error; // Ném lại lỗi để xử lý ở component
  }
};
