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

const convertArrayOfObjectsToCSV = (args) => {
  var result, ctr, keys, columnDelimiter, lineDelimiter, data;

  data = args.data || null;
  if (data == null || !data.length) {
    return null;
  }

  columnDelimiter = args.columnDelimiter || ",";
  lineDelimiter = args.lineDelimiter || "\n";

  keys = Object.keys(data[0]);

  result = "";
  result += keys.join(columnDelimiter);
  result += lineDelimiter;

  data.forEach(function (item) {
    ctr = 0;
    keys.forEach(function (key) {
      if (ctr > 0) result += columnDelimiter;

      result += item[key];
      ctr++;
    });
    result += lineDelimiter;
  });

  return result;
};

export const downloadCSV = (items) => {
  const csv = convertArrayOfObjectsToCSV({
    data: items,
  });

  const random = Math.floor(Math.random() * 1000000 + 1);
  const title = `rushing-${random}`;

  let link = document.createElement("a");
  link.id = title;
  link.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(csv));
  link.setAttribute("download", `${title}.csv`);
  document.body.appendChild(link);
  document.querySelector(`#${title}`).click();
};
