const fruits = ["사과", "망고", "바나나", "수박", "자두", "포도"];
// console.log(fruits);

//구조 분해(Destructuring)
let candyMachine = {
  status: {
    name: "node",
    count: 5,
  },
  getCandy: function () {
    this.status.count--;
    return this.status;
  },
};

// var getCandy = candyMachine.getCandy;
// var count = candyMachine.status.count;

const {
  getCandy,
  status: { count },
} = candyMachine;

console.log(getCandy);
console.log(count);

// var arr1 = fruits[0];
// var arr3 = fruits[3];
// var arr4 = fruits[4];
// console.log(arr1, arr3, arr4);

const array = ["node.js", {}, 10, true];

const [node, obj, , bool] = array;
console.log(node, obj, bool);

// spread operator : ... (복제)
var array1 = ["num1", "num2"];
var array2 = ["num3", "num4"];
// 주소 복사(원본의 변화가 일어나면 복제본도 변화함)
var sumArr = [array1, array2];
console.log("두 배열 결합 ", sumArr); // [ [ 'num1', 'num2' ], [ 'num3', 'num4' ] ]
array1.push("new1");
console.log("array1 ", array1);
console.log("원본 변경 후 ", sumArr);

// 값만 복사(원본의 변화와 무관함)
var sumArr2 = [...array1, ...array2];
console.log(sumArr2); // [ 'num1', 'num2', 'num3', 'num4' ]
array1.push("new1");
console.log(sumArr2);

let obj1 = { key1: "value1", key2: "value2" };
let obj2 = { key2: "value3", key4: "value4" };
let sumObj = { obj1, obj2 };
console.log("{} ", sumObj);
let sumObj2 = { ...obj1, ...obj2 };
console.log("{} ", sumObj2);

let student = {
  name: "홍길동",
  kor: 92,
  math: 98,
  eng: 96,
  sci: 88,
};

let teacher = { tname: "설리번", age: 50 };
let sumObj3 = { ...student, ...teacher };
console.log(sumObj3);

let { eng, math, ...others } = sumObj3;
console.log(eng);
console.log(math);
console.log(others);
