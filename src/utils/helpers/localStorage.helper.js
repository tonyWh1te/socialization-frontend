// eslint-disable-next-line
export const getLocalStorageItem = (key) => {
  try {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem(key);
    }
    console.error('Local storage is not supported.');
    return null;
  } catch (error) {
    console.error('Error accessing local storage:', error);
    return null;
  }
};
