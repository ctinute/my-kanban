export const insertItem = (array, index, item) => {
  array.splice(index, 0, item);
  return array;
};

export const removeItem = (array, index) => {
  array.splice(index, 1);
  return array;
};

export const moveItem = (array, src, des) => {
  let item = array[src];
  array = removeItem(array, src);
  array = insertItem(array, des, item);
  return array;
};
