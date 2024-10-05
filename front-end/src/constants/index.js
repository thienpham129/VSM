export const DEFAULT = {
    TOKEN: "TOKEN",
    REFRESH_TOKEN: "REFRESH_TOKEN",
    // ACCESS_TOKEN: "ACCESS_TOKEN"
};

export const LOCATION = {
    HOME: "/home",
    LOGIN: "/login",
    REGISTER: "/signup",
    PROFILE: "/profile",
};

export const NON_AUTH = [{
        path: LOCATION.LOGIN,
        title: "Đăng nhập",
    },
    {
        path: LOCATION.REGISTER,
        title: "Đăng ký",
    },
];

export const AUTH = [{
        path: LOCATION.PROFILE,
        title: "Thông tin cá nhân",
    },

]