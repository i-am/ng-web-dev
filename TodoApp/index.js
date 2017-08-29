var express = require("express");
var todos_db = require("./seed.js");
var body_parser = require("body-parser");

var app = express();
app.use(body_parser.urlencoded({extended: false}));

app.use("/", express.static(__dirname+"/public"));

//get all todos
app.get("/api/todos", function(req, res, next){
    res.json(todos_db.todos);
    next();
});

//delete
app.delete("/api/todos/:id", function(req, res) {
   var del_id = req.params.id;
   var todo = todos_db.todos[del_id];

   if(!todo)
   {
       res.status(400).json("Todo does not exist");
   }
   else
   {
       todo.status = todos_db.StatusEnums.DELETED;
       res.json(todos_db.todos);
   }
});

//add
app.post("/api/todos", function(req, res) {
    var data = req.body;
    if(!data)
    {
        res.status(400).json("Invalid todo");
    }
    else
    {
        todos_db.todos[todos_db.next_todo_id++] = {title:data.title, status:todos_db.StatusEnums.ACTIVE};
        res.json(todos_db.todos);
    }
});

//complete
app.put("/api/:id", function(req, res) {
    var mod_id = req.params.id;
    var todo = todos_db.todos[mod_id];

    if(!todo)
    {
        res.status(400).json("Todo does not exist");
    }
    else
    {
        todo.status = todos_db.StatusEnums.COMPLETE;
        res.json(todos_db.todos);
    }
});

//easier complete
app.put("/api/todos/complete/:id", function(req, res) {
    var mod_id = req.params.id;
    var todo = todos_db.todos[mod_id];

    if(!todo)
    {
        res.status(400).json("Todo does not exist");
    }
    else
    {
        todo.status = todos_db.StatusEnums.COMPLETE;
        res.json(todos_db.todos);
    }
});

//easier active
app.put("/api/todos/active/:id", function(req, res) {
    var mod_id = req.params.id;
    var todo = todos_db.todos[mod_id];

    if(!todo)
    {
        res.status(400).json("Todo does not exist");
    }
    else
    {
        todo.status = todos_db.StatusEnums.ACTIVE;
        res.json(todos_db.todos);
    }
});


app.get("/api/todos/active", function(req, res) {

    var act = new Array();
    //var ind = 0;
    for(var i=1; i<todos_db.next_todo_id; i++) {
        if (todos_db.todos[i].status === todos_db.StatusEnums.ACTIVE) {
            act.push(todos_db.todos[i]);
        }
    }
    res.json(act);
});

app.get("/api/todos/complete", function(req, res) {

    var act = new Array();
    for(var i=1; i<todos_db.next_todo_id; i++) {
        if (todos_db.todos[i].status === todos_db.StatusEnums.COMPLETE) {
            act.push(todos_db.todos[i]);
        }
    }
    res.json(act);
});

app.get("/api/todos/deleted", function(req, res) {

    var act = new Array();
    for(var i=1; i<todos_db.next_todo_id; i++) {
        if (todos_db.todos[i].status === todos_db.StatusEnums.DELETED) {
            act.push(todos_db.todos[i]);
        }
    }
    res.json(act);
});
app.listen(3000);