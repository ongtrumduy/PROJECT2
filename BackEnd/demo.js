console.log("Run in line 01");
// console.log("Run in line 02");

setTimeout(()=>{
  console.log("Run in line 02");
}, 500);

console.log("Run in line 03");

setTimeout(()=>{
  console.log("Run in line 04");
}, 1);