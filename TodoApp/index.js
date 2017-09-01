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
    var todo_title = req.body.todo_title;
    if(!todo_title)
    {
        res.status(400).json("Invalid todo");
    }
    else
    {
        todos_db.todos[todos_db.next_todo_id++] =   {   title:todo_title,
                                                        status:todos_db.StatusEnums.ACTIVE
                                                    };
        res.json(todos_db.todos);
    }
});

//complete
app.put("/api/todos/:id", function(req, res) {
    var mod_id = req.params.id;
    var todo = todos_db.todos[mod_id];

    if(!todo)
    {
        res.status(400).json("Todo does not exist");
    }
    else
    {
        if(todo.status === "ACTIVE")
            todo.status = todos_db.StatusEnums.COMPLETE;
        else todo.status = todos_db.StatusEnums.ACTIVE;
        res.json(todos_db.todos);
    }
});

app.listen(4000);

// //easier complete
// app.put("/api/todos/complete/:id", function(req, res) {
//     var mod_id = req.params.id;
//     var todo = todos_db.todos[mod_id];
//
//     if(!todo)
//     {
//         res.status(400).json("Todo does not exist");
//     }
//     else
//     {
//         todo.status = todos_db.StatusEnums.COMPLETE;
//         res.json(todos_db.todos);
//     }
// });
//
// //easier active
// app.put("/api/todos/active/:id", function(req, res) {
//     var mod_id = req.params.id;
//     var todo = todos_db.todos[mod_id];
//
//     if(!todo)
//     {
//         res.status(400).json("Todo does not exist");
//     }
//     else
//     {
//         todo.status = todos_db.StatusEnums.ACTIVE;
//         res.json(todos_db.todos);
//     }
// });
//
//
// app.get("/api/todos/active", function(req, res) {
//
//     var active = new Array();
//     //var ind = 0;
//     for(var i=1; i<todos_db.next_todo_id; i++) {
//         if (todos_db.todos[i].status === todos_db.StatusEnums.ACTIVE) {
//             active.push(todos_db.todos[i]);
//         }
//     }
//     res.json(active);
// });
//
// app.get("/api/todos/complete", function(req, res) {
//
//     var complete = new Array();
//     for(var i=1; i<todos_db.next_todo_id; i++) {
//         if (todos_db.todos[i].status === todos_db.StatusEnums.COMPLETE) {
//             complete.push(todos_db.todos[i]);
//         }
//     }
//     res.json(complete);
// });
//
// app.get("/api/todos/deleted", function(req, res) {
//
//     var del = new Array();
//     for(var i=1; i<todos_db.next_todo_id; i++) {
//         if (todos_db.todos[i].status === todos_db.StatusEnums.DELETED) {
//             del.push(todos_db.todos[i]);
//         }
//     }
//     res.json(del);
// });

