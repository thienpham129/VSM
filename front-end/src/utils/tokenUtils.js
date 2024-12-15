export const getTokenFromLocalStorage = () => {
    const token = localStorage.getItem("TOKEN");
    return token;
};
export const setTokenToLocalStorage = (token) => {
    localStorage.setItem("TOKEN", token);
};
export const removeTokenFromLocalStorage = () => {
    localStorage.removeItem("TOKEN");

};