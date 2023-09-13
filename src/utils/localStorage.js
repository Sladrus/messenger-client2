export const getLocalItem = (item) => {
  return localStorage.getItem(item);
};

export const setLocalItem = (item, value) => {
  return localStorage.setItem(item, value);
};

export const removeLocalItem = (item) => {
  return localStorage.removeItem(item);
};
