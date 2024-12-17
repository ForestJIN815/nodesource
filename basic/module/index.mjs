import checkOddOrEven from "./func.mjs";
import { odd, even } from "./var.mjs";

function checkStringOddOrEven(str) {
  if (str.length % 2) {
    return odd;
  }
  return even;
}

console.log(checkOddOrEven(5));
console.log(checkStringOddOrEven("banana"));
