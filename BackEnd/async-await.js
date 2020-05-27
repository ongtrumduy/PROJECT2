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

// sum(7, 10)
//   .then((total) => sum(total, 10))
//   .then((total) => sum(total, 10))
//   .then((total) => sum(total, 10))
//   .then((total) => {
//     console.log(total);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

let getTotal = (async () => {
  try {
    let total01 = await sum(7, 10);
    let total02 = await sum(total01, 10);
    let total03 = await sum(total02, 10);
    console.log(total01);
    console.log(total02);
    console.log(total03);

  } catch (error) {
    console.log(error);
  }
})()

// getTotal();