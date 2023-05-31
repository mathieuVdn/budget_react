export const sort = (array) => {
  {
    array.sort((a, b) => (a.id > b.id ? 1 : -1));
    return array;
  }
};
