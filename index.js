// index.js
/*
const express = require("express");
const dotenv = require("dotenv");
const { Pool } = require("pg");
const bodyparser = require("body-parser");

const express = require("express");
const dotenv = require("dotenv");
const app = express();
const port = 3001;
const todo_model = require("./todocomponent");
require("dotenv").config();

app.use(bodyparser.urlencoded());
*/
/*
const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD, //how to make your password invisible, ask before pushing to github
  port: process.env.PORT || 3000,
});

app.get("/", (req, res) => {
  pool // We're using the instance connected to the DB
    .query("SELECT * FROM todolist;")
    .then((data) => res.json(data)) // We can send the data as a JSON
    .catch((e) => {
      res.sendStatus(404), console.log(e);
    }); // In case of problem we send an HTTP code
});

app.get("/:id", (req, res) => {
  const { id } = req.params; // We retrieve the id from the URL
  pool // We're using the instance connected to the DB
    .query("SELECT * FROM todolist WHERE id=$1;", [id])
    .then((data) => res.json(data)) // We can send the data as a JSON
    .catch((e) => {
      res.sendStatus(404), console.log(e);
    }); // In case of problem we send an HTTP code
});

app.post("/", (req, res) => {
  const { todoItem } = req.body; // We retrieve the id from the form (body-parser)

  pool // We're using the instance connected to the DB
    .query("INSERT INTO todolist (todo) VALUES ($1);", [todoItem])
    .then((data) => {
      res.status(201).json(data);
      console.log(todoItem);
    })
    .catch((e) => {
      res.sendStatus(404);
      console.log(e);
    }); // In case of problem we send an HTTP code
});

app.put("/:id", (req, res) => {
  const { id } = req.params; // We retrieve the id from the URL
  const { todoItem } = req.body; // We retrieve the name from the form (body-parser)

  pool
    .query("UPDATE todolist SET todo=$1 WHERE id=$2;", [todoItem, id]) // We inject the name and id in the request
    .then((data) => res.status(201).json(data))
    .catch((e) => {
      res.sendStatus(404);
      console.log(e);
    }); // In case of problem we send an HTTP code
});

app.delete("/:id", (req, res) => {
  const { id } = req.params; // We retrieve the id from the URL

  pool
    .query("DELETE FROM todolist WHERE id=$1;", [id]) // We inject the id in the request
    .then((data) => res.status(201).json(data))
    .catch((e) => {
      res.sendStatus(404);
      console.log(e);
    }); // In case of problem we send an HTTP code
});

//app.get("/", (req, res) => res.send("Hello Mello Trello"));
*/
const express = require("express");
const dotenv = require("dotenv");
const app = express();
const port = 3001;
const dotenv = require("dotenv");

require("dotenv").config();
const bodyparser = require("body-parser");

app.use(bodyparser.urlencoded());

const todo_model = require("./todocomponent");

app.use(express.json());
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Access-Control-Allow-Headers"
  );
  next();
});

app.get("/", (req, res) => {
  todo_model
    .getTodos()
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.post("/todo", (req, res) => {
  todo_model
    .createTodo(req.body)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.put("/todo/:id", (req, res) => {
  todo_model
    .editTodo(req.params.id, req.body)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.delete("/todo/:id", (req, res) => {
  todo_model
    .deleteTodo(req.params.id)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.delete("/todo", (req, res) => {
  todo_model
    .deleteAll()
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
