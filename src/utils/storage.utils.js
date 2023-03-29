export const setItem = (key, data) => {
    window.localStorage.setItem(key, JSON.stringify(data));
};

export const getItem = (key) => {
    const data = window.localStorage.getItem(key);
    if (!data) return null;
    return JSON.parse(data);
};
