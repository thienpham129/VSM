import { tokens } from "../../theme";

export const mockDataSchedules = [
  {
    id: 1,
    startTime: "2024-12-01T11:00:00",
    endTime: "2024-12-01T12:00:00",
    status: "Đã lên lịch",
    account: {
      id: 2,
      urlImage: null,
      email: "driver@gmail.com",
      role: "ROLE_DRIVER",
      firstName: "Nguyễn ",
      lastName: "Nhật",
      dob: "2002-09-09",
      address: "77 Đào Trí, Hòa Cường Nam, Hải Châu, Đà Nẵng",
      phoneNumber: "0936152782",
      verificationCode: null,
      verificationCodeExpiresAt: "2024-11-09T22:02:27.80448",
      createDate: "2024-11-09T21:47:27.80448",
      enabled: true,
      gender: null,
      imgDriverLisence1:
        "http://localhost:8080/assets/imagesUploads/fNHFGas8-driverLisence1.jpg",
      imgDriverLisence2:
        "http://localhost:8080/assets/imagesUploads/jcHi1lq5-driverLisence1.jpg",
      tickets: [],
      available: true,
    },
    car: {
      carId: 2,
      name: "Xe 20",
      plateNumber: "123123",
      color: "vàng",
      manufactory: "đức",
      yearOfManufacture: 2002,
      dayMaintenance: "2024-11-10",
      startLocation: null,
      stopLocation: null,
      startDate: null,
      type: {
        typeId: 1,
        numSeat: 10,
        price: 150002,
      },
      parking: null,
      images: [
        {
          imageId: 3,
          imageUrl:
            "http://localhost:8080/assets/imagesUploads/0yvdGbNS-IMG_4479.JPG",
        },
        {
          imageId: 4,
          imageUrl:
            "http://localhost:8080/assets/imagesUploads/akIbXxhr-IMG_4479.JPG",
        },
      ],
    },
  },
  {
    id: 2,
    startTime: "2024-12-01T10:00:00",
    endTime: "2024-12-01T12:00:00",
    status: "Đã lên lịch",
    account: {
      id: 2,
      urlImage: null,
      email: "driver@gmail.com",
      role: "ROLE_DRIVER",
      firstName: "Nguyễn ",
      lastName: "Nhật",
      dob: "2002-09-09",
      address: "77 Đào Trí, Hòa Cường Nam, Hải Châu, Đà Nẵng",
      phoneNumber: "0936152782",
      verificationCode: null,
      verificationCodeExpiresAt: "2024-11-09T22:02:27.80448",
      createDate: "2024-11-09T21:47:27.80448",
      enabled: true,
      gender: null,
      imgDriverLisence1:
        "http://localhost:8080/assets/imagesUploads/fNHFGas8-driverLisence1.jpg",
      imgDriverLisence2:
        "http://localhost:8080/assets/imagesUploads/jcHi1lq5-driverLisence1.jpg",
      tickets: [],
      available: true,
    },
    car: {
      carId: 2,
      name: "Xe 20",
      plateNumber: "123123",
      color: "vàng",
      manufactory: "đức",
      yearOfManufacture: 2002,
      dayMaintenance: "2024-11-10",
      startLocation: null,
      stopLocation: null,
      startDate: null,
      type: {
        typeId: 1,
        numSeat: 10,
        price: 150002,
      },
      parking: null,
      images: [
        {
          imageId: 3,
          imageUrl:
            "http://localhost:8080/assets/imagesUploads/0yvdGbNS-IMG_4479.JPG",
        },
        {
          imageId: 4,
          imageUrl:
            "http://localhost:8080/assets/imagesUploads/akIbXxhr-IMG_4479.JPG",
        },
      ],
    },
  },
];
export const mockDataDetailDriver = [
  {
    id: 1,
    address: "123 Main St",
    create_date: "2024-01-01",
    day_of_birth: "1990-01-01",
    email: "driver1@example.com",
    enabled: true,
    first_name: "John",
    last_name: "Doe",
    password: "password123",
    role: "ROLE_DRIVER",
    verification_code: "123456",
    verification_expiration: "2024-01-01T00:00:00Z",
    img_driver_license1: "/images/driverLisence/bentley.png",
    img_driver_license2: "/images/driverLisence/bentley.png",
    phone_number: "0123456789",
    is_available: true,
  },
];
export const mockDataAccount = [
  {
    id: 1,
    address: "123 Main St",
    create_date: "2024-01-01",
    day_of_birth: "1990-01-01",
    email: "driver1@example.com",
    enabled: true,
    first_name: "John",
    last_name: "Doe",
    password: "password123",
    role: "ROLE_DRIVER",
    verification_code: "123456",
    verification_expiration: "2024-01-01T00:00:00Z",
    img_driver_license1: "path/to/license1.jpg",
    img_driver_license2: "path/to/license2.jpg",
    phone_number: "0123456789",
    is_available: true, // Trường mới được thêm vào
  },
  {
    id: 2,
    address: "456 Elm St",
    create_date: "2024-01-02",
    day_of_birth: "1985-05-05",
    email: "driver2@example.com",
    enabled: true,
    first_name: "Jane",
    last_name: "Smith",
    password: "password456",
    role: "ROLE_DRIVER",
    verification_code: "654321",
    verification_expiration: "2024-01-02T00:00:00Z",
    img_driver_license1: "images/driverLisence/bentley.png",
    img_driver_license2: "images/driverLisence/bentley.png",
    phone_number: "0987654321",
    is_available: true, // Trường mới được thêm vào
  },
  {
    id: 3,
    address: "789 Maple Ave",
    create_date: "2024-01-03",
    day_of_birth: "1992-09-09",
    email: "driver3@example.com",
    enabled: true,
    first_name: "Emily",
    last_name: "Johnson",
    password: "password789",
    role: "ROLE_DRIVER",
    verification_code: "789012",
    verification_expiration: "2024-01-03T00:00:00Z",
    img_driver_license1: "images/driverLisence/bentley.png",
    img_driver_license2: "images/driverLisence/bentley.png",
    phone_number: "0234567890",
    is_available: false, // Trường mới được thêm vào
  },
  {
    id: 4,
    address: "321 Oak St",
    create_date: "2024-01-04",
    day_of_birth: "1988-11-11",
    email: "driver4@example.com",
    enabled: true,
    first_name: "Michael",
    last_name: "Williams",
    password: "password101",
    role: "ROLE_USER", // Ví dụ với role khác
    verification_code: "321654",
    verification_expiration: "2024-01-04T00:00:00Z",
    img_driver_license1: "path/to/license7.jpg",
    img_driver_license2: "path/to/license8.jpg",
    phone_number: "0345678901",
    is_available: true, // Trường mới được thêm vào
  },
];

export const mockDataUser = [
  {
    id: 1,
    urlImage: "",
    numBooking: 2,
    gender: "Female",
    account: {
      id: 1,
      email: "user1@example.com",
      role: "ROLE_USER",
      firstName: "Jane",
      lastName: "Doe",
      dob: "1990-01-15",
      address: "123 Elm St, Springfield",
      verificationCode: "123456",
      verificationCodeExpiresAt: "2024-11-01T12:00:00",
      createDate: "2024-10-01T09:00:00",
      enabled: true,
    },
    ticketEntities: [],
  },
  {
    id: 2,
    urlImage: "",
    numBooking: 0,
    gender: "Male",
    account: {
      id: 2,
      email: "nguyendinhnhat0909@gmail.com",
      role: "ROLE_USER",
      firstName: "Nguyễn",
      lastName: "Nhật",
      dob: null,
      address: null,
      verificationCode: "484622",
      verificationCodeExpiresAt: "2024-10-26T19:41:39.423116",
      createDate: "2024-10-26T18:40:59.264676",
      enabled: false,
    },
    ticketEntities: [],
  },
  {
    id: 3,
    urlImage: "",
    numBooking: 5,
    gender: "Male",
    account: {
      id: 3,
      email: "user3@example.com",
      role: "ROLE_USER",
      firstName: "John",
      lastName: "Smith",
      dob: "1985-05-20",
      address: "456 Oak Ave, Metropolis",
      verificationCode: "789012",
      verificationCodeExpiresAt: "2024-11-02T12:00:00",
      createDate: "2024-10-02T10:00:00",
      enabled: true,
    },
    ticketEntities: [],
  },
  {
    id: 4,
    urlImage: "",
    numBooking: 3,
    gender: "Female",
    account: {
      id: 4,
      email: "user4@example.com",
      role: "ROLE_USER",
      firstName: "Anna",
      lastName: "Brown",
      dob: "1992-03-18",
      address: "789 Pine Blvd, Gotham",
      verificationCode: "345678",
      verificationCodeExpiresAt: "2024-11-03T12:00:00",
      createDate: "2024-10-03T11:00:00",
      enabled: false,
    },
    ticketEntities: [],
  },
  // ... tiếp tục tạo thêm các đối tượng người dùng khác tương tự
  {
    id: 20,
    urlImage: "",
    numBooking: 1,
    gender: "Female",
    account: {
      id: 20,
      email: "user20@example.com",
      role: "ROLE_USER",
      firstName: "Emily",
      lastName: "Wilson",
      dob: "1991-12-25",
      address: "321 Maple St, Central City",
      verificationCode: "234567",
      verificationCodeExpiresAt: "2024-11-05T12:00:00",
      createDate: "2024-10-05T15:00:00",
      enabled: true,
    },
    ticketEntities: [],
  },
];

export const mockDataTeam = [
  {
    id: 1,
    name: "Jon Snow",
    email: "jonsnow@gmail.com",
    age: 35,
    phone: "(665)121-5454",
    access: "admin",
  },
  {
    id: 2,
    name: "Cersei Lannister",
    email: "cerseilannister@gmail.com",
    age: 42,
    phone: "(421)314-2288",
    access: "manager",
  },
  {
    id: 3,
    name: "Jaime Lannister",
    email: "jaimelannister@gmail.com",
    age: 45,
    phone: "(422)982-6739",
    access: "user",
  },
  {
    id: 4,
    name: "Anya Stark",
    email: "anyastark@gmail.com",
    age: 16,
    phone: "(921)425-6742",
    access: "admin",
  },
  {
    id: 5,
    name: "Daenerys Targaryen",
    email: "daenerystargaryen@gmail.com",
    age: 31,
    phone: "(421)445-1189",
    access: "user",
  },
  {
    id: 6,
    name: "Ever Melisandre",
    email: "evermelisandre@gmail.com",
    age: 150,
    phone: "(232)545-6483",
    access: "manager",
  },
  {
    id: 7,
    name: "Ferrara Clifford",
    email: "ferraraclifford@gmail.com",
    age: 44,
    phone: "(543)124-0123",
    access: "user",
  },
  {
    id: 8,
    name: "Rossini Frances",
    email: "rossinifrances@gmail.com",
    age: 36,
    phone: "(222)444-5555",
    access: "user",
  },
  {
    id: 9,
    name: "Harvey Roxie",
    email: "harveyroxie@gmail.com",
    age: 65,
    phone: "(444)555-6239",
    access: "admin",
  },
];

export const mockDataVoucher = [
  {
    id: 1,
    code: "KpGC4QGWQO",
    discount: 0.5,
    valid: false,
  },
  {
    id: 2,
    code: "XyZ123456A",
    discount: 0.3,
    valid: true,
  },
  {
    id: 3,
    code: "ABCD1234EF",
    discount: 0.2,
    valid: true,
  },
  {
    id: 4,
    code: "PROMO2024",
    discount: 0.25,
    valid: false,
  },
  {
    id: 5,
    code: "SAVE50NOW",
    discount: 0.5,
    valid: true,
  },
  {
    id: 6,
    code: "FREESHIP2024",
    discount: 0.15,
    valid: true,
  },
  {
    id: 7,
    code: "WELCOME10",
    discount: 0.1,
    valid: false,
  },
  {
    id: 8,
    code: "VIPDISCOUNT",
    discount: 0.4,
    valid: true,
  },
  {
    id: 9,
    code: "SUMMER2024",
    discount: 0.3,
    valid: true,
  },
  {
    id: 10,
    code: "HOLIDAYSALE",
    discount: 0.45,
    valid: false,
  },
];

export const mockParkingLot = [
  {
    id: 1,
    name: "parking 1",
    location: "77 Đào Trí",
    capacity: 12,
    numCar: 0,
    empty: true,
  },
  {
    id: 2,
    name: "parking 2",
    location: "56 Nguyễn Văn Linh",
    capacity: 20,
    numCar: 0,
    empty: true,
  },
  {
    id: 3,
    name: "parking 3",
    location: "35 Võ Văn Kiệt",
    capacity: 10,
    numCar: 0,
    empty: true,
  },
  {
    id: 4,
    name: "parking 4",
    location: "12 Lê Lợi",
    capacity: 15,
    numCar: 0,
    empty: true,
  },
  {
    id: 5,
    name: "parking 5",
    location: "23 Trần Hưng Đạo",
    capacity: 8,
    numCar: 0,
    empty: true,
  },
  {
    id: 6,
    name: "parking 6",
    location: "88 Nguyễn Huệ",
    capacity: 14,
    numCar: 0,
    empty: true,
  },
  {
    id: 7,
    name: "parking 7",
    location: "66 Phạm Ngũ Lão",
    capacity: 25,
    numCar: 0,
    empty: true,
  },
  {
    id: 8,
    name: "parking 8",
    location: "44 Lý Thường Kiệt",
    capacity: 30,
    numCar: 0,
    empty: true,
  },
  {
    id: 9,
    name: "parking 9",
    location: "29 Nguyễn Thị Minh Khai",
    capacity: 18,
    numCar: 0,
    empty: true,
  },
  {
    id: 10,
    name: "parking 10",
    location: "101 Lý Chính Thắng",
    capacity: 22,
    numCar: 0,
    empty: true,
  },
  {
    id: 11,
    name: "parking 11",
    location: "11 Bạch Đằng",
    capacity: 16,
    numCar: 0,
    empty: true,
  },
  {
    id: 12,
    name: "parking 12",
    location: "200 Trường Sa",
    capacity: 20,
    numCar: 0,
    empty: true,
  },
];

export const mockCars = [
  {
    id: 1,
    name: "Fortuner",
    plateNumber: "123123",
    color: "vàng",
    manufactory: "Đức",
    yearOfManufacture: 2002,
    dayMaintenance: "2024-10-25",
    type: {
      typeId: 1,
      numSeat: 5,
      price: 200000,
    },
    parking: null,
    images: [
      {
        imageId: 1,
        imageUrl:
          "src\\main\\resources\\static\\assets\\imagesUploads/za4RexcK",
      },
      {
        imageId: 2,
        imageUrl:
          "src\\main\\resources\\static\\assets\\imagesUploads/1kBZWJuJ",
      },
    ],
  },
  {
    id: 2,
    name: "Civic",
    plateNumber: "456456",
    color: "đỏ",
    manufactory: "Nhật Bản",
    yearOfManufacture: 2010,
    dayMaintenance: "2024-09-15",
    type: {
      typeId: 2,
      numSeat: 5,
      price: 180000,
    },
    parking: null,
    images: [
      {
        imageId: 3,
        imageUrl:
          "src\\main\\resources\\static\\assets\\imagesUploads/CivicImage1",
      },
      {
        imageId: 4,
        imageUrl:
          "src\\main\\resources\\static\\assets\\imagesUploads/CivicImage2",
      },
    ],
  },
  {
    id: 3,
    name: "Mazda 3",
    plateNumber: "789789",
    color: "trắng",
    manufactory: "Nhật Bản",
    yearOfManufacture: 2015,
    dayMaintenance: "2024-11-20",
    type: {
      typeId: 2,
      numSeat: 5,
      price: 220000,
    },
    parking: null,
    images: [
      {
        imageId: 5,
        imageUrl:
          "src\\main\\resources\\static\\assets\\imagesUploads/Mazda3Image1",
      },
      {
        imageId: 6,
        imageUrl:
          "src\\main\\resources\\static\\assets\\imagesUploads/Mazda3Image2",
      },
    ],
  },
  {
    id: 4,
    name: "Accord",
    plateNumber: "321321",
    color: "đen",
    manufactory: "Nhật Bản",
    yearOfManufacture: 2018,
    dayMaintenance: "2024-12-30",
    type: {
      typeId: 3,
      numSeat: 5,
      price: 250000,
    },
    parking: null,
    images: [
      {
        imageId: 7,
        imageUrl:
          "src\\main\\resources\\static\\assets\\imagesUploads/AccordImage1",
      },
      {
        imageId: 8,
        imageUrl:
          "src\\main\\resources\\static\\assets\\imagesUploads/AccordImage2",
      },
    ],
  },
  {
    id: 5,
    name: "Camry",
    plateNumber: "654654",
    color: "bạc",
    manufactory: "Nhật Bản",
    yearOfManufacture: 2019,
    dayMaintenance: "2025-01-10",
    type: {
      typeId: 3,
      numSeat: 5,
      price: 240000,
    },
    parking: null,
    images: [
      {
        imageId: 9,
        imageUrl:
          "src\\main\\resources\\static\\assets\\imagesUploads/CamryImage1",
      },
      {
        imageId: 10,
        imageUrl:
          "src\\main\\resources\\static\\assets\\imagesUploads/CamryImage2",
      },
    ],
  },
  {
    id: 6,
    name: "Polo",
    plateNumber: "987987",
    color: "xanh",
    manufactory: "Đức",
    yearOfManufacture: 2016,
    dayMaintenance: "2024-08-22",
    type: {
      typeId: 2,
      numSeat: 5,
      price: 150000,
    },
    parking: null,
    images: [
      {
        imageId: 11,
        imageUrl:
          "src\\main\\resources\\static\\assets\\imagesUploads/PoloImage1",
      },
      {
        imageId: 12,
        imageUrl:
          "src\\main\\resources\\static\\assets\\imagesUploads/PoloImage2",
      },
    ],
  },
  {
    id: 7,
    name: "Corolla",
    plateNumber: "321654",
    color: "xám",
    manufactory: "Nhật Bản",
    yearOfManufacture: 2020,
    dayMaintenance: "2025-02-14",
    type: {
      typeId: 3,
      numSeat: 5,
      price: 230000,
    },
    parking: null,
    images: [
      {
        imageId: 13,
        imageUrl:
          "src\\main\\resources\\static\\assets\\imagesUploads/CorollaImage1",
      },
      {
        imageId: 14,
        imageUrl:
          "src\\main\\resources\\static\\assets\\imagesUploads/CorollaImage2",
      },
    ],
  },
  {
    id: 8,
    name: "Sportage",
    plateNumber: "654789",
    color: "cam",
    manufactory: "Hàn Quốc",
    yearOfManufacture: 2017,
    dayMaintenance: "2024-11-30",
    type: {
      typeId: 2,
      numSeat: 5,
      price: 190000,
    },
    parking: null,
    images: [
      {
        imageId: 15,
        imageUrl:
          "src\\main\\resources\\static\\assets\\imagesUploads/SportageImage1",
      },
      {
        imageId: 16,
        imageUrl:
          "src\\main\\resources\\static\\assets\\imagesUploads/SportageImage2",
      },
    ],
  },
  {
    id: 9,
    name: "Tucson",
    plateNumber: "852147",
    color: "trắng",
    manufactory: "Hàn Quốc",
    yearOfManufacture: 2016,
    dayMaintenance: "2024-06-15",
    type: {
      typeId: 2,
      numSeat: 5,
      price: 200000,
    },
    parking: null,
    images: [
      {
        imageId: 17,
        imageUrl:
          "src\\main\\resources\\static\\assets\\imagesUploads/TucsonImage1",
      },
      {
        imageId: 18,
        imageUrl:
          "src\\main\\resources\\static\\assets\\imagesUploads/TucsonImage2",
      },
    ],
  },
  {
    id: 10,
    name: "Kona",
    plateNumber: "963258",
    color: "xanh lá",
    manufactory: "Hàn Quốc",
    yearOfManufacture: 2019,
    dayMaintenance: "2025-04-20",
    type: {
      typeId: 2,
      numSeat: 5,
      price: 210000,
    },
    parking: null,
    images: [
      {
        imageId: 19,
        imageUrl:
          "src\\main\\resources\\static\\assets\\imagesUploads/KonaImage1",
      },
      {
        imageId: 20,
        imageUrl:
          "src\\main\\resources\\static\\assets\\imagesUploads/KonaImage2",
      },
    ],
  },
  {
    id: 11,
    name: "Seltos",
    plateNumber: "147258",
    color: "xám",
    manufactory: "Hàn Quốc",
    yearOfManufacture: 2020,
    dayMaintenance: "2025-03-10",
    type: {
      typeId: 2,
      numSeat: 5,
      price: 220000,
    },
    parking: null,
    images: [
      {
        imageId: 21,
        imageUrl:
          "src\\main\\resources\\static\\assets\\imagesUploads/SeltosImage1",
      },
      {
        imageId: 22,
        imageUrl:
          "src\\main\\resources\\static\\assets\\imagesUploads/SeltosImage2",
      },
    ],
  },
  {
    id: 12,
    name: "Sorento",
    plateNumber: "963852",
    color: "đỏ",
    manufactory: "Hàn Quốc",
    yearOfManufacture: 2018,
    dayMaintenance: "2024-07-30",
    type: {
      typeId: 3,
      numSeat: 7,
      price: 270000,
    },
    parking: null,
    images: [
      {
        imageId: 23,
        imageUrl:
          "src\\main\\resources\\static\\assets\\imagesUploads/SorentoImage1",
      },
      {
        imageId: 24,
        imageUrl:
          "src\\main\\resources\\static\\assets\\imagesUploads/SorentoImage2",
      },
    ],
  },
  {
    id: 13,
    name: "Rav4",
    plateNumber: "852963",
    color: "xanh",
    manufactory: "Nhật Bản",
    yearOfManufacture: 2019,
    dayMaintenance: "2025-05-25",
    type: {
      typeId: 3,
      numSeat: 5,
      price: 260000,
    },
    parking: null,
    images: [
      {
        imageId: 25,
        imageUrl:
          "src\\main\\resources\\static\\assets\\imagesUploads/Rav4Image1",
      },
      {
        imageId: 26,
        imageUrl:
          "src\\main\\resources\\static\\assets\\imagesUploads/Rav4Image2",
      },
    ],
  },
  {
    id: 14,
    name: "CR-V",
    plateNumber: "789654",
    color: "bạc",
    manufactory: "Nhật Bản",
    yearOfManufacture: 2021,
    dayMaintenance: "2025-06-01",
    type: {
      typeId: 3,
      numSeat: 5,
      price: 280000,
    },
    parking: null,
    images: [
      {
        imageId: 27,
        imageUrl:
          "src\\main\\resources\\static\\assets\\imagesUploads/CRVImage1",
      },
      {
        imageId: 28,
        imageUrl:
          "src\\main\\resources\\static\\assets\\imagesUploads/CRVImage2",
      },
    ],
  },
  {
    id: 15,
    name: "Rogue",
    plateNumber: "456987",
    color: "nâu",
    manufactory: "Nhật Bản",
    yearOfManufacture: 2022,
    dayMaintenance: "2025-08-15",
    type: {
      typeId: 3,
      numSeat: 5,
      price: 300000,
    },
    parking: null,
    images: [
      {
        imageId: 29,
        imageUrl:
          "src\\main\\resources\\static\\assets\\imagesUploads/RogueImage1",
      },
      {
        imageId: 30,
        imageUrl:
          "src\\main\\resources\\static\\assets\\imagesUploads/RogueImage2",
      },
    ],
  },
  {
    id: 16,
    name: "X5",
    plateNumber: "123456",
    color: "trắng",
    manufactory: "Đức",
    yearOfManufacture: 2020,
    dayMaintenance: "2025-09-12",
    type: {
      typeId: 3,
      numSeat: 5,
      price: 320000,
    },
    parking: null,
    images: [
      {
        imageId: 31,
        imageUrl:
          "src\\main\\resources\\static\\assets\\imagesUploads/X5Image1",
      },
      {
        imageId: 32,
        imageUrl:
          "src\\main\\resources\\static\\assets\\imagesUploads/X5Image2",
      },
    ],
  },
  {
    id: 17,
    name: "Q5",
    plateNumber: "456123",
    color: "đen",
    manufactory: "Đức",
    yearOfManufacture: 2018,
    dayMaintenance: "2024-05-05",
    type: {
      typeId: 3,
      numSeat: 5,
      price: 340000,
    },
    parking: null,
    images: [
      {
        imageId: 33,
        imageUrl:
          "src\\main\\resources\\static\\assets\\imagesUploads/Q5Image1",
      },
      {
        imageId: 34,
        imageUrl:
          "src\\main\\resources\\static\\assets\\imagesUploads/Q5Image2",
      },
    ],
  },
  {
    id: 18,
    name: "A6",
    plateNumber: "789123",
    color: "xám",
    manufactory: "Đức",
    yearOfManufacture: 2021,
    dayMaintenance: "2025-10-20",
    type: {
      typeId: 3,
      numSeat: 5,
      price: 360000,
    },
    parking: null,
    images: [
      {
        imageId: 35,
        imageUrl:
          "src\\main\\resources\\static\\assets\\imagesUploads/A6Image1",
      },
      {
        imageId: 36,
        imageUrl:
          "src\\main\\resources\\static\\assets\\imagesUploads/A6Image2",
      },
    ],
  },
  {
    id: 19,
    name: "3 Series",
    plateNumber: "321789",
    color: "bạc",
    manufactory: "Đức",
    yearOfManufacture: 2023,
    dayMaintenance: "2025-12-12",
    type: {
      typeId: 3,
      numSeat: 5,
      price: 400000,
    },
    parking: null,
    images: [
      {
        imageId: 37,
        imageUrl:
          "src\\main\\resources\\static\\assets\\imagesUploads/3SeriesImage1",
      },
      {
        imageId: 38,
        imageUrl:
          "src\\main\\resources\\static\\assets\\imagesUploads/3SeriesImage2",
      },
    ],
  },
  {
    id: 20,
    name: "A8",
    plateNumber: "654321",
    color: "đen",
    manufactory: "Đức",
    yearOfManufacture: 2022,
    dayMaintenance: "2025-11-25",
    type: {
      typeId: 3,
      numSeat: 5,
      price: 450000,
    },
    parking: null,
    images: [
      {
        imageId: 39,
        imageUrl:
          "src\\main\\resources\\static\\assets\\imagesUploads/A8Image1",
      },
      {
        imageId: 40,
        imageUrl:
          "src\\main\\resources\\static\\assets\\imagesUploads/A8Image2",
      },
    ],
  },
];
export const mockDataType = [
  {
    id: 1,
    numSeat: 7,
    price: 10000,
  },
  {
    id: 2,
    numSeat: 4,
    price: 120000,
  },
  {
    id: 3,
    numSeat: 10,
    price: 20000,
  },
  {
    id: 4,
    numSeat: 4,
    price: 25000,
  },
];
export const mockDataContacts = [
  {
    id: 1,
    name: "Jon Snow",
    email: "jonsnow@gmail.com",
    age: 35,
    phone: "(665)121-5454",
    address: "0912 Won Street, Alabama, SY 10001",
    city: "New York",
    zipCode: "10001",
    registrarId: 123512,
  },
  {
    id: 2,
    name: "Cersei Lannister",
    email: "cerseilannister@gmail.com",
    age: 42,
    phone: "(421)314-2288",
    address: "1234 Main Street, New York, NY 10001",
    city: "New York",
    zipCode: "13151",
    registrarId: 123512,
  },
  {
    id: 3,
    name: "Jaime Lannister",
    email: "jaimelannister@gmail.com",
    age: 45,
    phone: "(422)982-6739",
    address: "3333 Want Blvd, Estanza, NAY 42125",
    city: "New York",
    zipCode: "87281",
    registrarId: 4132513,
  },
  {
    id: 4,
    name: "Anya Stark",
    email: "anyastark@gmail.com",
    age: 16,
    phone: "(921)425-6742",
    address: "1514 Main Street, New York, NY 22298",
    city: "New York",
    zipCode: "15551",
    registrarId: 123512,
  },
  {
    id: 5,
    name: "Daenerys Targaryen",
    email: "daenerystargaryen@gmail.com",
    age: 31,
    phone: "(421)445-1189",
    address: "11122 Welping Ave, Tenting, CD 21321",
    city: "Tenting",
    zipCode: "14215",
    registrarId: 123512,
  },
  {
    id: 6,
    name: "Ever Melisandre",
    email: "evermelisandre@gmail.com",
    age: 150,
    phone: "(232)545-6483",
    address: "1234 Canvile Street, Esvazark, NY 10001",
    city: "Esvazark",
    zipCode: "10001",
    registrarId: 123512,
  },
  {
    id: 7,
    name: "Ferrara Clifford",
    email: "ferraraclifford@gmail.com",
    age: 44,
    phone: "(543)124-0123",
    address: "22215 Super Street, Everting, ZO 515234",
    city: "Evertin",
    zipCode: "51523",
    registrarId: 123512,
  },
  {
    id: 8,
    name: "Rossini Frances",
    email: "rossinifrances@gmail.com",
    age: 36,
    phone: "(222)444-5555",
    address: "4123 Ever Blvd, Wentington, AD 142213",
    city: "Esteras",
    zipCode: "44215",
    registrarId: 512315,
  },
  {
    id: 9,
    name: "Harvey Roxie",
    email: "harveyroxie@gmail.com",
    age: 65,
    phone: "(444)555-6239",
    address: "51234 Avery Street, Cantory, ND 212412",
    city: "Colunza",
    zipCode: "111234",
    registrarId: 928397,
  },
  {
    id: 10,
    name: "Enteri Redack",
    email: "enteriredack@gmail.com",
    age: 42,
    phone: "(222)444-5555",
    address: "4123 Easer Blvd, Wentington, AD 142213",
    city: "Esteras",
    zipCode: "44215",
    registrarId: 533215,
  },
  {
    id: 11,
    name: "Steve Goodman",
    email: "stevegoodmane@gmail.com",
    age: 11,
    phone: "(444)555-6239",
    address: "51234 Fiveton Street, CunFory, ND 212412",
    city: "Colunza",
    zipCode: "1234",
    registrarId: 92197,
  },
];

export const mockDataInvoices = [
  {
    id: 1,
    name: "Jon Snow",
    email: "jonsnow@gmail.com",
    cost: "21.24",
    phone: "(665)121-5454",
    date: "03/12/2022",
  },
  {
    id: 2,
    name: "Cersei Lannister",
    email: "cerseilannister@gmail.com",
    cost: "1.24",
    phone: "(421)314-2288",
    date: "06/15/2021",
  },
  {
    id: 3,
    name: "Jaime Lannister",
    email: "jaimelannister@gmail.com",
    cost: "11.24",
    phone: "(422)982-6739",
    date: "05/02/2022",
  },
  {
    id: 4,
    name: "Anya Stark",
    email: "anyastark@gmail.com",
    cost: "80.55",
    phone: "(921)425-6742",
    date: "03/21/2022",
  },
  {
    id: 5,
    name: "Daenerys Targaryen",
    email: "daenerystargaryen@gmail.com",
    cost: "1.24",
    phone: "(421)445-1189",
    date: "01/12/2021",
  },
  {
    id: 6,
    name: "Ever Melisandre",
    email: "evermelisandre@gmail.com",
    cost: "63.12",
    phone: "(232)545-6483",
    date: "11/02/2022",
  },
  {
    id: 7,
    name: "Ferrara Clifford",
    email: "ferraraclifford@gmail.com",
    cost: "52.42",
    phone: "(543)124-0123",
    date: "02/11/2022",
  },
  {
    id: 8,
    name: "Rossini Frances",
    email: "rossinifrances@gmail.com",
    cost: "21.24",
    phone: "(222)444-5555",
    date: "05/02/2021",
  },
];

export const mockTransactions = [
  {
    txId: "01e4dsa",
    user: "johndoe",
    date: "2021-09-01",
    cost: "43.95",
  },
  {
    txId: "0315dsaa",
    user: "jackdower",
    date: "2022-04-01",
    cost: "133.45",
  },
  {
    txId: "01e4dsa",
    user: "aberdohnny",
    date: "2021-09-01",
    cost: "43.95",
  },
  {
    txId: "51034szv",
    user: "goodmanave",
    date: "2022-11-05",
    cost: "200.95",
  },
  {
    txId: "0a123sb",
    user: "stevebower",
    date: "2022-11-02",
    cost: "13.55",
  },
  {
    txId: "01e4dsa",
    user: "aberdohnny",
    date: "2021-09-01",
    cost: "43.95",
  },
  {
    txId: "120s51a",
    user: "wootzifer",
    date: "2019-04-15",
    cost: "24.20",
  },
  {
    txId: "0315dsaa",
    user: "jackdower",
    date: "2022-04-01",
    cost: "133.45",
  },
];

export const mockBarData = [
  {
    country: "AD",
    "hot dog": 137,
    "hot dogColor": "hsl(229, 70%, 50%)",
    burger: 96,
    burgerColor: "hsl(296, 70%, 50%)",
    kebab: 72,
    kebabColor: "hsl(97, 70%, 50%)",
    donut: 140,
    donutColor: "hsl(340, 70%, 50%)",
  },
  {
    country: "AE",
    "hot dog": 55,
    "hot dogColor": "hsl(307, 70%, 50%)",
    burger: 28,
    burgerColor: "hsl(111, 70%, 50%)",
    kebab: 58,
    kebabColor: "hsl(273, 70%, 50%)",
    donut: 29,
    donutColor: "hsl(275, 70%, 50%)",
  },
  {
    country: "AF",
    "hot dog": 109,
    "hot dogColor": "hsl(72, 70%, 50%)",
    burger: 23,
    burgerColor: "hsl(96, 70%, 50%)",
    kebab: 34,
    kebabColor: "hsl(106, 70%, 50%)",
    donut: 152,
    donutColor: "hsl(256, 70%, 50%)",
  },
  {
    country: "AG",
    "hot dog": 133,
    "hot dogColor": "hsl(257, 70%, 50%)",
    burger: 52,
    burgerColor: "hsl(326, 70%, 50%)",
    kebab: 43,
    kebabColor: "hsl(110, 70%, 50%)",
    donut: 83,
    donutColor: "hsl(9, 70%, 50%)",
  },
  {
    country: "AI",
    "hot dog": 81,
    "hot dogColor": "hsl(190, 70%, 50%)",
    burger: 80,
    burgerColor: "hsl(325, 70%, 50%)",
    kebab: 112,
    kebabColor: "hsl(54, 70%, 50%)",
    donut: 35,
    donutColor: "hsl(285, 70%, 50%)",
  },
  {
    country: "AL",
    "hot dog": 66,
    "hot dogColor": "hsl(208, 70%, 50%)",
    burger: 111,
    burgerColor: "hsl(334, 70%, 50%)",
    kebab: 167,
    kebabColor: "hsl(182, 70%, 50%)",
    donut: 18,
    donutColor: "hsl(76, 70%, 50%)",
  },
  {
    country: "AM",
    "hot dog": 80,
    "hot dogColor": "hsl(87, 70%, 50%)",
    burger: 47,
    burgerColor: "hsl(141, 70%, 50%)",
    kebab: 158,
    kebabColor: "hsl(224, 70%, 50%)",
    donut: 49,
    donutColor: "hsl(274, 70%, 50%)",
  },
];

export const mockPieData = [
  {
    id: "hack",
    label: "hack",
    value: 239,
    color: "hsl(104, 70%, 50%)",
  },
  {
    id: "make",
    label: "make",
    value: 170,
    color: "hsl(162, 70%, 50%)",
  },
  {
    id: "go",
    label: "go",
    value: 322,
    color: "hsl(291, 70%, 50%)",
  },
  {
    id: "lisp",
    label: "lisp",
    value: 503,
    color: "hsl(229, 70%, 50%)",
  },
  {
    id: "scala",
    label: "scala",
    value: 584,
    color: "hsl(344, 70%, 50%)",
  },
];

export const mockLineData = [
  {
    id: "japan",
    color: tokens("dark").greenAccent[500],
    data: [
      {
        x: "plane",
        y: 101,
      },
      {
        x: "helicopter",
        y: 75,
      },
      {
        x: "boat",
        y: 36,
      },
      {
        x: "train",
        y: 216,
      },
      {
        x: "subway",
        y: 35,
      },
      {
        x: "bus",
        y: 236,
      },
      {
        x: "car",
        y: 88,
      },
      {
        x: "moto",
        y: 232,
      },
      {
        x: "bicycle",
        y: 281,
      },
      {
        x: "horse",
        y: 1,
      },
      {
        x: "skateboard",
        y: 35,
      },
      {
        x: "others",
        y: 14,
      },
    ],
  },
  {
    id: "france",
    color: tokens("dark").blueAccent[300],
    data: [
      {
        x: "plane",
        y: 212,
      },
      {
        x: "helicopter",
        y: 190,
      },
      {
        x: "boat",
        y: 270,
      },
      {
        x: "train",
        y: 9,
      },
      {
        x: "subway",
        y: 75,
      },
      {
        x: "bus",
        y: 175,
      },
      {
        x: "car",
        y: 33,
      },
      {
        x: "moto",
        y: 189,
      },
      {
        x: "bicycle",
        y: 97,
      },
      {
        x: "horse",
        y: 87,
      },
      {
        x: "skateboard",
        y: 299,
      },
      {
        x: "others",
        y: 251,
      },
    ],
  },
  {
    id: "us",
    color: tokens("dark").redAccent[200],
    data: [
      {
        x: "plane",
        y: 191,
      },
      {
        x: "helicopter",
        y: 136,
      },
      {
        x: "boat",
        y: 91,
      },
      {
        x: "train",
        y: 190,
      },
      {
        x: "subway",
        y: 211,
      },
      {
        x: "bus",
        y: 152,
      },
      {
        x: "car",
        y: 189,
      },
      {
        x: "moto",
        y: 152,
      },
      {
        x: "bicycle",
        y: 8,
      },
      {
        x: "horse",
        y: 197,
      },
      {
        x: "skateboard",
        y: 107,
      },
      {
        x: "others",
        y: 170,
      },
    ],
  },
];

export const mockGeographyData = [
  {
    id: "AFG",
    value: 520600,
  },
  {
    id: "AGO",
    value: 949905,
  },
  {
    id: "ALB",
    value: 329910,
  },
  {
    id: "ARE",
    value: 675484,
  },
  {
    id: "ARG",
    value: 432239,
  },
  {
    id: "ARM",
    value: 288305,
  },
  {
    id: "ATA",
    value: 415648,
  },
  {
    id: "ATF",
    value: 665159,
  },
  {
    id: "AUT",
    value: 798526,
  },
  {
    id: "AZE",
    value: 481678,
  },
  {
    id: "BDI",
    value: 496457,
  },
  {
    id: "BEL",
    value: 252276,
  },
  {
    id: "BEN",
    value: 440315,
  },
  {
    id: "BFA",
    value: 343752,
  },
  {
    id: "BGD",
    value: 920203,
  },
  {
    id: "BGR",
    value: 261196,
  },
  {
    id: "BHS",
    value: 421551,
  },
  {
    id: "BIH",
    value: 974745,
  },
  {
    id: "BLR",
    value: 349288,
  },
  {
    id: "BLZ",
    value: 305983,
  },
  {
    id: "BOL",
    value: 430840,
  },
  {
    id: "BRN",
    value: 345666,
  },
  {
    id: "BTN",
    value: 649678,
  },
  {
    id: "BWA",
    value: 319392,
  },
  {
    id: "CAF",
    value: 722549,
  },
  {
    id: "CAN",
    value: 332843,
  },
  {
    id: "CHE",
    value: 122159,
  },
  {
    id: "CHL",
    value: 811736,
  },
  {
    id: "CHN",
    value: 593604,
  },
  {
    id: "CIV",
    value: 143219,
  },
  {
    id: "CMR",
    value: 630627,
  },
  {
    id: "COG",
    value: 498556,
  },
  {
    id: "COL",
    value: 660527,
  },
  {
    id: "CRI",
    value: 60262,
  },
  {
    id: "CUB",
    value: 177870,
  },
  {
    id: "-99",
    value: 463208,
  },
  {
    id: "CYP",
    value: 945909,
  },
  {
    id: "CZE",
    value: 500109,
  },
  {
    id: "DEU",
    value: 63345,
  },
  {
    id: "DJI",
    value: 634523,
  },
  {
    id: "DNK",
    value: 731068,
  },
  {
    id: "DOM",
    value: 262538,
  },
  {
    id: "DZA",
    value: 760695,
  },
  {
    id: "ECU",
    value: 301263,
  },
  {
    id: "EGY",
    value: 148475,
  },
  {
    id: "ERI",
    value: 939504,
  },
  {
    id: "ESP",
    value: 706050,
  },
  {
    id: "EST",
    value: 977015,
  },
  {
    id: "ETH",
    value: 461734,
  },
  {
    id: "FIN",
    value: 22800,
  },
  {
    id: "FJI",
    value: 18985,
  },
  {
    id: "FLK",
    value: 64986,
  },
  {
    id: "FRA",
    value: 447457,
  },
  {
    id: "GAB",
    value: 669675,
  },
  {
    id: "GBR",
    value: 757120,
  },
  {
    id: "GEO",
    value: 158702,
  },
  {
    id: "GHA",
    value: 893180,
  },
  {
    id: "GIN",
    value: 877288,
  },
  {
    id: "GMB",
    value: 724530,
  },
  {
    id: "GNB",
    value: 387753,
  },
  {
    id: "GNQ",
    value: 706118,
  },
  {
    id: "GRC",
    value: 377796,
  },
  {
    id: "GTM",
    value: 66890,
  },
  {
    id: "GUY",
    value: 719300,
  },
  {
    id: "HND",
    value: 739590,
  },
  {
    id: "HRV",
    value: 929467,
  },
  {
    id: "HTI",
    value: 538961,
  },
  {
    id: "HUN",
    value: 146095,
  },
  {
    id: "IDN",
    value: 490681,
  },
  {
    id: "IND",
    value: 549818,
  },
  {
    id: "IRL",
    value: 630163,
  },
  {
    id: "IRN",
    value: 596921,
  },
  {
    id: "IRQ",
    value: 767023,
  },
  {
    id: "ISL",
    value: 478682,
  },
  {
    id: "ISR",
    value: 963688,
  },
  {
    id: "ITA",
    value: 393089,
  },
  {
    id: "JAM",
    value: 83173,
  },
  {
    id: "JOR",
    value: 52005,
  },
  {
    id: "JPN",
    value: 199174,
  },
  {
    id: "KAZ",
    value: 181424,
  },
  {
    id: "KEN",
    value: 60946,
  },
  {
    id: "KGZ",
    value: 432478,
  },
  {
    id: "KHM",
    value: 254461,
  },
  {
    id: "OSA",
    value: 942447,
  },
  {
    id: "KWT",
    value: 414413,
  },
  {
    id: "LAO",
    value: 448339,
  },
  {
    id: "LBN",
    value: 620090,
  },
  {
    id: "LBR",
    value: 435950,
  },
  {
    id: "LBY",
    value: 75091,
  },
  {
    id: "LKA",
    value: 595124,
  },
  {
    id: "LSO",
    value: 483524,
  },
  {
    id: "LTU",
    value: 867357,
  },
  {
    id: "LUX",
    value: 689172,
  },
  {
    id: "LVA",
    value: 742980,
  },
  {
    id: "MAR",
    value: 236538,
  },
  {
    id: "MDA",
    value: 926836,
  },
  {
    id: "MDG",
    value: 840840,
  },
  {
    id: "MEX",
    value: 353910,
  },
  {
    id: "MKD",
    value: 505842,
  },
  {
    id: "MLI",
    value: 286082,
  },
  {
    id: "MMR",
    value: 915544,
  },
  {
    id: "MNE",
    value: 609500,
  },
  {
    id: "MNG",
    value: 410428,
  },
  {
    id: "MOZ",
    value: 32868,
  },
  {
    id: "MRT",
    value: 375671,
  },
  {
    id: "MWI",
    value: 591935,
  },
  {
    id: "MYS",
    value: 991644,
  },
  {
    id: "NAM",
    value: 701897,
  },
  {
    id: "NCL",
    value: 144098,
  },
  {
    id: "NER",
    value: 312944,
  },
  {
    id: "NGA",
    value: 862877,
  },
  {
    id: "NIC",
    value: 90831,
  },
  {
    id: "NLD",
    value: 281879,
  },
  {
    id: "NOR",
    value: 224537,
  },
  {
    id: "NPL",
    value: 322331,
  },
  {
    id: "NZL",
    value: 86615,
  },
  {
    id: "OMN",
    value: 707881,
  },
  {
    id: "PAK",
    value: 158577,
  },
  {
    id: "PAN",
    value: 738579,
  },
  {
    id: "PER",
    value: 248751,
  },
  {
    id: "PHL",
    value: 557292,
  },
  {
    id: "PNG",
    value: 516874,
  },
  {
    id: "POL",
    value: 682137,
  },
  {
    id: "PRI",
    value: 957399,
  },
  {
    id: "PRT",
    value: 846430,
  },
  {
    id: "PRY",
    value: 720555,
  },
  {
    id: "QAT",
    value: 478726,
  },
  {
    id: "ROU",
    value: 259318,
  },
  {
    id: "RUS",
    value: 268735,
  },
  {
    id: "RWA",
    value: 136781,
  },
  {
    id: "ESH",
    value: 151957,
  },
  {
    id: "SAU",
    value: 111821,
  },
  {
    id: "SDN",
    value: 927112,
  },
  {
    id: "SDS",
    value: 966473,
  },
  {
    id: "SEN",
    value: 158085,
  },
  {
    id: "SLB",
    value: 178389,
  },
  {
    id: "SLE",
    value: 528433,
  },
  {
    id: "SLV",
    value: 353467,
  },
  {
    id: "ABV",
    value: 251,
  },
  {
    id: "SOM",
    value: 445243,
  },
  {
    id: "SRB",
    value: 202402,
  },
  {
    id: "SUR",
    value: 972121,
  },
  {
    id: "SVK",
    value: 319923,
  },
  {
    id: "SVN",
    value: 728766,
  },
  {
    id: "SWZ",
    value: 379669,
  },
  {
    id: "SYR",
    value: 16221,
  },
  {
    id: "TCD",
    value: 101273,
  },
  {
    id: "TGO",
    value: 498411,
  },
  {
    id: "THA",
    value: 506906,
  },
  {
    id: "TJK",
    value: 613093,
  },
  {
    id: "TKM",
    value: 327016,
  },
  {
    id: "TLS",
    value: 607972,
  },
  {
    id: "TTO",
    value: 936365,
  },
  {
    id: "TUN",
    value: 898416,
  },
  {
    id: "TUR",
    value: 237783,
  },
  {
    id: "TWN",
    value: 878213,
  },
  {
    id: "TZA",
    value: 442174,
  },
  {
    id: "UGA",
    value: 720710,
  },
  {
    id: "UKR",
    value: 74172,
  },
  {
    id: "URY",
    value: 753177,
  },
  {
    id: "USA",
    value: 658725,
  },
  {
    id: "UZB",
    value: 550313,
  },
  {
    id: "VEN",
    value: 707492,
  },
  {
    id: "VNM",
    value: 538907,
  },
  {
    id: "VUT",
    value: 650646,
  },
  {
    id: "PSE",
    value: 476078,
  },
  {
    id: "YEM",
    value: 957751,
  },
  {
    id: "ZAF",
    value: 836949,
  },
  {
    id: "ZMB",
    value: 714503,
  },
  {
    id: "ZWE",
    value: 405217,
  },
  {
    id: "KOR",
    value: 171135,
  },
];
