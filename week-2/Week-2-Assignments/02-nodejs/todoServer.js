/**
  You need to create an express HTTP server in Node.js which will handle the logic of a todo list app.
  - Don't use any database, just store all the data in an array to store the todo list data (in-memory)
  - Hard todo: Try to save responses in files, so that even if u exit the app and run it again, the data remains (similar to databases)

  Each todo has a title and a description. The title is a string and the description is a string.
  Each todo should also get an unique autogenerated id every time it is created
  The expected API endpoints are defined below,
  1.GET /todos - Retrieve all todo items
    Description: Returns a list of all todo items.
    Response: 200 OK with an array of todo items in JSON format.
    Example: GET http://localhost:3000/todos
    
  2.GET /todos/:id - Retrieve a specific todo item by ID
    Description: Returns a specific todo item identified by its ID.
    Response: 200 OK with the todo item in JSON format if found, or 404 Not Found if not found.
    Example: GET http://localhost:3000/todos/123
    
  3. POST /todos - Create a new todo item
    Description: Creates a new todo item.
    Request Body: JSON object representing the todo item.
    Response: 201 Created with the ID of the created todo item in JSON format. eg: {id: 1}
    Example: POST http://localhost:3000/todos
    Request Body: { "title": "Buy groceries", "completed": false, description: "I should buy groceries" }
    
  4. PUT /todos/:id - Update an existing todo item by ID
    Description: Updates an existing todo item identified by its ID.
    Request Body: JSON object representing the updated todo item.
    Response: 200 OK if the todo item was found and updated, or 404 Not Found if not found.
    Example: PUT http://localhost:3000/todos/123
    Request Body: { "title": "Buy groceries", "completed": true }
    
  5. DELETE /todos/:id - Delete a todo item by ID
    Description: Deletes a todo item identified by its ID.
    Response: 200 OK if the todo item was found and deleted, or 404 Not Found if not found.
    Example: DELETE http://localhost:3000/todos/123

    - For any other route not defined in the server return 404

  Testing the server - run `npm run test-todoServer` command in terminal
 */
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
// const PORT = 3000;

const app = express();

app.use(bodyParser.json());

const readFile = () => new Promise((resolve, reject) => {
    fs.readFile("./todos.json", "utf8", (err, data) => {
        if (err) reject(err);
        try {
            resolve(JSON.parse(data));
        } catch (parseErr) {
            reject(parseErr);
        }
    });
});

const getTodo = (id) => new Promise((resolve, reject) => {
    readFile().then(data => {
        for (let i = 0; i < data.length; ++i) {
            if (data[i].id === id) {
                resolve(data[i]);
            }
        }
        reject(`No such todo with ${id}`);
    });
});

const removeTodo = (id) => new Promise((resolve, reject) => {
    readFile().then(todos => {
        let found = false;
        for (let i = 0; i < todos.length; ++i) {
            if (todos[i].id === id) {
                todos.splice(i, 1);
                found = true;
            }
        }
        if (found) {
            writeFile(todos);
            resolve(`Todo with ${id} removed successfully`);
        }
        reject(`No such todo with ${id}`);
    })
})

const updateTodo = (id, newTodo) => new Promise((resolve, reject) => {
    readFile().then(todos => {
        let found = false;
        for (let i = 0; i < todos.length; ++i) {
            if (todos[i].id === id) {
                console.log(newTodo);
                todos[i] = { 
                    ...todos[i],
                    ...newTodo,
                    ...(newTodo.title === undefined ? { title: todos[i].title } : {}),
                    ...(newTodo.description === undefined ? { description: todos[i].description } : {}),
                    ...(newTodo.completed === undefined ? { completed: todos[i].completed } : {}) 
                };
                console.log(todos[i]);
                found = true;
            }
        }
        if (found) {
            writeFile(todos);
            resolve(`Todo with ${id} updated successfully`);
        }
        reject("No such todo with given id");
    }).catch(err => reject(err))
});

const writeFile = (todos) => {
    fs.writeFile("./todos.json", JSON.stringify(todos), "utf8", err => {
        if (err) throw err;
        console.log(`${todos} are written succesfully`);
    })
}


app.get("/todos", (_, res) => {
    readFile().then(data => {
        return res.status(200).send(data);
    })
});

app.get("/todos/:id", (req, res) => {
    const id = req.params.id;
    getTodo(id).then(todo => {
        return res.status(200).send(todo);
    }).catch(mess => {
        return res.status(404).send(mess);
    })
});

app.put("/todos/:id", (req, res) => {
    const id = req.params.id;
    const newTodo = { 
        title: req.body.title,
        completed: req.body.completed,
        description: req.body.description
    };
    updateTodo(id, newTodo).then(mess => {
        return res.status(200).send(mess)
    }).catch(mess => {
        return res.status(404).send(mess)
    })
});

app.delete("/todos/:id", (req, res) => {
    const id = req.params.id;
    removeTodo(id).then(mess => {
        return res.status(200).send(mess)
    }).catch(mess => {
        return res.status(404).send(mess)
    })
});

app.post("/todos", (req, res) => {
    const { title, completed, description } = req.body;
    const todo = { title, completed, description, id: uuidv4() };
    readFile().then(data => {
        data.push(todo);
        writeFile(data);
        console.log(data);
        return res.status(201).send({ id: todo.id });
    })
});

//app.listen(PORT, () => {
//    console.log(`App is listening on the port ${PORT}`);
//});

module.exports = app;
