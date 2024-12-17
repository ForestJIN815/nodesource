// import fs from "fs";
import fs from "fs/promises";

// 콜백
// fs.readFile("./readme.txt", (err, data) => {
//   if (err) {
//     throw err;
//   }

//   console.log(data);
//   console.log(data.toString());
// });

//promise
fs.readFile("./readme.txt")
  .then((data) => console.log(data.toString()))
  .catch((err) => console.log(err));
