export const getTokenFromLocalStorage = () => {
    const token = localStorage.getItem("token");
    return token;
};
export const setTokenToLocalStorage = (token) => {
    localStorage.setItem("token", token);
};
export const removeTokenFromLocalStorage = () => {
    localStorage.removeItem("token");

};