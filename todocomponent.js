/******************************************
 *  Author : Flexxbo
 *  Created On : Tue May 26 2020
 *  File : merchantcomponent.js
 *******************************************/

/*===Put imports here===*/
const bodyparser = require("body-parser");
const express = require("express");
const app = express();

/*===Start code here===*/
const dotenv = require("dotenv");
const { Pool } = require("pg");
app.use(bodyparser.urlencoded());

const pool = new Pool({
  user: eupyuwdt,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.DB_PORT,
});

const getTodos = async () => {
  try {
    const query = await pool.query("SELECT * FROM todolist ORDER BY id ASC");
    return query.rows;
  } catch (e) {
    console.log(e);
    return [];
  }
};

const createTodo = async (body) => {
  const { id, title } = body;

  try {
    const query = await pool.query(
      "INSERT INTO todolist (todo, uuid) VALUES ($1, $2) RETURNING *",
      [title, id]
    );
    return `A ToDo has been created: ${JSON.stringify(results.rows[0])}`;
  } catch (e) {
    return "Error";
  }
};

/*
 * Need to add later
 */

const editTodo = async (itemid, body) => {
  const id = parseInt(itemid);
  const title = body;
  try {
    const query = await pool.query(
      "UPDATE todolist SET todo=$1 WHERE id=$2 RETURNING *",
      [title, id]
    );
    return `A ToDo has been created: ${JSON.stringify(query.rows[0])}`;
  } catch (e) {
    return "Error";
  }
};

/*
app.put("/todo/:id", (req, res) => {
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
*/
/*
const deleteMerchant = () => {
  return new Promise(function (resolve, reject) {
    const id = parseInt(request.params.id);
    pool.query(
      "DELETE FROM merchants WHERE id = $1",
      [id],
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(`Merchant deleted with ID: ${id}`);
      }
    );
  });
};
*/
const deleteTodo = async (todoItem) => {
  const id = parseInt(todoItem);

  try {
    const query = await pool.query("DELETE FROM todolist WHERE id = $1", [id]);
    return `Todo deleted with ID: ${id}`;
  } catch (e) {
    return "Error";
  }
};

const deleteAll = async () => {
  try {
    const query = await pool.query("DELETE FROM todolist *");
    return `Deleted All`;
  } catch (e) {
    return "Error";
  }
};
/*
const deleteAll = () => {
  return new Promise(function (resolve, reject) {
    //console.log(id);
    pool.query("DELETE FROM todolist WHERE id = 113", (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(`Deleted all items from list`);
    });
  });
};
*/
/*
const deleteTodo = () => {
  return new Promise(function (resolve, reject) {
    const id = parseInt(request.params.id);
    console.log(id);
    pool.query("DELETE FROM todolist WHERE id = $1", [id], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(`Todo deleted with ID: ${id}`);
    });
  });
};
*/
/*
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
*/

/*
const createMerchant = (body) => {
  return new Promise(function (resolve, reject) {
    const { name, email } = body;
    pool.query(
      "INSERT INTO merchants (name, email) VALUES ($1, $2) RETURNING *",
      [name, email],
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(`A new merchant has been added added: ${results.rows[0]}`);
      }
    );
  });
};
const deleteMerchant = () => {
  return new Promise(function (resolve, reject) {
    const id = parseInt(request.params.id);
    pool.query(
      "DELETE FROM merchants WHERE id = $1",
      [id],
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(`Merchant deleted with ID: ${id}`);
      }
    );
  });
};*/

module.exports = {
  getTodos,
  createTodo,
  deleteTodo,
  deleteAll,
  editTodo,
};

/* ===Better Comments=== */
// "* Usage - Comment everything from the beginning, start a task by adding a comment, then work on task
// "! Alert - Whenever you need an alert
// "? Review - Look at this again
// "TODO: "This ..."  is still to do
// "//commented out
// "+ Highlight: This needs to be highlited for some reason
// "@param Explain Parameters
