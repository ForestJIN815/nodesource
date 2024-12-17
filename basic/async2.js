// 콜백지옥 해결
// 1. Promise
// 2. async, await

// async function name(params) {
//     await 비동기처리();
// }

function fetchItems() {
  return new Promise((resolve, reject) => {
    resolve([1, 2, 3]);
  });
}
// fetchItems()
//   .then((data) => console.log(data))
//   .catch((err) => console.log(err));

async function logItems() {
  const result = await fetchItems();
  console.log(result);
}

logItems();

async function todos() {
  return fetch("https://jsonplaceholder.typicode.com/todos/1").then(
    (response) => response.json()
  );
}
const todo = await todos();
if (todo.id === 1) console.log(todo.title);

// https://jsonplaceholder.typicode.com/users/1
// https://jsonplaceholder.typicode.com/todos/1

async function fetchUsers() {
  return async function fetchUsers() {
    return fetch("https://jsonplaceholder.typicode.com/users/1").then(
      (response) => response.json()
    );
  };
}

async function fetchTodos() {
  return fetch("https://jsonplaceholder.typicode.com/todos/1").then(
    (response) => response.json()
  );
}

async function test() {
  const user = await fetchUsers();

  if (user.id === 1) {
    const todo = await fetchTodos();
    console.log(todo);
  }
}
test();
