const express = require("express");
const app = express();
const fs = require("fs");
const morgan = require("morgan");
const url = require("url");

app.use(morgan("dev"));

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static("public"));

// Exercise 2

// bước 1
app.get("/api/v1/todos", (req, res) => {
  fs.readFile("./todos.json", (err, data) => {
    res.send(JSON.parse(data));
  });
});

// bước 2
app.get("/api/v1/todos/:id", (req, res) => {
  fs.readFile("./todos.json", (err, data) => {
    let array = JSON.parse(data);
    for (let i = 0; i < array.length; i++) {
      if (array[i].id == req.params.id) {
        res.status(200).json(array[i]);
      }
    }
  });
});

// bước 3
app.post("/api/v1/todos", (req, res) => {
  fs.readFile("./todos.json", (err, data) => {
    let array = JSON.parse(data);
    let flag = true;
    for (let i = 0; i < array.length; i++) {
      if (array[i].title == req.body.title) {
        res.status(500).json({ message: "Todo already exists" });
        flag = false;
      }
    }
    if (flag) {
      array.push(req.body);
      fs.writeFile("./todos.json", JSON.stringify(array), (err) => {});

      res.status(200).json({ message: "Creat success" });
    }
  });
});

// bước 4

app.put("/api/v1/todos/:id", Middleware , (req, res) => {
  fs.readFile("./todos.json" , (err, data) => {
    let array = JSON.parse(data);
    let flag = true;
    for (let i = 0; i < array.length; i++) {
      if (array[i].id == req.params.id) {
        array.splice(i, 1, req.body);
        fs.writeFile("./todos.json", JSON.stringify(array), (err) => {});
        res.status(200).json({ message: "Update successfully" });
        flag = false;
      }
    }
    if (flag) {
      
    }
  });
});

// bước 5

app.delete("/api/v1/todos/:id", (req, res) => {
  fs.readFile("./todos.json", (err, data) => {
    let array = JSON.parse(data);
    let flag = true;
    for (let i = 0; i < array.length; i++) {
      if (array[i].id == req.params.id) {
        array.splice(i, 1);
        fs.writeFile("./todos.json", JSON.stringify(array), (err) => {});
        res.status(200).json({ message: "Delete successfully" });
        flag = false;
      }
    }
    if (flag) {
      res.status(404).json({ message: "Todo not found" });
    }
  });
});

// phần này để lưu dữ liệu xuống body

app.post("/receive", function (req, res) {
  if (req.body) {
    console.log(11);
    res.send(req.body);
    fs.writeFile("./todos.json", JSON.stringify(req.body), (err) => {});
    res.status(200).json("thanh cong");
  } else {
    res.status(404).json("fail");
  }
});

app.delete("/receive", function (req, res) {
  if (req.body) {
    res.send(req.body);
    fs.writeFile("./todos.json", JSON.stringify(req.body), (err) => {});
    res.status(200).json("thanh cong");
  } else {
    res.status(404).json("fail");
  }
});

// Exercise 03
// Middleware này em đã thêm vào phân app.put()
function Middleware(req, res, next) {
  fs.readFile("./todos.json", (err, data) => {
   console.log(1);
    let array = JSON.parse(data);
    let flag = true;

    for (let i = 0; i < array.length; i++) {
      if (array[i].title == req.body.title) {
        res.status(200).json({ message: "Todo already exists" });
        flag = false;
        next()
      }
    }

    if (flag) {
      next({ message: "Todo not found" })
      
    }
  });
}

// cửa xử lý lỗi 
app.use((err ,req , res, next)=>{
   res.send(err)
})

// Exercise 04

app.get("/", (req, res) => {
   console.log(req.query.per_page);
   res.sendFile("app.html", { root: "./public" });
 });

app.listen(3000, () => {
  console.log(`Example app listening on port http://localhost:3000`);
});
