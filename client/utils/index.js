const sortTransform = (a, b) => {
  // Yard totals over 1000 need to have a comma removed. ie. 1,287
  // longRush that ends in a TD need to have the T removed. ie. 85T
  var pattern = /[,T]/g;
  if (typeof a === "string") {
    a = a.replace(pattern, "");
  }

  if (typeof b === "string") {
    b = b.replace(pattern, "");
  }

  return {
    aTransform: parseInt(a),
    bTransform: parseInt(b),
  };
};

export const compareNumber = (type) => (a, b) => {
  const { aTransform, bTransform } = sortTransform(a[type], b[type]);

  if (aTransform > bTransform) {
    return -1;
  } else if (aTransform < bTransform) {
    return 1;
  } else {
    return 0;
  }
};

export const getLocalStorage = (item) => {
  return localStorage.getItem(item);
};
export const setLocalStorage = (item, data) => {
  localStorage.setItem(item, data);
};
