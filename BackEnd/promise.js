let sum = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (typeof a != "number" || typeof b != "number") {
        return reject("Giá trị truyền vào phải là số");
      }
      resolve(a + b);
    }, 1000);
  });
}

sum(7, 10)
  .then((total) => sum(total, 10))
  .then((total) => sum(total, 10))
  .then((total)=>sum(total, 10))
  .then((total) => {
    console.log(total);
  })
  .catch((err) => {
    console.log(err);
  });