// 함수
// function name(params) {}

// 일급함수 : 함수들이 변수처럼 다루어지는 방법

const foo = () => {
  console.log("foobar");
};

foo();

function logText(message) {
  //console.log(message);
  message();
}

//logText("hello");

logText(() => {
  console.log("hello");
});
