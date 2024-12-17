// 외부 모듈 import
// import {  } from "module";
const path = require("path");

const string = __filename;
console.log("__filename ", string);
console.log("__dirname ", __dirname);

// 폴더 구분
// 윈도우즈 : \,
// 맥,리눅스 : /

console.log("path.sep : ", path.sep);
console.log("path.delimiter : ", path.delimiter);
console.log("-------------------------------------");
console.log("path.dirname() : ", path.dirname(string));
console.log("path.extname() : ", path.extname(string));
console.log("path.basename() : ", path.basename(string));
console.log(
  "path.basename - path.extname : ",
  path.basename(string, path.extname(string))
);
console.log("-------------------------------------");
console.log("path.parse(string) : ", path.parse(string));
// relative(경로1, 경로2) ; 경로1에서 경로2로 가는방법
console.log(
  "path.relative() : ",
  path.relative("C:\\source\\nodesource\\ch1", "c:\\")
);
console.log(
  "path.join() : ",
  path.join(__dirname, "..", "..", "/users", ".", "/test")
);
// resolve() : C:\source\nodesource\ch1,경로...... => c:\\test
console.log(
  "path.resolve() : ",
  path.resolve(__dirname, "..", "/users", ".", "/test")
);
