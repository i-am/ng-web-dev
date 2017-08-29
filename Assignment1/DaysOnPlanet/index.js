var express = require("express");
var body_parser = require("body-parser");
var fs = require("fs");
var nd = require("./numdays.js");

var app = express();
app.use(body_parser.urlencoded({extended: false}));

app.use("/form", express.static(__dirname+"/assets/form.html"));

app.post("/submit", function(req, res) {
    var data = req.body;
    var days = nd.DaysTillToday(new Date(data.dob));
    var str = "Hey "+data.name+", you have lived on this planet for "+days+" days.";

    var html = fs.readFileSync(__dirname+"/assets/submit.html", "utf8");
    html = html.replace("{{message}}", str);
    res.end(html);
});

app.listen(3000);