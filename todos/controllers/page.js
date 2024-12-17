// 경로가 요청되었을 때 처리해야 하는 기능
const mongoose = require("mongoose");
const Todo = require("../schemas/todo");

exports.list = async (req, res, next) => {
  try {
    const todos = await Todo.find({ completed: false });
    res.render("todos/list", { title: "Todo List", todos: todos });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.completedList = async (req, res, next) => {
  try {
    const todos = await Todo.find({ completed: true });
    res.render("todos/list", { title: "Todo List", todos: todos });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.read = async (req, res, next) => {
  try {
    const todo = await Todo.findOne({ _id: req.params.id });
    console.log(todo);
    console.log("경로 ", req.path);

    let path = "todos/read";
    let title = "Todo Read";

    if (req.path.includes("modify")) {
      //res.render("todos/modify", { title: "Todo Modify", todo: todo });
      path = "todos/modify";
      title = "Todo Modify";
    } //else {
    //res.render("todos/read", { title: "Todo Read", todo: todo });
    //}
    res.render(path, { title: title, todo: todo });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// exports.modify = async (req, res, next) => {
//   try {
//     const todo = await Todo.findOne({ _id: req.params.id });
//     console.log(todo);

//   } catch (error) {
//     console.log(error);
//     next(error);
//   }
// };

exports.update = async (req, res, next) => {
  try {
    // req.body : form 넘기는 데이터 가져오기
    const result = await Todo.updateOne(
      { _id: req.params.id },
      {
        title: req.body.title,
        important: req.body.important || false,
        completed: req.body.completed || false,
      }
    );
    console.log("result", result);
    res.redirect("/todos");
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.remove = async (req, res, next) => {
  try {
    const result = await Todo.deleteOne({ _id: req.params.id });
    console.log("result", result);
    res.redirect("/todos");
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.createGet = async (req, res, next) => {
  try {
    res.render("todos/create");
  } catch (error) {
    console.log(error);
    next(error);
  }
};
exports.create = async (req, res, next) => {
  try {
    const result = await Todo.create({
      title: req.body.title,
      important: req.body.important || false,
    });
    console.log("result", result);
    res.redirect("/todos");
  } catch (error) {
    console.log(error);
    next(error);
  }
};
