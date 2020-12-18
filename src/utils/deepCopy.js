/* eslint-disable no-use-before-define */
/* eslint-disable no-restricted-syntax */
const deepCopyObject = (obj) => {
  const tempObj = {};
  for (const [key, value] of Object.entries(obj)) {
    if (Array.isArray(value)) {
      tempObj[key] = deepCopy(value);
    } else if (typeof value === 'object') {
      tempObj[key] = deepCopyObject(value);
    } else {
      tempObj[key] = value;
    }
  }
  return tempObj;
};

const deepCopy = (arr) => {
  const copy = [];
  arr.forEach((elem) => {
    if (Array.isArray(elem)) {
      copy.push(deepCopy(elem));
    } else if (typeof elem === 'object') {
      copy.push(deepCopyObject(elem));
    } else {
      copy.push(elem);
    }
  });
  return copy;
};

export default deepCopy;
