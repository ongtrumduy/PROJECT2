let sum = (a, b, callback) => {
  setTimeout(() => {
    let error, result;
    if (typeof a != "number" || typeof b != "number") {
      error = "Gía trị truyền vào phải là số";
      return callback(error, null);
    }
    result = a + b;
    return callback(null, result);
  }, 1000);
}

// let total = sum(7, 10);

// console.log(total);

sum(7, 10, (error, total) => {
  if (error) {
    console.log(error);
    return;
  };
  // console.log(total);
  sum(total, 10, (error, total01) => {
    if (error) {
      console.log(error);
      return;
    };
  console.log(total01);

})


// callback hell